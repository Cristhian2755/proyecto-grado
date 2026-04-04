# Frontend Angular - Proyecto Grado

Este frontend fue creado con Angular CLI y se configuro para integrarse con el backend Express del proyecto.

## Requisitos

- Node.js 22+ o 24+
- Backend ejecutandose en http://localhost:5001

## Comandos

- Instalar dependencias: npm install
- Levantar frontend (con proxy a backend): npm start
- Build produccion: npm run build

## Integracion con backend

Se creo el archivo proxy.conf.json para redirigir:

- /api -> http://localhost:5001
- /health -> http://localhost:5001

Con esto, desde Angular puedes consumir rutas relativas como:

- /api/auth/login
- /api/projects
- /health

## Flujo recomendado

1. En una terminal: ir a backend y ejecutar npm run dev
2. En otra terminal: ir a frontend y ejecutar npm start
3. Abrir http://localhost:4200
