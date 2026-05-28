# Despliegue y dependencias del módulo IA

Pequeña guía para desplegar el módulo IA del proyecto.

## Backend (Node)
- Asegúrate de tener las variables en `backend/.env` (APIKEY_ESTUDIANTE, APIKEY_DOCENTE, APIKEY_COORDINADOR, APIKEY_BIBLIOTECA).
- Instala dependencias: `cd backend && npm install`.
- Arranca el servidor: `node server.js`.

## Backend (Python)
- Crear un entorno virtual: `python3 -m venv .venv`
- Activarlo: `source .venv/bin/activate`
- Instalar dependencias: `pip install -r requirements.txt`
- Probar el script de conversión: `python3 modules/AIClassificationModule/services/markitdown_extract.py /ruta/a/archivo.docx`

## Frontend (Angular)
- Instalar dependencias: `cd frontend && npm install`
- Ejecutar: `npm run start` o `ng serve`

## Notas de seguridad
- No subir `.env` al repositorio. Usa `.env.example` para documentar variables.
- Considera integrar Secret Manager en el despliegue en la nube.
