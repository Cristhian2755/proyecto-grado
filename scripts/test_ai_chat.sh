#!/usr/bin/env bash
# Script de prueba para endpoints de AI
# Uso:
#   TOKEN="<tu_jwt>" HOST="http://localhost:5001" bash scripts/test_ai_chat.sh

HOST=${HOST:-http://localhost:5001}
TOKEN=${TOKEN:-"<TU_JWT_AQUI>"}

if [ "$TOKEN" = "<TU_JWT_AQUI>" ]; then
  echo "Advertencia: TOKEN no configurado. Exporta TOKEN o pásalo al ejecutar."
fi

echo "Probando /api/ai/chat/estudiante"
curl -s -X POST "$HOST/api/ai/chat/estudiante" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mensaje":"¿Qué debe incluir la introducción de un trabajo de grado?","historial": []}' | jq || true

echo "\nProbando /api/ai/chat/docente"
curl -s -X POST "$HOST/api/ai/chat/docente" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mensaje":"¿Cómo mejorarías la metodología de este estudio?","historial": []}' | jq || true

echo "\nProbando /api/ai/chat/biblioteca"
curl -s -X POST "$HOST/api/ai/chat/biblioteca" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mensaje":"¿Cuál es la norma APA para citar un libro?","historial": []}' | jq || true

echo "\nProbando /api/ai/document-chat (extraer y preguntar)"
curl -s -X POST "$HOST/api/ai/document-chat" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"documentUrl":"/docs/ejemplo.docx","documentName":"ejemplo.docx","question":"Resume el documento","roleLabel":"estudiante"}' | jq || true

echo "\nPruebas completadas (revisa las respuestas arriba)."

echo "Nota: instala 'jq' para formato JSON estético (sudo apt install jq)."
