#!/usr/bin/env python3

import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) < 2:
        print('Debes enviar una ruta de archivo.', file=sys.stderr)
        return 1

    document_path = Path(sys.argv[1]).expanduser().resolve()

    if not document_path.exists():
        print('No se encontró el archivo indicado.', file=sys.stderr)
        return 1

    try:
        from markitdown import MarkItDown
    except Exception as exc:
        print(f'MarkItDown no está disponible: {exc}', file=sys.stderr)
        return 2

    markdown_converter = MarkItDown()
    result = markdown_converter.convert(str(document_path))

    text_content = getattr(result, 'text_content', None)
    if text_content:
        sys.stdout.write(text_content)
        return 0

    markdown_content = getattr(result, 'markdown', None)
    if markdown_content:
        sys.stdout.write(markdown_content)
        return 0

    sys.stdout.write(str(result))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())