# proyecto-grado

El proyecto tiene como funcion crear una plataforma web para gestionar de manera integral los trabajos de grado, centralizando en un solo sistema el registro, seguimiento, evaluación y control de los proyectos académicos.

El sistema permite a los estudiantes registrar sus propuestas y avances, mientras que los docentes y coordinadores pueden revisar, retroalimentar y evaluar cada etapa del proyecto, garantizando una trazabilidad completa del proceso. Además, incorpora herramientas de inteligencia artificial que apoyan el análisis automatizado de la información, facilitando la clasificación temática de los proyectos y contribuyendo a una mejor organización académica.

En conjunto, la plataforma busca mejorar la gestión de los trabajos de grado mediante un entorno digital estructurado, accesible y orientado a la toma de decisiones basada en información confiable.

## Estado actual del proyecto

Actualmente, el proyecto cuenta con una base funcional estable en backend, base de datos y frontend inicial. Se han definido los módulos principales del sistema y ya se encuentra operativa la arquitectura general para continuar con el desarrollo de funcionalidades avanzadas.

### Avances completados

- Estructura general del proyecto organizada por capas (backend, database, frontend, ia, docs).
- Backend en Node.js y Express funcionando de forma correcta.
- Conexión a PostgreSQL en Azure validada y estable.
- Módulo de autenticación implementado (registro, login y generación de JWT).
- CRUD principal de proyectos implementado.
- Middlewares de seguridad configurados (autenticación y control por roles).
- Modelado inicial de entidades adicionales: entregas, evaluaciones, notificaciones y líneas temáticas.
- Frontend en Angular inicializado, compilando correctamente e integrado con el backend mediante proxy.
- Ejecución unificada de backend y frontend desde la raíz del proyecto con scripts de desarrollo.

### Avances en proceso

- Integración completa de pantallas del frontend con los endpoints existentes.
- Ampliación de servicios y componentes Angular para flujo de usuario por roles.
- Documentación técnica y funcional del sistema en consolidación.

### Pendientes principales

- Finalizar endpoints de revisiones, entregas, evaluaciones y notificaciones.
- Implementar módulos administrativos y panel de métricas.
- Integrar el módulo de inteligencia artificial para clasificación temática automática.
- Fortalecer pruebas funcionales y de integración de extremo a extremo.

### Resultado parcial

El proyecto ya dispone de una base sólida y ejecutable para continuar con la fase de consolidación funcional. La plataforma puede evolucionar sobre una arquitectura estable, segura y preparada para incorporar las capacidades de analítica e inteligencia artificial definidas en la propuesta.