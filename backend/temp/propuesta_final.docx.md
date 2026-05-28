DISEÑO E IMPLEMENTACIÓN DE UNA PLATAFORMA WEB INTELIGENTE PARA LA GESTIÓN Y CLASIFICACIÓN AUTOMÁTICA DE PROYECTOS DE GRADO DEL INSTITUTO SUPERIOR DE EDUCACIÓN RURAL – ISER

*Cristhian Eduardo Vargas Suarez*

*Modalidad: Investigación Desarrollo

Trabajo de grado presentado como requisito para optar al título de*

*Tecnólogo en Gestión de Redes y Sistemas Teleinformáticas

Director: Elkin Eduardo Rojas

Programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticas
Instituto Superior de Educación Rural – ISER*

*Pamplona, Norte de Santander
2026*

# introducción.

Hoy en día, con toda la transformación digital que está viviendo la educación superior, automatizar procesos académicos se ha vuelto algo casi imprescindible. No solo ayuda a que la administración sea más eficiente, sino que también mejora muchísimo la trazabilidad de los documentos y la calidad del seguimiento a los estudiantes. Hay varios estudios que lo respaldan: digitalizar estos procesos reduce tiempos de respuesta, minimiza errores humanos y permite tomar decisiones mucho más informadas con datos reales [1].

Sin embargo, en muchas universidades y el ISER no es la excepción la gestión de los proyectos de grado sigue dependiendo de procesos manuales: correos interminables, archivos dispersos en carpetas, documentos de Word por todos lados. Esto termina generando desorganización, retrasos en las revisiones y un montón de dificultades para tener una visión clara y consolidada de lo que está pasando a nivel institucional.

En nuestro caso, en el programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticos del Instituto Superior de Educación Rural (ISER), los proyectos de grado son una parte clave de la formación. Pero el proceso actual de registro, aprobación y seguimiento es bastante caótico: no hay una plataforma centralizada donde los estudiantes suban sus propuestas, los docentes las revisen, aprueben o sigan los avances de forma ordenada. Esto hace que sea muy difícil rastrear todo el ciclo de vida del proyecto y casi imposible generar métricas útiles para la institución.

En los últimos años han aparecido plataformas web mucho más modernas (con API REST, frontend y backend separados, control de roles, etc.) que permiten crear sistemas escalables y seguros para gestionar temas académicos [2]. Además, integrar Inteligencia Artificial en estos sistemas ya ha mostrado resultados muy buenos: clasificación automática de documentos, detección de patrones y apoyo real en la toma de decisiones [3]. En el mundo educativo, por ejemplo, técnicas de procesamiento de lenguaje natural (NLP) ayudan a analizar textos y categorizarlos según temas específicos, lo que facilita muchísimo organizar el conocimiento de la institución [4].

Aun así, muchas instituciones sobre todo las más pequeñas o regionales todavía no han dado el salto a incorporar herramientas inteligentes en la gestión interna de sus procesos, especialmente en lo que tiene que ver con los trabajos de grado. Y eso trae problemas concretos: sin nada que clasifique automáticamente los proyectos, terminamos con duplicidad de temas, algunos profesores sobrecargados y una asignación de directores que muchas veces no es la más estratégica.

Por eso surgió esta idea: diseñar e implementar una plataforma web inteligente que permita gestionar de forma digital y centralizada todos los proyectos de grado en el ISER. Los estudiantes podrían registrar su propuesta ahí mismo (título, planteamiento del problema, justificación, objetivos, etc), los docentes la revisarían, aprobarían y harían seguimiento sin salir de la plataforma. Y lo más interesante: incluir un módulo de Inteligencia Artificial que lea automáticamente el contenido del proyecto y lo clasifique según la línea temática correspondiente. Esto no solo ayudaría a organizar mejor todo, sino que también facilitaría asignar directores según su experiencia y área de especialidad.

Con esta propuesta lo que queremos es dar un paso adelante en la modernización tecnológica del ISER: hacer que la institución sea más eficiente en lo administrativo, fortalecer la gestión académica y aprovechar de verdad las herramientas digitales junto con inteligencia artificial, pero siempre adaptadas a nuestra realidad educativa.

## Justificación.

Este trabajo de grado nace de una idea bastante concreta: crear una plataforma web inteligente que ayude al Instituto Superior de Educación Rural (ISER) a gestionar, seguir y clasificar de forma automática los proyectos de grado. La meta es dejar atrás el desorden actual y tener todo digitalizado y centralizado en un solo lugar, usando tecnologías modernas y sumándole un toque de inteligencia artificial para organizar los temas de los proyectos de manera automática.

Hoy en día, el proceso en el ISER depende mucho de cosas manuales: correos que van y vienen, archivos guardados en mil lugares diferentes, listas en Excel o en papel… Eso hace que sea difícil saber en qué etapa está cada proyecto, las revisiones se demoran más de lo necesario, casi nadie tiene una visión clara del panorama general y, lo peor, no hay forma práctica de obtener datos o estadísticas que sirvan para tomar decisiones en la coordinación académica.

Otro problema importante es que no existe un sistema que clasifique automáticamente los temas. Entonces pasa que a veces dos estudiantes terminan proponiendo proyectos muy parecidos sin que nadie se dé cuenta a tiempo, o ciertos profesores terminan con demasiados asesorados mientras otros casi no tienen, y las asignaciones no siempre son las más lógicas ni estratégicas.

Por eso este proyecto puede marcar una diferencia real. No se trata solo de hacer “otro sistema web” para guardar cosas (un CRUD). Queremos ir más allá: incorporar inteligencia artificial que lea el título, el planteamiento del problema, la justificación y los objetivos de cada propuesta y los agrupe automáticamente en líneas temáticas como redes, seguridad informática, desarrollo de software, infraestructura tecnológica, etc. Eso le daría un valor añadido importante al ISER.

Se pensó desarrollarlo con una arquitectura moderna, separando bien el frontend del backend, con control de acceso según el rol de cada persona (estudiante, asesor, jurado, coordinador), todo seguro y pensado para que sea fácil de mantener y escalar en el futuro si el instituto necesita agregar más funcionalidades.

¿Para qué sirve realmente esto? Básicamente, para mejorar la vida de todos los involucrados:

* Los estudiantes tendrán un lugar único y claro donde subir sus propuestas, ver el estado de avance, recibir comentarios y no perderse en correos infinitos.
* Los docentes (asesores y jurados) podrán organizar mejor su tiempo, revisar proyectos de forma ordenada y tener toda la información en un solo sitio.
* La coordinación académica contará por fin con reportes, estadísticas y una visión global que hoy simplemente no existe, lo que ayudará a tomar decisiones más informadas (asignación de directores, detección de tendencias, evitar duplicados, etc.).

En resumen, este proyecto no solo soluciona un dolor operativo que ya lleva tiempo molestando en el ISER, sino que también es una pequeña apuesta por modernizar la institución: digitalizar procesos, ganar eficiencia y meterle inteligencia artificial a algo tan cotidiano como la gestión de trabajos de grado. Creo que, al final, el mayor ganador será la comunidad académica del programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticos: estudiantes más acompañados, profesores menos saturados y una coordinación con herramientas reales para mejorar día a día.

## Alcance.

1. El presente proyecto tiene como alcance el diseño e implementación de una plataforma web orientada a la gestión integral de los trabajos de grado del Instituto Superior de Educación Rural (ISER), con el propósito de centralizar y optimizar los procesos académicos relacionados con su registro, seguimiento, evaluación y control.

* La plataforma permitirá la administración de usuarios mediante roles definidos (estudiantes, docentes y coordinadores), facilitando el registro de propuestas de grado, la carga y control de versiones de documentos, así como el seguimiento continuo del estado de cada proyecto durante su ciclo de vida académico.
* Adicionalmente, el sistema incorporará funcionalidades de analítica académica que permitirán generar reportes e indicadores sobre el estado de los proyectos, la carga de trabajo de los docentes y el avance general dentro de la institución, contribuyendo a la toma de decisiones informadas.
* Como valor agregado, se integrarán herramientas de inteligencia artificial que apoyarán el análisis automatizado de la información contenida en las propuestas de grado, permitiendo su clasificación temática y facilitando la organización académica sin requerir el desarrollo de modelos propios desde cero.
* Desde el punto de vista técnico, la solución será desarrollada como una aplicación web bajo una arquitectura cliente-servidor, utilizando tecnologías modernas para el desarrollo del frontend, backend y la gestión de bases de datos, garantizando escalabilidad, seguridad y mantenibilidad del sistema.

## Delimitación.

1. El desarrollo de la plataforma estará limitado al contexto académico del Instituto Superior de Educación Rural (ISER), enfocado exclusivamente en la gestión de los trabajos de grado, sin contemplar la integración con otros sistemas institucionales como plataformas académicas, sistemas financieros o de matrícula.

* El proyecto no incluye el desarrollo de aplicaciones móviles, centrándose únicamente en una solución web accesible desde navegadores. Asimismo, el uso de inteligencia artificial se limitará a la integración de herramientas existentes para el análisis de texto, sin abordar el desarrollo de algoritmos o modelos avanzados desde cero.
* De igual forma, la plataforma será desarrollada como un prototipo funcional, orientado a validar su viabilidad técnica y su impacto en la mejora de los procesos académicos, sin contemplar su despliegue en un entorno productivo institucional completo.
* Finalmente, el alcance del proyecto se restringe a las funcionalidades definidas en los objetivos planteados, por lo que cualquier ampliación o integración futura deberá considerarse como trabajo posterior.

# Planteamiento del Problema.

En la educación superior hoy en día, la **transformación digital** ya no es un lujo: es una necesidad para hacer más eficientes los procesos administrativos y fortalecer lo académico. Sin embargo, en muchas instituciones regionales como la nuestra, la gestión de los proyectos de grado sigue dependiendo en gran parte de procesos manuales o apenas digitalizados a medias. Esto genera un montón de problemas: la información no se puede seguir fácilmente, se pierde organización y es muy difícil tener un control real de todo.

En el **ISER**, específicamente en el programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticas, el panorama es bastante complicado. Actualmente, los estudiantes envían sus propuestas por correo electrónico o entregan archivos sueltos, sin que exista una plataforma central que acompañe todo el ciclo de vida del proyecto: desde la idea inicial hasta la sustentación final. La información termina regada en diferentes carpetas, correos, USBs o incluso impresos, lo que hace casi imposible consultar el historial, controlar versiones o sacar reportes consolidados cuando se necesitan.

Esto impacta directamente en la calidad del proceso. Los estudiantes a veces esperan semanas por una retroalimentación, no tienen claro en qué estado está su propuesta y les cuesta mucho hacer seguimiento real de sus avances. Por el lado de los profesores (asesores y jurados), toca manejar un montón de archivos dispersos y comunicaciones por todos lados, lo que aumenta la carga administrativa y deja menos tiempo para acompañar de verdad a los estudiantes con la calidad que merecen.

Otro inconveniente importante es que no contamos con ningún sistema que clasifique automáticamente los temas de los proyectos. No hay forma rápida de saber si una propuesta va por redes, seguridad informática, desarrollo de software, infraestructura tecnológica, etc. Esto termina generando duplicados de temas, una distribución desigual de proyectos entre los docentes y dificultades a la hora de asignar directores según su especialidad real.

¿Por qué seguimos así? Básicamente porque no tenemos una infraestructura tecnológica pensada específicamente para gestionar trabajos de grado, hay limitaciones en la adopción de herramientas digitales más avanzadas y todavía no se han integrado tecnologías como la **Inteligencia Artificial** en los procesos internos de la institución.

Si no hacemos nada al respecto, las consecuencias van a seguir acumulándose: desorganización documental crónica, pérdida de información valiosa, poca capacidad para analizar lo que pasa en el programa, sobrecarga para todos y decisiones estratégicas que se toman casi a ciegas, sin datos reales. A largo plazo, esto termina afectando la calidad de la formación y la imagen de la institución como un lugar moderno y actualizado tecnológicamente.

Por eso, el problema central que queremos abordar es claro: **no existe una plataforma web inteligente** que permita gestionar de forma integral, segura y centralizada todos los proyectos de grado del programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticos del ISER. Idealmente, esta plataforma debería incluir mecanismos automáticos de clasificación temática (por ejemplo, usando IA) y herramientas de seguimiento académico que faciliten la vida a estudiantes, asesores y coordinadores.

## Pregunta de Investigación.

## Pregunta General:

¿Cómo podemos diseñar e implementar una plataforma web inteligente que realmente facilite y mejore todo el manejo de los proyectos de grado en el Instituto Superior de Educación Rural (ISER)?

La idea es que esta herramienta ayude a organizar mejor el seguimiento, clasifique automáticamente los temas de los proyectos y, sobre todo, permita que tanto estudiantes como profesores y coordinadores tomen decisiones más informadas y rápidas gracias a una trazabilidad clara y datos útiles.

## Preguntas específicas:

1. ¿Cuáles son los requerimientos funcionales y no funcionales clave que debemos definir desde el principio para que la plataforma realmente centralice y haga más eficiente todo el ciclo de vida de un proyecto de grado (desde la propuesta inicial hasta la nota final)?
2. ¿Cómo debería ser la arquitectura de esta plataforma web para que sea segura, pueda crecer con el tiempo y permita que cada rol (estudiante, asesor, jurado, coordinador) tenga exactamente los permisos y la visibilidad que necesita, sin que se arme un caos de accesos?
3. ¿De qué forma podemos implementar un módulo que, usando procesamiento de lenguaje natural (PLN), lea las propuestas y clasifique automáticamente los proyectos según la línea temática a la que pertenecen (redes, ciberseguridad, desarrollo de software, infraestructura, etc.)?
4. ¿Cómo pueden las herramientas de analítica académica integradas en la plataforma ayudar a mejorar dos cosas muy concretas:

* asignar de forma más justa y estratégica los directores según su especialidad y carga de trabajo,
* y detectar a tiempo esos proyectos que están en riesgo de retrasarse o de no llegar a buen término?

1. Una vez implementada la plataforma, ¿qué cambios reales podríamos esperar en la eficiencia administrativa del programa y en la organización general del proceso de proyectos de grado? ¿Cómo se traduciría eso en menos papeleo, menos correos perdidos, retroalimentación más rápida y una mejor experiencia para todos los involucrados?

# Objetivos.

## Objetivo General

Diseñar e implementar una plataforma web para la gestión integral de los trabajos de grado del Instituto Superior de Educación Rural (ISER), mediante el uso de una arquitectura web moderna y el uso de herramientas de inteligencia artificial (IA) con el fin de mejorar los procesos de seguimiento, evaluación y análisis académico mejorando la trazabilidad y toma de decisiones.

## Objetivos Específicos

En estos objetivos específicos se estructura el funcionamiento de las fases del desarrollo del sistema, abarcando desde el diseño, desarrollo e implementación de la plataforma.

1. Diseñar la arquitectura del sistema, definiendo la estructura de la plataforma web, así como seleccionar las tecnologías a utilizar para su desarrollo, incluyendo Herramientas para el backend, frontend, gestión de base de datos, integración mediante APIs, la definición de módulos, funcionalidades y los roles de los usuarios que conformaran el sistema.
2. Desarrollar la plataforma web, incluyendo el diseño de la base de datos, la implantación del backend, el desarrollo del frontend y la integración de los componentes del sistema.
3. Implementar las funcionalidades complementarias, integrar las herramientas de inteligencia artificial (IA) del análisis automatizado de los proyectos de grado, y el desarrollar las pruebas funcionales del sistema, junto con los ajustes, con el fin del despliegue de prueba de la plataforma y preparar la entrega final.

# Metodología.

## Modalidad de Investigación

* Semillero de investigación: [NO APLICA]
* Tipo de investigación: Desarrollo Experimental.
* Justificación: El presente proyecto se enfoca en el diseño e implementación de una plataforma web orientada a la gestión de trabajos de grado del Instituto Superior de Educación Rural (ISER), incorporando el uso de herramientas de inteligencia artificial para el análisis automatizado de la información. Se considera de tipo experimental, ya que implica la construcción de un prototipo funcional y la validación de su comportamiento en un entorno académico, evaluando su utilidad en la organización, seguimiento y análisis de los proyectos de grado.

## Diseño Metodológico

* Enfoque: Mixto.
* Cuantitativo: Se evaluará el desempeño del sistema mediante indicadores como tiempos de respuesta de la plataforma, eficiencia en el registro y gestión de proyectos, así como el comportamiento de las herramientas de inteligencia artificial en el análisis de información.
* Cualitativo: Se realizará la validación de la usabilidad del sistema y la experiencia de los usuarios (estudiantes, docentes y coordinadores), a través de pruebas funcionales y encuestas de satisfacción que permitan identificar mejoras en el proceso de gestión de trabajos de grado.

## Procedimiento Detallado

Modelo Cascada Compacto: Para el desarrollo del proyecto en el tiempo estimado, se establecen las siguientes fases metodológicas:

1. Fase 1: Diseño del Sistema
   1. Actividad: Definición de la arquitectura del sistema bajo un enfoque de arquitectura de aplicaciones web desacopladas, identificación de requerimientos funcionales y no funcionales, diseño del modelo de datos (base de datos) y estructuración de los módulos principales de la plataforma.
   2. Entregable: Documento de requerimientos, diagrama de arquitectura del sistema y modelo entidad-relación de la base de datos.
2. Fase 2: Desarrollo de la Plataforma
   1. Actividad: Implementación del backend mediante tecnologías orientadas a servicios (API REST), desarrollo del frontend de la aplicación web, construcción de los módulos principales del sistema (gestión de usuarios, proyectos, seguimiento y evaluación) e integración de los componentes del sistema.
   2. Entregable: Prototipo funcional de la plataforma web con sus módulos principales operativos.
3. Fase 3: Integración de Herramientas de Inteligencia Artificial
   1. Actividad: Integración de herramientas de inteligencia artificial para el análisis automatizado de la información de los proyectos de grado, orientadas a la clasificación temática y apoyo en la organización de los datos.
   2. Entregable: Módulo funcional integrado con capacidades de análisis automatizado de proyectos.
4. Fase 4: Pruebas y Validación
   1. Actividad: Ejecución de pruebas funcionales, validación del sistema con usuarios reales, identificación de errores, ajustes y mejoras en la plataforma, así como evaluación del comportamiento general del sistema.
   2. Entregable: Informe de pruebas, resultados de validación y versión ajustada del sistema.
5. Fase 5: Documentación y Entrega Final
   1. Actividad: Elaboración del documento final del proyecto de grado, desarrollo de manuales de usuario y técnico, y preparación de la sustentación del proyecto.
   2. Entregable: Documento final del proyecto, manuales y presentación de sustentación.

# Resultados Esperados.

Al finalizar el desarrollo del proyecto de grado, se espera obtener un conjunto de resultados verificables orientados a la solución de la problemática identificada en la gestión de los trabajos de grado del Instituto Superior de Educación Rural (ISER), mediante la implementación de una plataforma web funcional y validada en un entorno académico.

## Producto Tecnológico Principal

Se desarrollará una plataforma web funcional que permita la gestión integral de los trabajos de grado, incluyendo:

* Registro y autenticación de usuarios con control de acceso basado en roles (estudiantes, docentes y coordinadores).
* Módulo de gestión de proyectos de grado, que permita el registro, seguimiento y actualización de la información.
* Sistema de carga de documentos con control de versiones.
* Flujo estructurado para revisión, retroalimentación y evaluación de proyectos.
* Generación de reportes e indicadores relacionados con el estado de los proyectos.

## Módulo de Inteligencia Artificial Implementado

Se integrarán herramientas de inteligencia artificial orientadas al análisis automatizado de la información de los proyectos de grado, permitiendo:

* Identificar patrones temáticos en los contenidos de las propuestas.
* Clasificar los proyectos en líneas temáticas definidas (por ejemplo: redes, desarrollo de software, seguridad informática, entre otras).
* Apoyar la organización académica y la distribución de proyectos entre docentes.

## Resultados en Términos de Desempeño Institucional

Se espera evidenciar mejoras en el proceso de gestión de trabajos de grado, tales como:

* Reducción en los tiempos de registro y seguimiento de proyectos.
* Mejora en la organización y trazabilidad de la información documental.
* Disminución en la duplicidad de temas de proyectos.
* Mayor disponibilidad de información para la toma de decisiones académicas.

Estos resultados serán evaluados mediante indicadores como:

* Tiempo promedio de gestión de un proyecto.
* Número de proyectos correctamente clasificados mediante herramientas de inteligencia artificial.
* Nivel de uso de la plataforma por parte de los usuarios.

## validación del Sistema

La plataforma será validada mediante pruebas funcionales y pruebas con usuarios, permitiendo:

* Verificar el cumplimiento de los requerimientos definidos.
* Evaluar la usabilidad del sistema.
* Identificar oportunidades de mejora a partir de la retroalimentación de los usuarios.

## Producto Académico Final

Como entrega formal del trabajo de grado:

* Documento final del trabajo de grado.
* Prototipo funcional de la plataforma web.
* Manual de usuario para los diferentes roles del sistema.
* Manual técnico para mantenimiento y futuras mejoras.
* Informe de resultados y validación del sistema.

# Cronograma

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **CRONOGRAMA PRIMER SEMESTRE AÑO 2026** | | | | | | | | | | | | | | | | | | | | | |
|  |
| **Objetivos** | **Actividades** | **Responsable** | **FECHA** | | **MES 1** | | | | **MES 2** | | | | **MES 3** | | | | **MES 4** | | | | **Entregables** |  |
| **Inicio** | **Fin** | **1** | **2** | **3** | **4** | **1** | **2** | **3** | **4** | **1** | **2** | **3** | **4** | **1** | **2** | **3** | **4** |  |
| Formular y estructurar la propuesta del proyecto y el diseño inicial de la plataforma. | Redacción de la propuesta del proyecto | Estudiante | 2/03/2026 | 9/03/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Documento preliminar al asesor |  |
| Revisión y ajustes de la propuesta | Estudiante | 10/03/2026 | 16/03/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Propuesta entregada |  |
| corrección de la propuesta y Diseño de la arquitectura del sistema | Estudiante | 17/03/2026 | 23/03/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Correcion propuesta |  |
| Definición de módulos y funcionalidades de la plataforma | Estudiante | 24/03/2026 | 30/03/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Primer informe del proyecto |  |
| Planificación técnica del desarrollo del sistema | Estudiante | 31/03/2026 | 6/04/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  | | | | | | | | | | | | | | | |  |  |
| Diseñar la arquitectura del sistema, Desarrollar el backend del sistema, Desarrollar el frontend del sistema | Diseño de la base de datos del sistema | Estudiante | 7/04/2026 | 13/04/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Modelo de base de datos al asesor |  |
| Desarrollo del backend de la plataforma | Estudiante | 14/04/2026 | 20/04/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Backend funcional al asesor |  |
| Desarrollo del frontend de la plataforma | Estudiante | 21/04/2026 | 27/04/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Interfaz web al asesor |  |
| Integración del sistema (frontend, backend y base de datos) | Estudiante | 28/04/2026 | 4/05/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Plataforma integrada al asesor |  |
|  |  |  |  |  |  | | | | | | | | | | | | | | | |  |  |
| Implementar funcionalidades, pruebas y finalización del proyecto | Implementación del módulo de clasificación automática de proyectos | Estudiante | 5/05/2026 | 11/05/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Módulo implementado al asesor |  |
| Pruebas funcionales del sistema | Estudiante | 12/05/2026 | 25/05/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Sistema probado |  |
| Ajustes y optimización de la plataforma | Estudiante | 26/05/2026 | 8/06/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Sistema optimizado |  |
| Preparación de sustentación y entrega final | Estudiante | 9/06/2026 | 21/06/2026 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | Documento final y sustentación |  |

# Referencias.

1. A. Alenezi, “Digital Transformation in Higher Education: Challenges and Opportunities,” International Journal of Educational Technology in Higher Education, vol. 18, no. 1, pp. 1–17, 2021.
2. W T. Erl, RESTful Web APIs: Services for a Changing World. Upper Saddle River, NJ, USA: Prentice Hall, 2015.
3. M. Fowler, Patterns of Enterprise Application Architecture. Boston, MA, USA: Addison-Wesley, 2003.
4. I. Sommerville, *Software Engineering*, 10th ed. Boston, MA, USA: Pearson, 2016.