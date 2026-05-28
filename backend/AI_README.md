# AI Module - Uso y pruebas

Instrucciones rápidas para probar el módulo de chat IA localmente.

## Requisitos
- Node.js (v16+ recomendable)
- Python 3 con `markitdown` instalado (ver `requirements.txt` en `backend/`)
- Variables en `backend/.env` (API keys por rol ya configuradas)

## Instalar dependencias Python (ejemplo con venv)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Comprobar el script de extracción

```bash
python3 modules/AIClassificationModule/services/markitdown_extract.py /ruta/a/ejemplo.docx
```

## Ejecutar backend

```bash
cd backend
npm install
node server.js
```

## Ejemplos `curl`

Prueba básica (requiere token JWT válido):

```bash
curl -X POST http://localhost:5001/api/ai/chat/estudiante \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"mensaje":"¿Qué debe incluir la introducción de un trabajo de grado?","historial": []}'
```

Probar `document-chat` (extrae Markdown y responde):

```bash
curl -X POST http://localhost:5001/api/ai/document-chat \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"documentUrl":"/docs/miDocumento.docx","documentName":"miDocumento.docx","question":"Resume el documento","roleLabel":"estudiante"}'
```

## Seguridad
- Si las claves se comprometieron, rotarlas inmediatamente.
- En producción, usar Secret Manager (GCP/AWS) en lugar de `.env`.
