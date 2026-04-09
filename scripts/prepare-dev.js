const { execSync, spawnSync } = require('child_process');

const ports = [5001, 4200];

function getPidsForPort(port) {
  try {
    const output = execSync(`netstat -ano -p tcp | findstr :${port}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });

    const pids = new Set();
    output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const parts = line.split(/\s+/);
        const state = parts[parts.length - 2];
        const pid = parts[parts.length - 1];

        if (state === 'LISTENING' && /^\d+$/.test(pid)) {
          pids.add(Number(pid));
        }
      });

    return [...pids];
  } catch {
    return [];
  }
}

function killPid(pid, port) {
  const result = spawnSync('taskkill', ['/PID', String(pid), '/F'], {
    encoding: 'utf8'
  });

  if (result.status === 0) {
    console.log(`✓ Puerto ${port} liberado (PID ${pid})`);
    return;
  }

  const errorMessage = (result.stderr || result.stdout || '').trim();
  console.log(`⚠ No se pudo liberar el puerto ${port} (PID ${pid})${errorMessage ? `: ${errorMessage}` : ''}`);
}

for (const port of ports) {
  const pids = getPidsForPort(port);

  if (pids.length === 0) {
    console.log(`✓ Puerto ${port} libre`);
    continue;
  }

  for (const pid of pids) {
    killPid(pid, port);
  }
}
