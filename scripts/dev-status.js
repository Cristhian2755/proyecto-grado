const http = require('http');
const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const backendPort = process.env.PORT || 5001;
const frontendPort = process.env.FRONTEND_PORT || 4200;
const backendUrl = `http://localhost:${backendPort}/health`;
const frontendUrl = `http://localhost:${frontendPort}`;
const pollIntervalMs = 2000;
const maxAttempts = 60;

function request(targetUrl, timeoutMs = 3000) {
  return new Promise((resolve) => {
    const client = targetUrl.startsWith('https:') ? https : http;
    const req = client.get(targetUrl, (res) => {
      let body = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 500,
          statusCode: res.statusCode,
          body
        });
      });
    });

    req.on('error', (error) => {
      resolve({ ok: false, error: error.message });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error('timeout'));
    });
  });
}

async function checkBackend() {
  const result = await request(backendUrl);

  if (!result.ok) {
    return { ok: false, reason: result.error || `HTTP ${result.statusCode}` };
  }

  try {
    const json = JSON.parse(result.body);
    return {
      ok: json.status === 'OK',
      port: json.port || backendPort,
      database: json.database || 'desconocida',
      jwtConfigured: Boolean(json.jwtConfigured),
      jwt: json.jwtStatus || json.jwt || 'desconocido',
      timestamp: json.timestamp
    };
  } catch (error) {
    return { ok: false, reason: `Respuesta inválida del backend: ${error.message}` };
  }
}

async function checkFrontend() {
  const result = await request(frontendUrl);

  if (!result.ok) {
    return { ok: false, reason: result.error || `HTTP ${result.statusCode}` };
  }

  return { ok: true, port: frontendPort };
}

function renderLine(label, ok, details) {
  const icon = ok ? '✓' : '✗';
  return `${icon} ${label}: ${details}`;
}

async function waitForServices() {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const [backend, frontend] = await Promise.all([checkBackend(), checkFrontend()]);

    if (backend.ok && frontend.ok) {
      return { backend, frontend };
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    } else {
      return { backend, frontend };
    }
  }

  return { backend: { ok: false, reason: 'Sin respuesta' }, frontend: { ok: false, reason: 'Sin respuesta' } };
}

(async () => {
  console.log('Verificando conexiones de backend, frontend, base de datos y JWT...');

  const { backend, frontend } = await waitForServices();
  const databaseOk = Boolean(backend.ok && backend.database === 'conectado');
  const jwtOk = Boolean(backend.ok && backend.jwtConfigured && backend.jwt === 'funcionando');

  console.log(renderLine('Backend', backend.ok, backend.ok ? `conectado en http://localhost:${backend.port}` : backend.reason));
  console.log(renderLine('Frontend', frontend.ok, frontend.ok ? `conectado en http://localhost:${frontend.port}` : frontend.reason));
  console.log(renderLine('Base de datos', databaseOk, databaseOk ? `conectada (${process.env.PGHOST || 'localhost'}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'postgres'})` : 'no conectada'));
  console.log(renderLine('JWT', jwtOk, jwtOk ? backend.jwt : 'no configurado o no validado'));

  console.log('Resumen final: conexiones verificadas.');
})();