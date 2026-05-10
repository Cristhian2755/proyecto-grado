const { execSync, spawnSync } = require('child_process');
const os = require('os');

const ports = [5001, 4200];
const isWindows = os.platform() === 'win32';

function getPidsForPort(port) {
  if (!isWindows) {
    try {
      const output = execSync(`lsof -ti tcp:${port} -sTCP:LISTEN`, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      });

      return output
        .split(/\r?\n/)
        .map((line) => Number(line.trim()))
        .filter((pid) => Number.isInteger(pid) && pid > 0);
    } catch {
      try {
        const output = execSync(`ss -lptn 'sport = :${port}'`, {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore']
        });

        const pids = new Set();
        const pidRegex = /pid=(\d+)/g;
        let match;

        while ((match = pidRegex.exec(output)) !== null) {
          pids.add(Number(match[1]));
        }

        return [...pids];
      } catch {
        return [];
      }
    }
  }

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
  if (!isWindows) {
    try {
      process.kill(pid, 'SIGKILL');
      console.log(`✓ Puerto ${port} liberado (PID ${pid})`);
      return;
    } catch (error) {
      console.log(`⚠ No se pudo liberar el puerto ${port} (PID ${pid}): ${error.message}`);
      return;
    }
  }

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
