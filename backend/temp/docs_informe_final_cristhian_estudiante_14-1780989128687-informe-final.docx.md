**DISEÑO E IMPLEMENTACIÓN DE UNA PLATAFORMA WEB INTELIGENTE PARA LA GESTIÓN Y CLASIFICACIÓN AUTOMÁTICA DE PROYECTOS DE GRAD**O

Cristhian Eduardo VargasSuarez

C:C: 1094277900

Informe final de Trabajo de Grado como Requisito Para Optar al Título de Tecnólogo en Gestión de redes y sistemas Tele-informáticos

Director de Trabajo de Grado:

Ing. Elkin Eduardo Rojas L.

Instituto Superior de Educación Rural

Facultad de Ingeniarías e Informática

Tecnología En Gestión De Redes Y Sistemas Teleinformáticos

Pamplona, Norte de Santander, Colombia

2026

**Dedicatoria**

Quiero dedicar estas palabras a las personas mas importantes:

A mi familia, por ser el pilar fundamental de mi vida y de este logro. Gracias por su amor, por sus apoyos en forma de sarcasmo para animarme, por sus sacrificios silenciosos, por creer en mí incluso despues de muchas decepcionadas que les e echoa lo largo de mi vida y por estar siempre ahí, apoyándome en cada etapa de esta carrera. Este triunfo es también de ustedes.

Especialmente a mi pareja, la persona que más ha estado a mi lado durante este largo camino. Gracias por tu amor, por tu paciencia y apoyo en mis días más difíciles, por tus palabras de ánimo cuando todo parecía pesado, por calmarme en los momentos de estrés y rabia, por sostenerme en mis recaídas y por celebrar conmigo cada pequeño avance. Eres mi motivación y mi mayor apoyo. Sin ti, llegar hasta aquí habría sido mucho más difícil. Este trabajo lleva también una gran parte de tu corazón.

A mi mejor amigo Hugo, por su apoyo y sinceridad en los momentos que me tocaba aterrizar y tener lo pies en la tierra, y por ayudarme y aconsejarme en los momentos mas duros que estaba pasando. Gracias por escucharme, por hacerme reír en los momentos de estrés, por los consejos sinceros y por recordarme que no estaba solo en este proceso.

A mi asesor, por su guía y enseñanzas. Gracias por compartir su conocimiento, por sus correcciones oportunas y por creer en este proyecto desde el primer día, por su tiempo y su apoyo en este proyecto. Su acompañamiento fue clave para convertir esta idea en realidad.

Y a mis compañeros de carrera, con quienes compartimos risas, recochas, frustraciones y victorias. Gracias por los trabajos en equipo, por los ánimos mutuos y por hacer más llevadero este camino. Cada uno de ustedes dejó una huella en mi formación.

A todos ustedes, mi más profunda y sincera gratitud. Este logro no es solo mío, es nuestro.

**Agradecimientos**

Quisiera expresar mi más sincero agradecimiento a todas las personas que me acompañaron y apoyaron durante este importante proceso académico.

En primer lugar, a mi pareja, por su apoyo, en lo buenos momentos y en los difíciles, especialmente en esos momentos difíciles en los que recaía en pensamientos negativos a mi propia persona y todo parecía más pesado. Gracias por tu paciencia, por esos ánimos y motivaciones que me brindabas, por estar ahí y por motivarme a seguir adelante incluso cuando yo mismo dudaba.

A mi familia, por su respaldo constante a lo largo de toda esta carrera. Gracias por su comprensión, por sacrificarse para que yo pudiera culminar esta segunda etapa de oportunidad.

Y a mi mejor amigo Hugo, por ayudarme siempre, por ser un buen mentor, sin importar el dia o la hora que necesitara. Gracias por estar presente en todo el proceso apoyarme.

A mis docentes, por dedicarme su tiempo, por enseñarme con paciencia y por compartir sus conocimientos. Su guía y exigencia fueron fundamentales para mi crecimiento profesional y personal.

A todos ustedes, mi más profundo agradecimiento. Este logro también es de ustedes.

**Tabla de contenido**

**RESUMEN ................................................................................................................................................................... iv**

**ABSTRACT .................................................................................................................................................................. v**

**SIGLAS, ACRÓNIMOS Y ABREVIATURAS ........................................................................................................ vi**

**1. INTRODUCCIÓN ................................................................................................................................................... 1**

**2. PLANTEAMIENTO DEL PROBLEMA .............................................................................................................. 3**

**3. JUSTIFICACIÓN .................................................................................................................................................... 5**

**Alcance ....................................................................................................................................................................... 6**

**Delimitación ............................................................................................................................................................... 6**

**4. OBJETIVOS ............................................................................................................................................................. 7**

**A. Objetivo General .................................................................................................................................................. 7**

**B. Objetivos Específicos ............................................................................................................................................ 7**

**5. MARCO TEÓRICO ................................................................................................................................................ 8**

**5.1. Antecedentes ....................................................................................................................................................... 8**

**5.2. Marco Conceptual .............................................................................................................................................. 9**

**5.3. Marco Teórico ................................................................................................................................................... 11**

**5.4. Marco Legal ...................................................................................................................................................... 12**

**6. METODOLOGÍA .................................................................................................................................................. 13**

**6.1. Tipo de Investigación ........................................................................................................................................ 13**

**6.2. Enfoque de Investigación ................................................................................................................................. 14**

**6.3. Modelo de Desarrollo ....................................................................................................................................... 15**

**6.4. Fases de Desarrollo del Proyecto ..................................................................................................................... 16**

**7. RESULTADOS ....................................................................................................................................................... 21**

**7.1. Pruebas y Validación del Sistema .................................................................................................................... 21**

**8. DISCUSIÓN ............................................................................................................................................................ 24**

**9. CONCLUSIONES .................................................................................................................................................. 27**

**10. RECOMENDACIONES ...................................................................................................................................... 29**

**11. REFERENCIAS ................................................................................................................................................... 31**

**LISTA DE FIGURAS**

**Fig. 1. Estructura general del proyecto .................................................................................................................... 22**

**Fig. 2. Estructura de la base de datos ....................................................................................................................... 22**

**Fig. 3. Diagrama entidad-relación de la base de datos ............................................................................................ 23**

**Fig. 4. Conexión de PostgreSQL mediante pool de conexiones .............................................................................. 23**

**Fig. 5. Vista de las tablas principales en la interfaz de pgAdmin4 ......................................................................... 24**

**Fig. 6. Organization y estructura de directorios del backend ................................................................................ 24**

**Fig. 7. Configuración de rutas de autenticación en el archivo authRoutes.js ....................................................... 24**

**Fig. 8. Diseño del boceto de la interfaz de la plataforma web ................................................................................. 25**

**Fig. 9. Verificación de la conexión exitosa del sistema a través de la terminal ..................................................... 26**

**Fig. 10. Fragmento de código correspondiente al módulo de la biblioteca digital ................................................ 26**

**Fig. 11. Interfaz del chatbot integrado en el módulo de la biblioteca .................................................................... 27**

**Fig. 12. Interfaz del chatbot integrado en el módulo de los estudiantes ................................................................ 27**

**Fig. 13. Configuración de scripts de automatización en el archivo package.json ................................................. 28**

**Fig. 14. Interfaz y pantalla para el inicio de la biblioteca ....................................................................................... 29**

**Fig. 15. Interfaz y pantalla para el inicio de sesión de usuarios .............................................................................. 29**

**Fig. 16. Panel de control principal (Dashboard) del usuario coordinador ............................................................ 30**

**Fig. 17. Formulario e interfaz para el registro de estudiantes por parte del coordinador ................................... 31**

**Fig. 18. Formulario de registro para la incorporación de nuevos docentes desde el rol coordinador ................ 31**

**Fig. 19. Listado general y actualizado del personal docente registrado en la plataforma ................................... 32**

**Fig. 20. Panel de control principal e interfaz del perfil estudiante ......................................................................... 33**

**Fig. 21. Panel de control principal e interfaz del perfil estudiante (Vista Alterna) .............................................. 33**

**Fig. 22. Panel de control principal e interfaz adaptada para el perfil docente ...................................................... 34**

**Fig. 23. Módulo de administración para la gestión y control de usuarios dentro de la plataforma .................... 34**

**Fig. 24. Panel del administrador enfocado en el seguimiento y control de proyectos de grado ........................... 34**

|  |  |  |
| --- | --- | --- |
| Acerca del Plagio |  | El ISER utiliza herramientas para revisión de autoría para la entrega de los trabajos de los alumnos. Estos programas comparan la originalidad del trabajo entregado por cada estudiante con millones de recursos electrónicos y detecta aquellas partes del texto que son copiadas y pegadas. Plagiar en el ISER se considera una falta grave, y puede tomarse como una expulsión definitiva de la institución. |

![](data:image/jpeg;base64...)![](data:image/png;base64...)

El contenido de esta obra corresponde al derecho de expresión de los autores y no compromete el pensamiento institucional del Instituto Superior de Educación Rural – ISER de Pamplona ni desata su responsabilidad frente a terceros. Los autores asumen la responsabilidad por los derechos de autor y conexos.

SIGLAS, ACRÓNIMOS Y ABREVIATURAS

**API RESTful** Conjunto de servicios web basados en el protocolo HTTP que permiten la comunicación entre el frontend y el backend. A través de estas APIs se realizan operaciones como consultar, registrar, actualizar y eliminar información de manera estructurada y escalable.

**Angular** Framework frontend desarrollado por Google, utilizado para construir aplicaciones web dinámicas, modernas y con componentes reutilizables.

**Autenticación** Proceso mediante el cual el sistema verifica la identidad de un usuario antes de permitirle el acceso a las funcionalidades privadas de la plataforma.

**Backend** Parte del sistema encargada de la lógica de negocio, el procesamiento de datos, la autenticación y la comunicación con la base de datos.

**Base de Datos** Sistema que permite almacenar, organizar y administrar la información de forma estructurada y segura. En este proyecto se utiliza PostgreSQL.

**Biblioteca Digital** Módulo de la plataforma encargado de publicar y consultar los proyectos de grado finalizados de manera pública y organizada.

**Clasificación Inteligente** Proceso automatizado mediante inteligencia artificial que permite categorizar los proyectos de grado según su línea temática.

**CRUD** Sigla que representa las operaciones básicas de gestión de información:

* **Create** (Crear)
* **Read** (Leer)
* **Update** (Actualizar)
* **Delete** (Eliminar)

**Dashboard** Panel visual que muestra información, estadísticas y accesos rápidos dentro de la plataforma.

**Express.js** Framework para Node.js utilizado para desarrollar APIs RESTful y aplicaciones backend robustas y escalables.

**Frontend** Parte visual de la aplicación con la que interactúan directamente los usuarios a través de interfaces gráficas e intuitivas.

**Inteligencia Artificial (IA)** Conjunto de técnicas computacionales que permiten automatizar procesos de análisis, clasificación y toma de decisiones dentro del sistema.

**Interceptor** Componente en Angular que intercepta las solicitudes HTTP para agregar automáticamente información como el token JWT.

**JSON Web Token (JWT)** Estándar de autenticación basado en tokens digitales que se utiliza para validar la identidad de los usuarios y proteger las rutas privadas del sistema.

**Middleware** Función intermedia en el backend que procesa las solicitudes antes de llegar al controlador principal. En este proyecto se utiliza principalmente para autenticación y control de roles.

**MVC (Modelo-Vista-Controlador)** Patrón de arquitectura de software que separa la lógica del sistema, la interfaz gráfica y el manejo de datos, facilitando la organización y el mantenimiento del código.

**Node.js** Entorno de ejecución de JavaScript del lado del servidor, utilizado para desarrollar la lógica backend de la plataforma.

**PostgreSQL** Sistema gestor de bases de datos relacional de código abierto, utilizado en este proyecto por su robustez y confiabilidad.

**Procesamiento de Lenguaje Natural (PLN)** Rama de la inteligencia artificial orientada al análisis automatizado de textos escritos mediante algoritmos computacionales.

**Proyecto de Grado** Trabajo académico desarrollado por los estudiantes como requisito para obtener su título profesional o tecnológico.

**RBAC (Role-Based Access Control)** Modelo de seguridad basado en roles que permite restringir las funcionalidades según el tipo de usuario dentro del sistema.

**Responsive Design** Diseño adaptable que permite que la plataforma se visualice correctamente en diferentes dispositivos y tamaños de pantalla.

**Rol** Perfil asignado a un usuario dentro de la plataforma, el cual determina los permisos y funcionalidades a las que puede acceder.

**Token** Cadena cifrada utilizada para autenticar usuarios y mantener sesiones seguras dentro de la aplicación.

**Trazabilidad** Capacidad del sistema para registrar y realizar seguimiento al historial completo de un proyecto académico.

**WebSocket** Tecnología que permite la comunicación en tiempo real entre el cliente y el servidor, utilizada para futuras funcionalidades de notificaciones instantáneas.

**Workflow** Flujo de trabajo estructurado que define las etapas de revisión, aprobación y seguimiento de un proyecto de grado.

RESUMEN

En muchas instituciones educativas, la gestión de los proyectos de grado todavía se realiza de forma manual, mediante correos electrónicos y almacenamiento disperso de documentos. Esta situación genera desorganización, retrasos en las revisiones, poca trazabilidad y dificultades para realizar un adecuado seguimiento académico. En el Instituto Superior de Educación Rural (ISER) se identificó claramente esta problemática.

Con el propósito de solucionar esta necesidad, el presente trabajo desarrolla una **Plataforma Web Inteligente para la Gestión de Proyectos de Grado**. La plataforma busca digitalizar y centralizar todos los procesos académicos relacionados con el ciclo de vida de los proyectos, desde su registro hasta su evaluación final.

El sistema fue construido utilizando tecnologías modernas: **Angular** en el frontend, **Node.js** con **Express.js** en el backend, **PostgreSQL** como base de datos y autenticación segura mediante **JSON Web Tokens (JWT)**.

Entre sus principales funcionalidades se encuentran el registro y autenticación de usuarios, control de acceso según roles, gestión completa de proyectos, subida de documentos, seguimiento académico, evaluaciones, biblioteca digital pública y panel administrativo. Además, incorpora un módulo de inteligencia artificial que permite la clasificación automática de los proyectos según su línea temática, lo que facilita la organización académica y apoya la toma de decisiones institucionales.

La arquitectura del sistema se basa en un diseño desacoplado mediante APIs RESTful y el patrón MVC, lo que garantiza escalabilidad, seguridad y facilidad de mantenimiento.

Los resultados obtenidos demuestran que la plataforma contribuye de manera significativa a optimizar los procesos académicos, mejorar la trazabilidad de la información y avanzar en la transformación digital del ISER.

**Palabras clave:** plataforma web, proyectos de grado, inteligencia artificial, gestión académica, API RESTful, JWT, Angular, Node.js, PostgreSQL.

ABSTRACT

In many educational institutions, the management of degree projects is still carried out manually through emails and scattered document storage. This situation leads to disorganization, delays in reviews, poor traceability, and difficulties in academic monitoring. This problem was clearly identified at the Instituto Superior de Educación Rural (ISER).

To address this need, the present project develops an **Intelligent Web Platform for Degree Project Management**. The platform aims to digitize and centralize all academic processes related to the lifecycle of degree projects, from registration to final evaluation.

The system was built using modern technologies: **Angular** for the frontend, **Node.js** with **Express.js** for the backend, **PostgreSQL** as the database, and secure authentication through **JSON Web Tokens (JWT)**.

Key functionalities include user registration and authentication, role-based access control, project management, document upload, academic tracking, evaluations, a public digital library, and an administrative panel. Additionally, it incorporates an artificial intelligence module for the automatic classification of projects by thematic area, which improves academic organization and supports institutional decision-making.

The system’s architecture is based on a decoupled design using RESTful APIs and the MVC pattern, ensuring scalability, security, and maintainability.

The results obtained demonstrate that the platform significantly contributes to optimizing academic processes, improving information traceability, and advancing the digital transformation of the ISER.

**Keywords:** web platform, degree projects, artificial intelligence, academic management, RESTful API, JWT, Angular, Node.js, PostgreSQL.

**1. INTRODUCCIÓN**

Hoy en día, con toda la transformación digital que está viviendo la educación superior, automatizar procesos académicos se ha vuelto algo casi imprescindible. No solo ayuda a que la administración sea más eficiente, sino que también mejora muchísimo la trazabilidad de los documentos y la calidad del seguimiento a los estudiantes. Hay varios estudios que lo respaldan: digitalizar estos procesos reduce tiempos de respuesta, minimiza errores humanos y permite tomar decisiones mucho más informadas con datos reales [1].

Sin embargo, en muchas universidades y el ISER no es la excepción la gestión de los proyectos de grado sigue dependiendo de procesos manuales: correos interminables, archivos dispersos en carpetas, documentos de Word por todos lados. Esto termina generando desorganización, retrasos en las revisiones y un montón de dificultades para tener una visión clara y consolidada de lo que está pasando a nivel institucional.

En nuestro caso, en el programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticos del Instituto Superior de Educación Rural (ISER), los proyectos de grado son una parte clave de la formación. Pero el proceso actual de registro, aprobación y seguimiento es bastante caótico: no hay una plataforma centralizada donde los estudiantes suban sus propuestas, los docentes las revisen, aprueben o sigan los avances de forma ordenada. Esto hace que sea muy difícil rastrear todo el ciclo de vida del proyecto y casi imposible generar métricas útiles para la institución.

En los últimos años han aparecido plataformas web mucho más modernas (con API REST, frontend y backend separados, control de roles, etc.) que permiten crear sistemas escalables y seguros para gestionar temas académicos [2]. Además, integrar Inteligencia Artificial en estos sistemas ya ha mostrado resultados muy buenos: clasificación automática de documentos, detección de patrones y apoyo real en la toma de decisiones [3]. En el mundo educativo, por ejemplo, técnicas de procesamiento de lenguaje natural (NLP) ayudan a analizar textos y categorizarlos según temas específicos, lo que facilita muchísimo organizar el conocimiento de la institución [4].

Aun así, muchas instituciones sobre todo las más pequeñas o regionales todavía no han dado el salto a incorporar herramientas inteligentes en la gestión interna de sus procesos, especialmente en lo que tiene que ver con los trabajos de grado. Y eso trae problemas concretos: sin nada que clasifique automáticamente los proyectos, terminamos con duplicidad de temas, algunos profesores sobrecargados y una asignación de directores que muchas veces no es la más estratégica.

Por eso surgió esta idea: diseñar e implementar una plataforma web inteligente que permita gestionar de forma digital y centralizada todos los proyectos de grado en el ISER. Los estudiantes podrían registrar su propuesta ahí mismo (título, planteamiento del problema, justificación, objetivos, etc), los docentes la revisarían, aprobarían y harían seguimiento sin salir de la plataforma. Y lo más interesante: incluir un módulo de Inteligencia Artificial que lea automáticamente el contenido del proyecto y lo clasifique según la línea temática correspondiente. Esto no solo ayudaría a organizar mejor todo, sino que también facilitaría asignar directores según su experiencia y área de especialidad.

Con esta propuesta lo que queremos es dar un paso adelante en la modernización tecnológica del ISER: hacer que la institución sea más eficiente en lo administrativo, fortalecer la gestión académica y aprovechar de verdad las herramientas digitales junto con inteligencia artificial, pero siempre adaptadas a nuestra realidad educativa.

**2. PLANTEAMIENTO DEL PROBLEMA**

En la educación superior hoy en día, la **transformación digital** ya no es un lujo: es una necesidad para hacer más eficientes los procesos administrativos y fortalecer lo académico. Sin embargo, en muchas instituciones regionales como la nuestra, la gestión de los proyectos de grado sigue dependiendo en gran parte de procesos manuales o apenas digitalizados a medias. Esto genera un montón de problemas: la información no se puede seguir fácilmente, se pierde organización y es muy difícil tener un control real de todo.

En el **ISER**, específicamente en el programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticas, el panorama es bastante complicado. Actualmente, los estudiantes envían sus propuestas por correo electrónico o entregan archivos sueltos, sin que exista una plataforma central que acompañe todo el ciclo de vida del proyecto: desde la idea inicial hasta la sustentación final. La información termina regada en diferentes carpetas, correos, USBs o incluso impresos, lo que hace casi imposible consultar el historial, controlar versiones o sacar reportes consolidados cuando se necesitan.

Esto impacta directamente en la calidad del proceso. Los estudiantes a veces esperan semanas por una retroalimentación, no tienen claro en qué estado está su propuesta y les cuesta mucho hacer seguimiento real de sus avances. Por el lado de los profesores (asesores y jurados), toca manejar un montón de archivos dispersos y comunicaciones por todos lados, lo que aumenta la carga administrativa y deja menos tiempo para acompañar de verdad a los estudiantes con la calidad que merecen.

Otro inconveniente importante es que no contamos con ningún sistema que clasifique automáticamente los temas de los proyectos. No hay forma rápida de saber si una propuesta va por redes, seguridad informática, desarrollo de software, infraestructura tecnológica, etc. Esto termina generando duplicados de temas, una distribución desigual de proyectos entre los docentes y dificultades a la hora de asignar directores según su especialidad real.

¿Por qué seguimos así? Básicamente porque no tenemos una infraestructura tecnológica pensada específicamente para gestionar trabajos de grado, hay limitaciones en la adopción de herramientas digitales más avanzadas y todavía no se han integrado tecnologías como la **Inteligencia Artificial** en los procesos internos de la institución.

Si no hacemos nada al respecto, las consecuencias van a seguir acumulándose: desorganización documental crónica, pérdida de información valiosa, poca capacidad para analizar lo que pasa en el programa, sobrecarga para todos y decisiones estratégicas que se toman casi a ciegas, sin datos reales. A largo plazo, esto termina afectando la calidad de la formación y la imagen de la institución como un lugar moderno y actualizado tecnológicamente.

Por eso, el problema central que queremos abordar es claro: **no existe una plataforma web inteligente** que permita gestionar de forma integral, segura y centralizada todos los proyectos de grado del programa de Tecnología en Gestión de Redes y Sistemas Teleinformáticos del ISER. Idealmente, esta plataforma debería incluir mecanismos automáticos de clasificación temática (por ejemplo, usando IA) y herramientas de seguimiento académico que faciliten la vida a estudiantes, asesores y coordinadores.

## **Pregunta de Investigación:**

## **Pregunta General:**

¿Cómo podemos diseñar e implementar una plataforma web inteligente que realmente facilite y mejore todo el manejo de los proyectos de grado en el Instituto Superior de Educación Rural (ISER)?

La idea es que esta herramienta ayude a organizar mejor el seguimiento, clasifique automáticamente los temas de los proyectos y, sobre todo, permita que tanto estudiantes como profesores y coordinadores tomen decisiones más informadas y rápidas gracias a una trazabilidad clara y datos útiles.

## **Preguntas específicas:**

1. ¿Cuáles son los requerimientos funcionales y no funcionales clave que debemos definir desde el principio para que la plataforma realmente centralice y haga más eficiente todo el ciclo de vida de un proyecto de grado (desde la propuesta inicial hasta la nota final)?
2. ¿Cómo debería ser la arquitectura de esta plataforma web para que sea segura, pueda crecer con el tiempo y permita que cada rol (estudiante, asesor, jurado, coordinador) tenga exactamente los permisos y la visibilidad que necesita, sin que se arme un caos de accesos?
3. ¿De qué forma podemos implementar un módulo que, usando procesamiento de lenguaje natural (PLN), lea las propuestas y clasifique automáticamente los proyectos según la línea temática a la que pertenecen (redes, ciberseguridad, desarrollo de software, infraestructura, etc.)?
4. ¿Cómo pueden las herramientas de analítica académica integradas en la plataforma ayudar a mejorar dos cosas muy concretas:

* asignar de forma más justa y estratégica los directores según su especialidad y carga de trabajo,
* y detectar a tiempo esos proyectos que están en riesgo de retrasarse o de no llegar a buen término?

Una vez implementada la plataforma, ¿qué cambios reales podríamos esperar en la eficiencia administrativa del programa y en la organización general del proceso de proyectos de grado? ¿Cómo se traduciría eso en menos papeleo, menos correos perdidos, retroalimentación más rápida y una mejor experiencia para todos los involucrados?

**3. JUSTIFICACIÓN**

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

## **Alcance.**

1. El presente proyecto tiene como alcance el diseño e implementación de una plataforma web orientada a la gestión integral de los trabajos de grado del Instituto Superior de Educación Rural (ISER), con el propósito de centralizar y optimizar los procesos académicos relacionados con su registro, seguimiento, evaluación y control.

* La plataforma permitirá la administración de usuarios mediante roles definidos (estudiantes, docentes y coordinadores), facilitando el registro de propuestas de grado, la carga y control de versiones de documentos, así como el seguimiento continuo del estado de cada proyecto durante su ciclo de vida académico.
* Adicionalmente, el sistema incorporará funcionalidades de analítica académica que permitirán generar reportes e indicadores sobre el estado de los proyectos, la carga de trabajo de los docentes y el avance general dentro de la institución, contribuyendo a la toma de decisiones informadas.
* Como valor agregado, se integrarán herramientas de inteligencia artificial que apoyarán el análisis automatizado de la información contenida en las propuestas de grado, permitiendo su clasificación temática y facilitando la organización académica sin requerir el desarrollo de modelos propios desde cero.
* Desde el punto de vista técnico, la solución será desarrollada como una aplicación web bajo una arquitectura cliente-servidor, utilizando tecnologías modernas para el desarrollo del frontend, backend y la gestión de bases de datos, garantizando escalabilidad, seguridad y mantenibilidad del sistema.

## **Delimitación.**

1. El desarrollo de la plataforma estará limitado al contexto académico del Instituto Superior de Educación Rural (ISER), enfocado exclusivamente en la gestión de los trabajos de grado, sin contemplar la integración con otros sistemas institucionales como plataformas académicas, sistemas financieros o de matrícula.

* El proyecto no incluye el desarrollo de aplicaciones móviles, centrándose únicamente en una solución web accesible desde navegadores. Asimismo, el uso de inteligencia artificial se limitará a la integración de herramientas existentes para el análisis de texto, sin abordar el desarrollo de algoritmos o modelos avanzados desde cero.
* De igual forma, la plataforma será desarrollada como un prototipo funcional, orientado a validar su viabilidad técnica y su impacto en la mejora de los procesos académicos, sin contemplar su despliegue en un entorno productivo institucional completo.
* Finalmente, el alcance del proyecto se restringe a las funcionalidades definidas en los objetivos planteados, por lo que cualquier ampliación o integración futura deberá considerarse como trabajo posterior.

**4. OBJETIVOS**

**A. Objetivo general:**

Diseñar e implementar una plataforma web para la gestión integral de los trabajos de grado del Instituto Superior de Educación Rural (ISER), mediante el uso de una arquitectura web moderna y el uso de herramientas de inteligencia artificial (IA) con el fin de mejorar los procesos de seguimiento, evaluación y análisis académico mejorando la trazabilidad y toma de decisiones.

**B. Objetivos específicos:**

En estos objetivos específicos se estructura el funcionamiento de las fases del desarrollo del sistema, abarcando desde el diseño, desarrollo e implementación de la plataforma:

1. Diseñar la arquitectura del sistema, definiendo la estructura de la plataforma web, así como seleccionar las tecnologías a utilizar para su desarrollo, incluyendo Herramientas para el backend, frontend, gestión de base de datos, integración mediante APIs, la definición de módulos, funcionalidades y los roles de los usuarios que conformaran el sistema.
2. Desarrollar la plataforma web, incluyendo el diseño de la base de datos, la implantación del backend, el desarrollo del frontend y la integración de los componentes del sistema.
3. Implementar las funcionalidades complementarias, integrar las herramientas de inteligencia artificial (IA) del análisis automatizado de los proyectos de grado, y el desarrollar las pruebas funcionales del sistema, junto con los ajustes, con el fin del despliegue de prueba de la plataforma y preparar la entrega final.

**5. MARCO TEÓRICO**

**5.1. ANTECEDENTES:**

La transformación digital en las instituciones de educación superior ha impulsado el desarrollo de plataformas tecnológicas orientadas a optimizar y modernizar los procesos académicos y administrativos. Diversos estudios han demostrado que la implementación de sistemas digitales mejora significativamente la organización documental, reduce los tiempos de respuesta y facilita la toma de decisiones basadas en información confiable y estructurada. Según Alenezi, esta transformación permite fortalecer la eficiencia institucional a través de la automatización de procesos y el uso de tecnologías inteligentes [1].

En el contexto universitario, diversas instituciones han desarrollado plataformas web para la gestión de procesos educativos, las cuales incorporan arquitecturas modernas basadas en modelos cliente-servidor, servicios RESTful y mecanismos de autenticación segura. Estas soluciones han logrado centralizar la información académica y mejorar el seguimiento de las actividades de estudiantes y docentes [2].

Por otra parte, el avance de la Inteligencia Artificial (IA) y del Procesamiento de Lenguaje Natural (PLN) ha abierto la posibilidad de incorporar herramientas de análisis automático de documentos y clasificación temática de textos. Estas tecnologías se utilizan cada vez más para categorizar contenidos, identificar patrones y apoyar la organización documental en diversos ámbitos, incluyendo el sector educativo [3].

Desde el ámbito de la ingeniería de software, Sommerville enfatiza que los sistemas modernos deben construirse bajo arquitecturas escalables, mantenibles y seguras, aplicando principios como la separación por capas, la modularidad y el control de acceso basado en roles [4]. Estas prácticas resultan fundamentales para garantizar la sostenibilidad y evolución de las plataformas tecnológicas en entornos institucionales.

Sin embargo, en el Instituto Superior de Educación Rural (ISER) aún no se cuenta con una plataforma centralizada para la gestión integral de los trabajos de grado. Actualmente, la mayoría de estos procesos se realizan a través de correos electrónicos, documentos físicos y almacenamiento disperso de archivos, lo que genera dificultades en el seguimiento, retrasos administrativos y limitaciones en la organización de la información académica.

Es por ello que surge la necesidad de diseñar e implementar una plataforma web inteligente que permita automatizar y centralizar los procesos relacionados con los proyectos de grado, integrando herramientas de análisis automatizado para la clasificación temática y la gestión académica institucional.

**5.2. MARCO CONCEPTUAL:**

Para el desarrollo del presente proyecto resulta necesario definir los conceptos fundamentales relacionados con plataformas web, arquitectura de software, inteligencia artificial y gestión académica.

**Plataforma Web** Una plataforma web es un sistema accesible a través de navegadores de internet que permite centralizar y ejecutar diversas funcionalidades desde un servidor. Este tipo de plataformas facilitan el acceso remoto a la información, la gestión de datos y la interacción entre diferentes usuarios [2].

**API RESTful** Las API RESTful son interfaces de comunicación entre sistemas que utilizan el protocolo HTTP para intercambiar información de manera estructurada y escalable. Este enfoque permite una clara separación de responsabilidades entre el frontend y el backend en arquitecturas modernas [2].

**Arquitectura Cliente-Servidor** La arquitectura cliente-servidor divide el sistema en dos componentes principales: el cliente, responsable de la interfaz gráfica y la interacción con el usuario, y el servidor, encargado de procesar la lógica de negocio y gestionar los datos almacenados en la base de datos [4].

**RBAC (Role-Based Access Control)** El control de acceso basado en roles (RBAC) es un mecanismo de seguridad que limita las acciones que puede realizar un usuario según su rol dentro del sistema. De esta forma, cada usuario tiene asignados permisos específicos de acuerdo con sus responsabilidades [4].

**JSON Web Token (JWT)** JWT es un estándar de autenticación que utiliza tokens digitales para verificar la identidad de los usuarios y proteger el acceso a las rutas privadas de una aplicación web.

**Inteligencia Artificial (IA)** La Inteligencia Artificial comprende el conjunto de técnicas computacionales que buscan simular capacidades humanas como el análisis, la clasificación y la toma de decisiones automatizadas. En este proyecto, la IA se utilizará principalmente para analizar y clasificar los proyectos de grado según su temática.

**Procesamiento de Lenguaje Natural (PLN)** El Procesamiento de Lenguaje Natural es una rama de la inteligencia artificial que permite analizar textos escritos mediante algoritmos, identificando patrones, categorías y relaciones semánticas entre las palabras [3].

**Trazabilidad Académica** La trazabilidad académica se refiere a la capacidad de registrar y consultar el historial completo de un proceso académico, permitiendo el seguimiento, control y monitoreo continuo de la información relacionada con estudiantes, proyectos y evaluaciones.

**PostgreSQL** PostgreSQL es un sistema gestor de bases de datos relacional de código abierto, ampliamente utilizado por su robustez, seguridad y eficiencia en el almacenamiento y consulta de información estructurada.

**Angular** Angular es un framework frontend desarrollado por Google que facilita la construcción de aplicaciones web dinámicas, modulares y con componentes reutilizables.

**Node.js y Express.js** Node.js es un entorno de ejecución de JavaScript del lado del servidor, mientras que Express.js es un framework que simplifica el desarrollo de APIs RESTful y aplicaciones backend escalables y de alto rendimiento.

**5.3. MARCO TEÓRICO:**

La gestión de la información académica mediante plataformas digitales se ha convertido en una necesidad cada vez más evidente en las instituciones de educación superior, impulsada por el constante crecimiento de los procesos administrativos y el volumen de información documental. La implementación de sistemas web permite optimizar recursos, mejorar la organización institucional y reducir significativamente los tiempos asociados a tareas manuales [1].

Desde la perspectiva de la ingeniería de software, el desarrollo de aplicaciones modernas se basa en arquitecturas desacopladas que separan claramente el frontend, el backend y la base de datos. Este enfoque favorece la escalabilidad, la mantenibilidad y la reutilización de componentes del sistema [4]. En este contexto, las arquitecturas basadas en APIs RESTful se han consolidado como uno de los modelos más utilizados, al permitir una comunicación eficiente y estandarizada entre los diferentes servicios y aplicaciones cliente [2].

Un patrón ampliamente implementado en aplicaciones web es el Modelo-Vista-Controlador (MVC), el cual separa la lógica de negocio, la interfaz gráfica y el manejo de datos. Esta división modular facilita la organización del código fuente y simplifica el mantenimiento y evolución del software a lo largo del tiempo [4].

Por otra parte, la seguridad informática constituye un aspecto fundamental en plataformas académicas, especialmente cuando se manejan documentos institucionales y datos personales de estudiantes y docentes. Por ello, mecanismos como JSON Web Tokens (JWT) y el control de acceso basado en roles (RBAC) resultan esenciales para proteger rutas privadas, autenticar usuarios y restringir las acciones según los permisos asignados a cada rol dentro del sistema.

En cuanto a las tecnologías empleadas, Angular facilita el desarrollo de interfaces web dinámicas, modernas y responsivas. Por su parte, Node.js junto con Express.js permiten construir servicios backend robustos orientados a arquitecturas REST, mientras que PostgreSQL ofrece un sistema gestor de bases de datos relacional confiable, seguro y eficiente para el almacenamiento y administración de información estructurada.

Adicionalmente, la integración de Inteligencia Artificial en entornos educativos ha abierto la posibilidad de automatizar tareas como el análisis documental y la clasificación de información. Las técnicas de Procesamiento de Lenguaje Natural (PLN) permiten analizar textos de forma automática e identificar categorías temáticas específicas [3]. En el caso de los proyectos de grado, estas herramientas pueden emplearse para detectar líneas de investigación tales como desarrollo de software, redes, ciberseguridad o infraestructura tecnológica, facilitando la asignación de asesores y evitando duplicidades en los temas de investigación.

De igual manera, la analítica académica se ha consolidado como un recurso valioso para apoyar la toma de decisiones institucionales, ya que permite identificar tendencias, detectar retrasos en los proyectos y optimizar la distribución de cargas académicas entre los docentes.

Por consiguiente, el presente proyecto se fundamenta teóricamente en la integración de arquitecturas web modernas, mecanismos de seguridad informática, bases de datos relacionales e inteligencia artificial aplicada al análisis automatizado de información académica, con el objetivo de modernizar y optimizar la gestión de los trabajos de grado en el Instituto Superior de Educación Rural (ISER).

**5.4. MARCO LEGAL:**

El desarrollo de la plataforma web para la gestión de proyectos de grado debe cumplir con las disposiciones legales vigentes en Colombia relacionadas con la protección de datos personales, los derechos de autor y la seguridad de la información.

Ley 1581 de 2012 – Protección de Datos Personales La Ley 1581 de 2012 establece las disposiciones generales para la protección de datos personales en Colombia. Esta normativa regula el tratamiento de información sensible y obliga a las organizaciones a garantizar principios fundamentales como la confidencialidad, la seguridad y la autorización expresa del titular de los datos.

Dado que la plataforma gestionará información académica de estudiantes y docentes, será indispensable implementar mecanismos robustos de autenticación y control de acceso que garanticen la privacidad de los usuarios.

Ley 1273 de 2009 – Delitos Informáticos La Ley 1273 de 2009, mediante la cual se modifica el Código Penal, tipifica y sanciona los delitos informáticos y busca proteger la información digital. Esta ley subraya la importancia de adoptar medidas de seguridad adecuadas para prevenir accesos no autorizados, alteraciones o vulnerabilidades en los sistemas tecnológicos.

Ley 23 de 1982 – Derechos de Autor La Ley 23 de 1982 regula los derechos de autor en Colombia y protege las obras intelectuales y académicas. En el marco de este proyecto, esta normativa aplica tanto al software desarrollado como a los documentos y trabajos de grado que serán almacenados en la plataforma.

ISO/IEC 27001 La norma ISO/IEC 27001 es el estándar internacional de referencia para la gestión de seguridad de la información. Establece buenas prácticas y controles orientados a la autenticación, la gestión de accesos y la protección adecuada de los datos digitales.

Habeas Data El principio de Habeas Data garantiza a toda persona el derecho a conocer, actualizar, rectificar e incluso suprimir la información que sobre ella se encuentre almacenada en bases de datos o sistemas digitales.

**6. METODOLOGÍA**

**6.1. Tipo de Investigación:**

El presente proyecto se desarrolla bajo la modalidad de investigación aplicada con un enfoque de desarrollo experimental. Esta combinación se justifica porque busca diseñar e implementar una solución tecnológica concreta para resolver una problemática real detectada en el Instituto Superior de Educación Rural (ISER), relacionada con la gestión de los proyectos de grado.

La investigación aplicada se orienta a utilizar los conocimientos teóricos y tecnológicos disponibles para dar solución a necesidades específicas de un contexto institucional. Por su parte, el desarrollo experimental se centra en la construcción y validación de un prototipo funcional, mediante la realización de pruebas técnicas y la evaluación de los resultados obtenidos.

En este sentido, el proyecto se centra en el diseño y desarrollo de una plataforma web inteligente que permita centralizar los procesos académicos de registro, seguimiento, evaluación y clasificación automática de trabajos de grado, haciendo uso de herramientas de inteligencia artificial.

**6.2. Enfoque de Investigación:**

El presente proyecto adopta un enfoque mixto, al integrar componentes tanto cuantitativos como cualitativos durante el desarrollo y la validación de la plataforma.

Enfoque Cuantitativo El enfoque cuantitativo permitirá medir y evaluar los aspectos técnicos y funcionales del sistema a través de indicadores objetivos y medibles, tales como:

* Tiempo de respuesta de la plataforma.
* Número de proyectos registrados.
* Cantidad de usuarios autenticados en el sistema.
* Número de proyectos clasificados automáticamente.
* Cantidad de entregas y evaluaciones realizadas.
* Reducción del tiempo empleado en el seguimiento académico.

Enfoque Cualitativo Por su parte, el enfoque cualitativo se centrará en analizar la experiencia de los usuarios y la utilidad real de la plataforma dentro del contexto institucional. Para ello se contemplan las siguientes actividades:

* Pruebas funcionales.
* Validación de interfaces.
* Retroalimentación de los usuarios.
* Evaluación de usabilidad.
* Análisis de satisfacción de estudiantes y docentes.

**6.3. Modelo de Desarrollo:**

Para el desarrollo de la plataforma se adoptó el modelo de desarrollo Cascada Compacto. Esta metodología fue seleccionada porque permite organizar el proyecto en fases bien definidas y secuenciales, facilitando el control de los avances, el cumplimiento de entregables y el seguimiento general del proceso de construcción del sistema.

Las fases implementadas en el proyecto fueron las siguientes:

* Análisis y definición de requerimientos.
* Diseño de la arquitectura y de la base de datos.
* Desarrollo del backend.
* Desarrollo del frontend.
* Integración del módulo de inteligencia artificial.
* Pruebas funcionales y validación.
* Documentación y entrega final.

**6.4. Fases de Desarrollo del Proyecto:**

**Fase de Análisis y Recolección de Requerimientos**

Durante esta fase se realizó un análisis detallado de las problemáticas existentes en la gestión actual de los proyectos de grado en el Instituto Superior de Educación Rural (ISER). A partir de este diagnóstico se identificaron las necesidades funcionales y no funcionales que debía cumplir la plataforma.

Se definieron los diferentes roles institucionales que interactuarían con el sistema, entre los cuales se encuentran:

* Estudiante
* Docente
* Coordinador
* Jurado
* Administrador
* Usuario público

Asimismo, se establecieron las funcionalidades principales de la plataforma, destacando las siguientes:

* Registro y autenticación de usuarios
* Gestión de proyectos de grado
* Carga y administración de documentos
* Seguimiento académico
* Evaluaciones y calificaciones
* Control de roles y permisos
* Biblioteca pública de proyectos
* Clasificación inteligente de proyectos mediante Inteligencia Artificial

**Fase de Diseño del Sistema**

En esta etapa se diseñó la arquitectura general de la plataforma, definiendo una estructura desacoplada que separa claramente el frontend del backend, basada en APIs RESTful y el patrón de diseño Modelo-Vista-Controlador (MVC).

La arquitectura del sistema quedó organizada de la siguiente manera:

* **Frontend**: Desarrollado con Angular.
* **Backend**: Desarrollado con Node.js y Express.js.
* **Base de datos**: PostgreSQL.
* **Módulo de Inteligencia Artificial**: Implementado de forma independiente.
* **Capa de seguridad**: Middleware con JWT y control de acceso basado en roles (RBAC).

Adicionalmente, se definió la estructura de carpetas y módulos del proyecto, la cual incluye los siguientes elementos principales:

* Controllers
* Routes
* Models
* Middleware
* Services
* Modules de IA
* Guards
* Interceptors

Finalmente, se elaboró el modelo entidad-relación de la base de datos, contemplando las principales tablas del sistema tales como: usuarios, proyectos, entregas, evaluaciones, líneas temáticas, notificaciones y usuario\_roles.

![](data:image/png;base64...)![](data:image/png;base64...)

Fig. 1. Estructura general del proyecto. *(Fuente: Elaboración propia utilizando Visual Studio Code)* Fig. 2Estructura de la base de datos *(Visual Studio Code)*

![](data:image/png;base64...)

Fig. 3. Diagrama entidad-relación de la base de datos. *(Fuente: Elaboración propia utilizando Visual Studio Code)*

![](data:image/png;base64...)

Fig. 4. Conexión de PostgreSQL mediante pool de conexiones. *(Fuente: Elaboración propia utilizando Visual Studio Code)*

![](data:image/png;base64...)

Fig. 5. Vista de las tablas principales en la interfaz de pgAdmin4. *(Fuente: Captura de pantalla obtenida en pgAdmin4)*

**Fase de Desarrollo del Backend**

En esta fase se implementó el servidor backend utilizando **Node.js** junto con el framework **Express.js**.

Se desarrollaron los siguientes componentes principales:

**Configuración**

* db.js Función: Establece la conexión a la base de datos PostgreSQL mediante un pool de conexiones y exporta la configuración para su uso en toda la aplicación.

**Controladores**

* authController.js Función: Gestiona la autenticación de usuarios (registro, inicio de sesión) y operaciones CRUD sobre usuarios (solo para administradores/coordinadores).
* projectController.js Función: Gestiona las operaciones CRUD sobre proyectos y consultas específicas relacionadas con proyectos (mis proyectos, proyectos asignados).
* entregaController.js Función: Gestiona la subida y consulta de entregas (archivos) asociadas a proyectos.

**Middlewares**

* authMiddleware.js Función: Verifica la validez del token JWT en las rutas protegidas y adjunta los datos del usuario decodificado a req.user.
* roleMiddleware.js Función: Verificar el rol del usuario (obtenido de req.user.rol mediante authMiddleware) para permitir o denegar acceso basado en permisos.
* uploadMiddleware.js Función: Procesar la subida de archivos (usualmente con multer) y adjuntar el archivo subido a req.file.
* errorMiddleware.js Función: Capturar errores síncronos y asíncronos en toda la aplicación y formatear una respuesta de error consistente.

Entre las funcionalidades implementadas destacan:

* Registro de usuarios
* Inicio de sesión con autenticación mediante JWT
* Operaciones CRUD completas para proyectos
* Control de acceso basado en roles
* Gestión de entregas de proyectos
* Subida y manejo de archivos
* Recuperación de contraseña
* Envío de notificaciones por correo electrónico

Adicionalmente, se definieron las principales rutas de la API REST, entre las que se incluyen:

* /api/auth
* /api/projects
* /api/entregas
* /api/ai

![](data:image/png;base64...)

Fig. 6. Organización y estructura de directorios del backend. *(Fuente: Elaboración propia utilizando Visual Studio Code)*

![](data:image/png;base64...)

Fig. 7. Configuración de rutas de autenticación en el archivo authRoutes.js. *(Fuente: Elaboración propia utilizando Visual Studio Code)*

**Fase de Desarrollo del Frontend**

En esta fase se desarrolló la interfaz gráfica de la plataforma utilizando **Angular 21**, **TypeScript** y **SCSS** para los estilos.

Previamente, se realizaron los diseños y bocetos de todas las pantallas mediante la herramienta **Figma**, lo que permitió definir la estructura visual, la experiencia de usuario (UX) y el diseño de interfaz (UI) de forma clara y organizada antes de comenzar la codificación.

Se implementaron las siguientes vistas y pantallas principales:

* Login
* Registro de usuarios
* Recuperación de contraseña
* Panel de Administrador
* Panel de Coordinador
* Panel de Docente
* Panel de Estudiante
* Gestión de proyectos
* Biblioteca pública de proyectos

Adicionalmente, se desarrollaron componentes técnicos esenciales para el correcto funcionamiento de la aplicación, entre los que se destacan:

* Guards de autenticación
* Guards de roles
* Interceptores JWT para el manejo de tokens
* Servicios HTTP para la comunicación con el backend
* Navegación dinámica según el rol del usuario

![](data:image/png;base64...)

Fig. 8. Diseño del boceto de la interfaz de la plataforma web. *(Fuente: Elaboración propia mediante Figma)*

![](data:image/png;base64...)

Fig. 9. Verificación de la conexión exitosa del sistema a través de la terminal. *(Fuente: Captura de pantalla en entorno de desarrollo)*

![](data:image/png;base64...)

Fig. 10. Fragmento de código correspondiente al módulo de la biblioteca digital. *(Fuente: Elaboración propia utilizando Visual Studio Code)*

**Fase de Integración del Módulo de Inteligencia Artificial**

Como parte de las siguientes etapas del proyecto, se contempla el desarrollo e integración de un módulo de inteligencia artificial que se ubicará en la ruta:

/ia/ia-clasificacion/

Este módulo estará diseñado para analizar el contenido textual de los proyectos de grado y clasificarlos automáticamente según sus líneas temáticas principales, tales como:

* Redes y sistemas.
* Desarrollo de software.
* Seguridad informática.
* Infraestructura tecnológica.

Actualmente se ha definido la estructura general y la ubicación del módulo de Inteligencia Artificial (IA) mediante la integración de un chatbot interactivo. El sistema analiza los títulos y la descripción, ejecutando una clasificación que optimiza la búsqueda y preselección de proyectos.

![](data:image/png;base64...)

Fig. 11. Interfaz del chatbot integrado en el módulo de la biblioteca. *(Fuente: Captura de pantalla en entorno de pruebas)*

![](data:image/png;base64...)

Fig. 12. Interfaz del chatbot integrado en el módulo de los estudiantes. *(Fuente: Captura de pantalla en entorno de pruebas)*

**7. RESULTADOS**

**7.1. pruebas y Validación del Sistema**

Con el fin de verificar el correcto funcionamiento de la plataforma, se realizaron pruebas funcionales exhaustivas sobre los diferentes módulos implementados en el sistema de gestión de proyectos de grado.

Las pruebas incluyeron las siguientes funcionalidades:

* Registro de usuarios.
* Inicio de sesión.
* CRUD de proyectos (Crear, Leer, Actualizar y Eliminar).
* Gestión de roles.
* Subida de documentos.
* Navegación entre los distintos módulos.
* Protección de rutas mediante JWT.
* Comunicación entre el frontend y el backend.
* Validación de formularios.
* Restricción de acceso según roles de usuario.

Los resultados de estas pruebas permitieron confirmar la estabilidad y el correcto funcionamiento general del sistema. Además, se identificaron errores relacionados con validaciones, navegación y seguridad, los cuales fueron detectados y corregidos oportunamente durante el proceso de desarrollo.

**7.2. Pruebas y Validación del Sistema**

![](data:image/png;base64...)

Fig. 13. Configuración de scripts de automatización en el archivo package.json. *(Fuente: Elaboración propia utilizando Visual Studio Code)*

Cree este package.json con el fin de que el proyecto instale y corra las dependencias de backend y del frontend en un solo comando para ejecutar todo a la vez sin tener que estar abriendo la terminal y buscar la carpeta para instalar las dependencias y correrlas.

![](data:image/png;base64...)

Fig. 14. Interfaz y pantalla para el inicio de la biblioteca. *(Fuente: Captura de pantalla en entorno de pruebas)*

Al ingresar a la dirección que nos la el frontend nos manda por defecto a la biblioteca de uso publico con apartado de chat bot para facilitar las búsquedas por medio de recomendaciones.

![](data:image/png;base64...)

Fig. 15. Interfaz y pantalla para el inicio de sesión de usuarios. *(Fuente: Captura de pantalla en entorno de pruebas)*

Entramos como personal educativo y nos lleva a un lo gin dependiendo del rol ingresamos a un home diferente en este caso con el coordinador.

![](data:image/png;base64...)

Fig. 16. Panel de control principal (Dashboard) del usuario coordinador. *(Fuente: Captura de pantalla en entorno de pruebas)*

Encontramos un pane para el coordinador donde se puede ver dos botones superiores para el registro de estudiantes y docentes, una ventana de carpetas donde se encuntran los documentos de los estudiantes dos ventanas donde esta el listado de estudiantes y docentes registrados, una ventana para ver el contenido de los estudiantes y asignar los estudiantes al docente y una ventana para ver el nivel de los trabajos entregados.

![](data:image/png;base64...)

Fig. 17. Formulario e interfaz para el registro de estudiantes por parte del coordinador. *(Fuente: Captura de pantalla en entorno de pruebas)*

![](data:image/png;base64...)

Fig. 18. Formulario de registro para la incorporación de nuevos docentes desde el rol coordinador. *(Fuente: Captura de pantalla en entorno de pruebas)*

![](data:image/png;base64...)

Fig. 19. Listado general y actualizado del personal docente registrado en la plataforma. *(Fuente: Captura de pantalla en entorno de pruebas)*

![](data:image/png;base64...)

Fig. 20. Panel de control principal e interfaz del perfil estudiante. *(Fuente: Captura de pantalla en entorno de pruebas)*

Al entrar a los apartados de registrar docentes y alumnos encontramos un crud habitual en el que se puede registra un usuario nuevo o editar la información de uno ya creado, y el peor de los casos eliminarlo.

![](data:image/png;base64...)

Fig. 21. Panel de control principal e interfaz del perfil estudiante. *(Fuente: Captura de pantalla en entorno de pruebas)*

Si ingresamos como vamos a encontrar 4 ventanas de contenido la que el de la izquierda que es el de las carpetas donde se va a guardar los informes y documentación en la ventana del centro encintamos en donde se va a subir la documentación y una vez subida se va a ver el contenido en la ventana inferior el porcentaje de los trabajos entregados y en la venta de la derecha se va a ver el cronograma académico de los estudiantes de trabajo de grado.

![](data:image/png;base64...)

Fig. 22. Panel de control principal e interfaz adaptada para el perfil docente. *(Fuente: Captura de pantalla en entorno de pruebas)*

En este panel encontramos lo mismo de las otros paneles una ventana donde se encuentran los documentos los estudiantes asignados al docente, la barra de entrega de trabajos y la ventana donde se puede ver la documentación tiene un apartado extra debajo de la ventana de ver los documentos en que el docente puede apreciar los estudiantes que esta asesorando y a los que va a evaluar como jurado.

![](data:image/png;base64...)

Fig. 23. Módulo de administración para la gestión y control de usuarios dentro de la plataforma. *(Fuente: Captura de pantalla en entorno de pruebas)*

![](data:image/png;base64...)

Fig. 24. Panel del administrador enfocado en el seguimiento y control de proyectos de grado. *(Fuente: Captura de pantalla en entorno de pruebas)*

En esta se puede hacer un crud de todos los usuarios como de los proyectos.

**8. DISCUSIÓN**

El desarrollo de la Plataforma Web Inteligente para la Gestión de Proyectos de Grado permitió atender una problemática real identificada en el Instituto Superior de Educación Rural (ISER): la gestión manual y descentralizada de los trabajos de grado. Durante el análisis inicial se evidenció que la mayoría de los procesos académicos —registro, revisión y seguimiento de proyectos— se realizaban mediante correos electrónicos, documentos físicos y almacenamiento disperso de archivos. Esto generaba retrasos administrativos, dificultades en la trazabilidad y baja eficiencia en la organización de la información institucional.

La implementación de una plataforma web centralizada representa un avance importante en la transformación digital del entorno académico del ISER. El sistema desarrollado permite organizar la información de forma estructurada, mejorar el seguimiento de los proyectos y facilitar la interacción entre estudiantes, docentes, coordinadores y jurados a través de un entorno digital accesible y seguro.

Uno de los aspectos más relevantes del proyecto es la adopción de una arquitectura moderna basada en frontend y backend desacoplados mediante APIs RESTful. El uso de Angular para la creación de interfaces dinámicas y responsivas, junto con Node.js y Express.js para la lógica del servidor, permitió construir una plataforma modular, escalable y de fácil mantenimiento. Asimismo, PostgreSQL ofreció una base de datos robusta y confiable para el almacenamiento de la información académica y documental.

En materia de seguridad, la implementación de autenticación mediante JSON Web Tokens (JWT) y el control de acceso basado en roles (RBAC) garantiza que cada usuario pueda acceder únicamente a las funcionalidades correspondientes a su perfil, protegiendo de esta manera la información académica sensible.

Un componente diferencial del proyecto es la integración de inteligencia artificial través de un asistente virtual interactivo (chatbot). En lugar de utilizar los esquemas de búsqueda tradicionales y rígidos, este módulo analiza de forma activa las cadenas de texto ingresadas por los usuarios —ya sean palabras clave, títulos o descripciones de propuestas—, interpretando su intención de búsqueda para sugerir de manera dinámica y precisa las alternativas temáticas más relevantes.ss Esta implementación valida el cumplimiento de los objetivos de automatización planteados en el proyecto, al demostrar cómo la integración de una interfaz inteligente mejora significativamente la accesibilidad, apoya una preselección guiada de documentos y agiliza el proceso de consulta dentro de la plataforma.

Otro beneficio importante radica en la mejora de la trazabilidad de los procesos académicos. La plataforma permite registrar entregas, evaluaciones, observaciones y estados de aprobación, ofreciendo un seguimiento continuo y ordenado de cada proyecto, en contraste con el modelo tradicional basado en archivos aislados y comunicación informal.

Durante el desarrollo también se identificaron ciertas limitaciones. Aunque la estructura del sistema está preparada para crecer, algunas funcionalidades —especialmente las relacionadas con inteligencia artificial avanzada, análisis predictivo y comunicación en tiempo real— aún requieren consolidación. Además, el sistema necesita procesos adicionales de optimización, pruebas automatizadas y despliegue en entornos productivos.

A pesar de estas limitaciones, el proyecto presenta un alto potencial de escalabilidad. La arquitectura implementada facilita la incorporación futura de funcionalidades como integración continua (CI/CD), contenedores Docker, notificaciones inteligentes, dashboards analíticos y asistentes académicos basados en Procesamiento de Lenguaje Natural (PLN).

En términos generales, los resultados obtenidos demuestran que la plataforma desarrollada es una solución tecnológica viable y funcional para modernizar la gestión de proyectos de grado en el ISER. Más allá de optimizar los procesos administrativos y académicos, el sistema contribuye de manera significativa a la transformación digital de la institución mediante la integración de tecnologías modernas en desarrollo web, seguridad informática e inteligencia artificial.

**9. CONCLUSIONES**

Aunque la plataforma desarrollada cumple con la mayoría de los objetivos planteados inicialmente, durante su implementación se identificaron diversos aspectos técnicos y funcionales que aún requieren ajustes y fortalecimiento para alcanzar una versión institucional completamente estable y optimizada.

En la actualidad, uno de los puntos que se encuentra en proceso de mejora es el sistema de carga y gestión de documentos. Se están realizando ajustes en las validaciones de archivos, la organización del almacenamiento y el control de versiones, con el fin de garantizar mayor estabilidad y seguridad en la subida de las entregas académicas.

De igual forma, el módulo de inteligencia artificial se encuentra aún en una etapa inicial de integración y entrenamiento. Aunque ya se cuenta con la estructura base para la clasificación temática de proyectos, es necesario continuar con el entrenamiento del modelo utilizando una mayor cantidad de datos académicos, optimizar su precisión y ampliar las categorías temáticas para mejorar los resultados.

Otro aspecto pendiente es la incorporación de funcionalidades inteligentes en los paneles de usuario. Se tiene previsto implementar chatbots interactivos (mediante burbujas flotantes) en los perfiles de estudiante, docente y coordinador, con el propósito de ofrecer asistencia rápida, orientación sobre procesos académicos y apoyo en la navegación dentro de la plataforma.

Adicionalmente, se continúan realizando ajustes menores en las interfaces gráficas, la experiencia de usuario (UX), validaciones en el frontend y la organización visual de algunos módulos, con el objetivo de mejorar la usabilidad y la presentación general del sistema.

Finalmente, entre las mejoras futuras se contempla la integración de herramientas en tiempo real, la optimización de rendimiento, la implementación de pruebas automatizadas y el despliegue completo en el entorno institucional, todo ello orientado a garantizar mayor escalabilidad y estabilidad de la plataforma en condiciones reales de producción.

**10. RECOMENDACIONES**

Se recomienda continuar el fortalecimiento de la Plataforma Web Inteligente para consolidarla como una solución institucional robusta, escalable y alineada con la transformación digital del ISER.

Entre las principales recomendaciones se destacan las siguientes:

* **Fortalecer el módulo de inteligencia artificial** mediante técnicas avanzadas de Procesamiento de Lenguaje Natural (PLN) y su entrenamiento con una mayor cantidad de proyectos académicos reales, con el fin de mejorar la precisión en la clasificación temática y la asignación de asesores.
* **Incorporar asistentes virtuales o chatbots interactivos** en los paneles de estudiante, docente y coordinador, para brindar orientación automática, resolver dudas frecuentes y mejorar la experiencia de usuario.
* **Optimizar el módulo de gestión documental**, implementando validaciones avanzadas de archivos, control de versiones y organización automatizada, para garantizar mayor seguridad y trazabilidad.
* **Integrar tecnologías de comunicación en tiempo real** (WebSockets) que permitan notificaciones instantáneas y seguimiento continuo de las actividades académicas.
* **Adoptar buenas prácticas de despliegue**, tales como Docker y CI/CD, junto con pruebas automatizadas, para facilitar el mantenimiento, las actualizaciones y la escalabilidad del sistema.
* **Reforzar los mecanismos de seguridad** mediante auditorías, monitoreo de accesos y protección de datos, asegurando el cumplimiento de las normativas vigentes.
* **Ampliar las capacidades analíticas** del sistema mediante dashboards e indicadores que apoyen la toma de decisiones estratégicas en la institución.

La implementación progresiva de estas recomendaciones permitirá evolucionar la plataforma hacia una versión más completa y consolidada.

**11. REFERENCIAS**

1. A. Alenezi, “Digital Transformation in Higher Education: Challenges and Opportunities,” International Journal of Educational Technology in Higher Education, vol. 18, no. 1, pp. 1–17, 2021.
2. W T. Erl, RESTful Web APIs: Services for a Changing World. Upper Saddle River, NJ, USA: Prentice Hall, 2015.
3. M. Fowler, Patterns of Enterprise Application Architecture. Boston, MA, USA: Addison-Wesley, 2003.
4. I. Sommerville, *Software Engineering*, 10th ed. Boston, MA, USA: Pearson, 2016.
5. Software Engineering I. Sommerville, *Software Engineering*, 10th ed. Boston, MA, USA: Pearson, 2016.
6. RESTful Web APIs L. Richardson y M. Amundsen, *RESTful Web APIs*. Sebastopol, CA, USA: O’Reilly Media, 2013.
7. Patterns of Enterprise Application Architecture M. Fowler, *Patterns of Enterprise Application Architecture*. Boston, MA, USA: Addison-Wesley, 2003.
8. Digital Transformation in Higher Education A. Alenezi, “Digital Transformation in Higher Education: Challenges and Opportunities,” *International Journal of Educational Technology in Higher Education*, vol. 18, no. 1, pp. 1–17, 2021.
9. Natural Language Processing D. Jurafsky y J. H. Martin, *Speech and Language Processing: An Introduction to Natural Language Processing, Computational Linguistics, and Speech Recognition*, 3rd ed. Pearson, 2023.
10. Congreso de la República de Colombia, *Ley 1581 de 2012*, “Por la cual se dictan disposiciones generales para la protección de datos personales”, Colombia, 2012.
11. Congreso de la República de Colombia, *Ley 1273 de 2009*, “Por medio de la cual se modifica el Código Penal y se crea el bien jurídico tutelado denominado ‘de la protección de la información y de los datos’”, Colombia, 2009.
12. Congreso de la República de Colombia, *Ley 23 de 1982*, “Sobre derechos de autor”, Colombia, 1982.
13. Congreso de la República de Colombia, *Ley 1341 de 2009*, “Por la cual se definen principios y conceptos sobre la sociedad de la información y la organización de las Tecnologías de la Información y las Comunicaciones – TIC”, Colombia, 2009.
14. [**https://github.com/Cristhian2755/proyecto-grado.git**](https://github.com/Cristhian2755/proyecto-grado.git)
15. [**https://www.figma.com/design/3ynx45ctaBQjBM4ZS5p1OB/proyecto-grado?m=auto&t=tzg7zp7gRZdJKvEJ-1**](https://www.figma.com/design/3ynx45ctaBQjBM4ZS5p1OB/proyecto-grado?m=auto&t=tzg7zp7gRZdJKvEJ-1)