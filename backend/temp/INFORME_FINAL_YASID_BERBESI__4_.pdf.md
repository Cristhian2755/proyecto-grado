1
Actualización del Etiquetado del Rack en la Empresa FTTH Mi Red Comunicaciones de
Pamplona mediante la Aplicación de Normativas ANSI/TIA-606-C para una Gestión Eficiente de la
Configuración y Funcionamiento de la Red
YASID ALEJANDRO BERBESI PRADA
Código: 1004811252
Informe final para optar al título de Tecnóloga en gestión de redes y sistemas teleinformáticos
Instituto Superior de Educación Rural - ISER
Facultad de Ingenierías e Informática
Tecnología en Gestión de Redes y Sistemas Teleinformáticos
Pamplona, Norte De Santander
2025

2
Actualización del Etiquetado del Rack en la Empresa FTTH Mi Red Comunicaciones de
Pamplona mediante la Aplicación de Normativas ANSI/TIA-606-C para una Gestión Eficiente de la
Configuración y Funcionamiento de la Red
YASID ALEJANDRO BERBESI PRADA
Informe final para optar al título de Tecnóloga en gestión de redes y sistemas teleinformáticos
Asesor Institucional
Luis Carlos Durán Rodriguez
Asesor Mi Red
Gerson Rivera Andrade
Instituto Superior de Educación Rural - ISER
Facultad de Ingenierías e Informática
Tecnología en Gestión de Redes y Sistemas Teleinformáticos
Pamplona, Norte De Santander
2025

3
DEDICATORIA
A mi madre, Marvic Zuley Prada Mogollón, mi pilar más fuerte. Gracias por estar siempre para mí, por tu
amor incondicional, tu apoyo constante y por nunca soltarme la mano. Este logro también es tuyo, porque
sin ti no habría sido posible.
A mi abuela, Luz Marina Mogollón, a mi tía, Yuri Prada Mogollón, y a mi padrino, Wilmar Pico Mogollón.
Gracias por creer en mí, por motivarme en cada paso y por desearme siempre lo mejor. Sus palabras, su
cariño y su confianza han sido una fuente de fuerza en todo este camino.
A la vida, por ponerme en los caminos correctos, por enseñarme con cada experiencia y por darme la
oportunidad de crecer personal y profesionalmente.
Al Instituto Superior de Educación Rural – ISER, por abrirme las puertas del conocimiento, por ser el lugar
donde me formé y crecí. Mi paso por el ISER ha sido una etapa fundamental que marcó mi vida y que
recordaré siempre con orgullo y gratitud.

4
AGRADECIMIENTOS
En esta etapa tan importante de mi vida, quiero agradecer profundamente a Dios por darme la
fuerza, la sabiduría y la claridad para seguir adelante en cada momento, incluso en los más difíciles. Su
presencia ha sido mi guía constante.
A mi madre, Marvic Zuley Prada Mogollón, gracias por ser mi apoyo incondicional, por tu amor, tu
paciencia y por estar siempre ahí, animándome a no rendirme. Todo lo que soy y lo que he logrado te lo
debo en gran parte a ti.
A mi abuela Luz Marina Mogollón, a mi tía Yuri Prada Mogollón y a mi padrino Wilmar Pico
Mogollón, gracias por creer en mí, por sus palabras de aliento y por estar presentes en cada paso de este
proceso. Su apoyo ha sido invaluable para alcanzar esta meta.
Agradezco también al Instituto Superior de Educación Rural – ISER, por haber sido el espacio
donde me formé y crecí tanto a nivel académico como personal. Cada experiencia vivida, cada
conocimiento adquirido y cada persona que conocí en esta institución dejaron una huella que siempre
llevaré conmigo.
De manera especial, quiero agradecer a la empresa Mi Red Comunicaciones por brindarme la
oportunidad de realizar mis prácticas profesionales. Gracias a esta experiencia, pude adquirir nuevos
conocimientos, fortalecer mis habilidades y crecer en el campo laboral, lo cual ha sido fundamental para mi
formación como profesional.
Este trabajo es el resultado de muchos esfuerzos, sacrificios y aprendizajes, y estoy profundamente
agradecida con todos los que hicieron parte de este camino.

5
Tabla de contenido
I. RESUMEN ............................................................................................................................................. 14
II. ABSTRACT ........................................................................................................................................... 15
III. INTRODUCCIÓN ................................................................................................................................. 16
IV. PROBLEMA .......................................................................................................................................... 17
V. JUSTIFICACIÓN ................................................................................................................................... 18
VI. OBJETIVOS ........................................................................................................................................... 19
A. OBJETIVO GENERAL ......................................................................................................... 19
B. OBJETIVOS ESPECIFICOS ................................................................................................. 19
VII. MARCO CONTEXTUAL ..................................................................................................................... 20
A. Reseña de la Empresa ............................................................................................................. 20
1. Misión ................................................................................................................................. 20
2. Visión.................................................................................................................................. 20
3. Valores y Compromisos ..................................................................................................... 21
B. Localización ........................................................................................................................... 21
VIII. MARCO TEORICO ............................................................................................................................... 23
A. Fibra Óptica ............................................................................................................................ 23
1. ¿Qué es la fibra óptica? ...................................................................................................... 23
2. Estructura de la Fibra Óptica .............................................................................................. 23
3. Tipos de Fibra Óptica ......................................................................................................... 24
4. Cables Troncales de Fibra Óptica ....................................................................................... 25
5. Código de Colores en Fibra Óptica .................................................................................... 26
6. Conectores y Empalmes ..................................................................................................... 27
7. Normativas y Estándares .................................................................................................... 28
8. Aplicaciones de la Fibra Óptica ......................................................................................... 28
9. Ventajas de la Fibra Óptica ................................................................................................. 29

6
B. Redes FTTH (Fiber to the Home) .......................................................................................... 29
1. ¿Qué es FTTH? .................................................................................................................. 30
2. Componentes de una red FTTH ......................................................................................... 30
C. Rack De Comunicaciones ...................................................................................................... 37
1. ¿Qué es un rack de comunicaciones? ................................................................................. 37
2. Función y Utilidad .............................................................................................................. 38
3. Tipos de Racks ................................................................................................................... 38
4. Componentes y Accesorios ................................................................................................ 38
5. Ventajas de Utilizar Racks de Comunicaciones ................................................................. 39
D. Etiquetado Estructurado ......................................................................................................... 39
1. ¿Qué es el etiquetado estructurado? ................................................................................... 39
2. Importancia del etiquetado estructurado en redes FTTH ................................................... 40
3. Componentes que deben ser etiquetados ............................................................................ 40
4. Requisitos de las etiquetas .................................................................................................. 41
5. Beneficios del etiquetado estructurado............................................................................... 42
E. NORMATIVA ANSI/TIA-606-C ........................................................................................... 42
1. Introducción a la norma ANSI/TIA-606-C ........................................................................ 42
2. Objetivos de la norma ........................................................................................................ 43
3. Alcance y aplicación .......................................................................................................... 43
4. Clases de administración .................................................................................................... 44
5. Requisitos de etiquetado ..................................................................................................... 44
6. Beneficios de implementar la norma .................................................................................. 45
F. HERRAMIENTAS DE MEDICIÓN EN REDES FTTH ....................................................... 46
1. ¿Qué son las herramientas de medición en redes FTTH? .................................................. 46
2. Medidor de Potencia Óptica (Optical Power Meter - OPM) .............................................. 46

7
3. Reflectómetro Óptico en el Dominio del Tiempo (OTDR) ................................................ 47
4. Localizador Visual de Fallas (Visual Fault Locator - VFL) ............................................... 48
IX. MARCO LEGAL ................................................................................................................................... 50
X. MARCO CONCEPTUAL ...................................................................................................................... 53
XI. METODOLOGIA .................................................................................................................................. 56
A. Objetivo específico 1: Actualizar el etiquetado del rack en la empresa Mi Red Comunicaciones
de Pamplona, bajo los estándares ANSI/TIA-606-C, para optimizar la organización, gestión y acceso a la
infraestructura de red. ................................................................................................................................. 57
1. Actividad 1: Realizar un diagnóstico de los puntos y equipos en el rack para determinar la
ubicación y el tipo de etiquetado necesario. ........................................................................................... 57
2. Actividad 2: Etiquetar cada cable y equipo en el rack según las normativas. .................... 57
3. Actividad 3: hacer documentación del etiquetado del rack. ............................................... 58
B. Objetivo específico 2: Documentar los procesos de seguridad que sigue la cuadrilla en la
instalación y mantenimiento de servicios, incluyendo distribución de tareas, gestión de cargas laborales y
medidas de seguridad, para mejorar la efectividad y la salud ocupacional. ............................................... 58
1. Actividad 1: Documentar el equipamiento y herramientas empleados en cada
procedimiento. ........................................................................................................................................ 59
2. Actividad 2: Identificar y describir los tipos de procedimientos de instalación y
mantenimiento que se utilizan. ............................................................................................................... 59
3. Actividad 3: Detallar las medidas de seguridad implementadas durante la instalación. .... 59
C. Objetivo específico 3: Implementar protocolos de calidad y seguridad en los procesos de
montaje y mantenimiento de las instalaciones, realizando diagnósticos y mediciones en redes de fibra
óptica mediante herramientas especializadas, para garantizar eficiencia y confiabilidad en las
intervenciones. ............................................................................................................................................ 60
1. Actividad 1: Ejecutar diagnósticos en instalaciones de fibra óptica utilizando herramientas
especializadas. ........................................................................................................................................ 60
2. Actividad 2: Documentar los resultados de las mediciones realizadas en las intervenciones.
61

8
3. Actividad 3: Documentar plan de acciones correctivas basadas en los diagnósticos
realizados. 61
XII. RESULTADOS ....................................................................................................................................... 62
XIII. CONCLUSIONES ............................................................................................................................... 122
XIV. RECOMENDACIONES ...................................................................................................................... 123
XV. REFERENCIAS ................................................................................................................................... 124

9
Tabla de Tablas
TABLAI ............................................................................................................................................. 21
TABLA II ........................................................................................................................................... 26
TABLA III ......................................................................................................................................... 45
TABLA IV ......................................................................................................................................... 74

10
Lista de Figuras
Fig 1 Ubicación geográfica de la sede principal y nodo central ................................................... 22
Fig 2 partes de la fibra óptica .......................................................................................................... 24
Fig 3 Fibra Monomodo .................................................................................................................... 24
Fig 4 Fibra Multimodo ..................................................................................................................... 25
Fig 5 Tipos de conectores de fibra ................................................................................................... 27
Fig 6 (Optical Line Terminal) .......................................................................................................... 30
Fig 7 Splitter óptico 1:8 con conectores SC/APC ........................................................................... 32
Fig 8 ODF (Optical Distribution Frame) ........................................................................................ 33
Fig 9 diagrama de la ruta de red FTTH ......................................................................................... 35
Fig 10 de colores ............................................................................................................................... 36
Fig 11 ONT ........................................................................................................................................ 36
Fig 12 Rack de comunicaciones ....................................................................................................... 37
Fig 13 ejemplo de etiqueta ............................................................................................................... 44
Fig 14 Power Meter .......................................................................................................................... 47
Fig 15 OTDR ..................................................................................................................................... 48
Fig 16 VFL ......................................................................................................................................... 49
Fig 17 diagrama de desglose de actividades objetivo 1 ................................................................. 56
Fig 18 diagrama de desglose de actividades objetivo 2 ................................................................. 58
Fig 19 diagrama de desglose de actividades objetivo 3 ................................................................. 60
Fig 20 rack01 ..................................................................................................................................... 63
Fig 21 ODF 01 DE 48 PUERTOS .................................................................................................... 64
Fig 22 OLT01 .................................................................................................................................... 65
Fig 23 Rack 02 ................................................................................................................................... 66
Fig 24 ODF02 .................................................................................................................................... 66
Fig 25 OLT02 de dos tarjetas ........................................................................................................... 67
Fig 26 Microtik01 de balanceo ........................................................................................................ 68
Fig 27 Reuter del proveedor de mediacoomerce ............................................................................ 69
Fig 28 Rack 03 ................................................................................................................................... 70

11
Fig 29 switch de 16 puerto ............................................................................................................... 70
Fig 30 microtik02 .............................................................................................................................. 71
Fig 31 microtik03 .............................................................................................................................. 72
Fig 32 microtik04 .............................................................................................................................. 72
Fig 33 Reuter del proveedor ofinet .................................................................................................. 73
Fig 34 plancha de etiquetas .............................................................................................................. 75
Fig 35 proceso de etiquetado de los racks ....................................................................................... 76
Fig 36 Rack 01 etiquetado ................................................................................................................ 77
Fig 37 rack 02 correctamente etiquetado ....................................................................................... 78
Fig 38 rack 03 correctamente etiquetado ....................................................................................... 79
Fig 39 verificación de etiquetado por parte del ingeniero a acargo ............................................. 80
Fig 40 con la estructura y ubicación de etiquetas .......................................................................... 81
Fig 41 Excel de significado etiqueta por etiqueta .......................................................................... 81
Fig 42 pela chaquetas ....................................................................................................................... 83
Fig 43 tablas de corte ........................................................................................................................ 84
Fig 44 cortadora ................................................................................................................................ 84
Fig 45 ponchadora ............................................................................................................................ 85
Fig 46 herramientas de apoyo ......................................................................................................... 86
Fig 47 power meter ........................................................................................................................... 87
Fig 48 vfl ............................................................................................................................................ 87
Fig 49 elementos de seguridad ......................................................................................................... 88
Fig 50 Acomodación del cable en la vivienda del usuario ............................................................. 92
Fig 51 Preparación de la ONT en el sitio de instalación ............................................................... 93
Fig 52 ubicada en un punto central del apartamento ................................................................... 93
Fig 53 Conexión de la fibra en la caja NAT para habilitar el servicio ......................................... 94
Fig 54 Introducción de la fibra en una caja de reparto de edificio .............................................. 94
Fig 55 Técnico en rol de postería acomodando cables y conectando en caja NAT ..................... 95
Fig 56 Sondeo de ductería dentro de una vivienda ........................................................................ 95
Fig 57 ONT suspendida en espera de verificación de potencia .................................................... 96
Fig 58 ONT instalada definitivamente en la pared ........................................................................ 96
Fig 59 Técnico realizando configuración de la ONT ..................................................................... 97

12
Fig 60 Interfaz de configuración de la ONT .................................................................................. 97
Fig 61 Solicitud de activación al grupo técnico de la empresa ..................................................... 98
Fig 62 Diligenciamiento de la ficha de nuevo usuario ................................................................... 99
Fig 63 Interfaz del sistema para el registro del nuevo usuario ..................................................... 99
Fig 64 técnico diagnosticando y revisando potencia .................................................................... 101
Fig 65 powermeter con potencia.................................................................................................... 101
Fig 66 tendido de fibra correctivo ................................................................................................. 102
Fig 67 ................................................................................................................................................ 102
Fig 68 verificación de potencia en ont ........................................................................................... 103
Fig 69 Área de trabajo delimitada con conos de seguridad y escalera correctamente ubicada.
...................................................................................................................................................................... 104
Fig 70 asegurada al poste con cuerda de seguridad. ................................................................... 105
Fig 71 equipado con elementos de protección personal .............................................................. 105
Fig 72 Técnico equipado cargando la escalera. ............................................................................ 106
Fig 73 Técnico realizando labores en el poste. ............................................................................. 107
Fig 74 Uso constante de guantes de seguridad. ............................................................................ 107
Fig 75 Análisis de diagnóstico con equipo OTDR ........................................................................ 110
Fig 76 Verificación de continuidad con VFL ................................................................................ 111
Fig 77 Medición de potencia óptica con Power Meter ................................................................. 112
Fig 78 Lectura de potencia dentro del rango óptimo con Power Meter .................................... 113
Fig 79 fuera de rango en Power Meter ......................................................................................... 114
Fig 80 Power Meter sin recepción de señal óptica ....................................................................... 115
Fig 81 Test de velocidad de conexión exitoso ................................................................................ 116
Fig 82 Reinstalación del tendido de fibra óptica por daño en el cable ...................................... 118
Fig 83 Reemplazo de la ONT por fallas en el equipo existente ................................................... 119
Fig 84 Evidencia del test de velocidad compartida en el grupo de trabajo ............................... 120
Fig 85 Confirmación del ajuste de potencia desde la interfaz de la ONT ................................. 121

13
SIGLAS, ACRÓNIMOS Y ABREVIATURAS
FTTH: Fiber to the Home (Fibra hasta el hogar)
PPE: Personal Protective Equipment (Equipo de Protección Personal)
OLT: Optical Line Terminal (Terminal de Línea Óptica)
ONT: Optical Network Terminal (Terminal de Red Óptica)
ODF: Optical Distribution Frame (Bastidor de Distribución Óptica)
VLAN: Virtual Local Area Network (Red de Área Local Virtual)
WBS: Work Breakdown Structure (Estructura de Desglose del Trabajo)
ANSI: American National Standards Institute
TIA: Telecommunications Industry Association
dBm: Decibel-milivatios (Unidad de medida de potencia óptica)
OTDR: Optical Time-Domain Reflectometer (Reflectómetro Óptico)

14
I. RESUMEN
El presente proyecto se enmarca en el proceso de prácticas profesionales desarrolladas en la
empresa Mi Red Comunicaciones, dedicada a la prestación de servicios de internet por fibra óptica
bajo la arquitectura FTTH (Fiber To The Home) en la ciudad de Pamplona. El objetivo central del
trabajo es contribuir a la mejora de los procesos técnicos y operativos de la red mediante una
estructura metodológica basada en la descomposición del trabajo (WBS), que permite abordar de
manera ordenada y detallada cada uno de los componentes involucrados.
En primera instancia, se plantea la actualización del etiquetado del rack de comunicaciones,
guiado por la normativa ANSI/TIA-606-C, con el fin de facilitar la identificación y trazabilidad de
los elementos de red, optimizando la gestión operativa de la infraestructura. Esta fase busca
estandarizar el sistema de identificación de los componentes físicos, permitiendo futuras
intervenciones técnicas más ágiles y precisas.
En segundo lugar, se lleva a cabo el diagnóstico y documentación de procedimientos en
campo, lo cual incluye tareas como la instalación de fibra óptica, revisiones técnicas y verificación
de parámetros de calidad del servicio. Estas actividades se desarrollan junto con la cuadrilla técnica,
donde se identifican y analizan las dinámicas reales del proceso de instalación, incluyendo el uso de
herramientas, protocolos de seguridad y los roles desempeñados por el personal. El objetivo es
generar información detallada y útil para futuras capacitaciones y mejoras operativas.
Finalmente, el proyecto contempla la identificación de herramientas, medidas y protocolos
utilizados para garantizar la calidad del servicio, lo que incluye la medición de potencia óptica,
validación de parámetros de red y procedimientos correctivos frente a fallas. Este componente se
enfoca en asegurar que las prácticas implementadas en campo respondan a los estándares técnicos
requeridos por la empresa, fortaleciendo la confiabilidad del servicio brindado a los usuarios.
En conjunto, este proyecto busca fortalecer la infraestructura de red FTTH de Mi Red
Comunicaciones, mejorar la eficiencia técnica del equipo de trabajo y garantizar una experiencia de
usuario más estable y satisfactoria, mediante una gestión ordenada y profesional de los procesos en
campo.

15
II. ABSTRACT
This project was carried out as part of a professional internship at Mi Red Comunicaciones, a
company dedicated to the implementation and maintenance of FTTH (Fiber to the Home) technology
in Pamplona, Norte de Santander. The primary objective was to improve the technical organization
and service quality through structured interventions, using the Work Breakdown Structure (WBS)
methodology to segment the work into three specific phases aligned with the project’s goals.
The first phase involved the update and standardization of the labeling system within the main
fiber optic rack, applying the ANSI/TIA-606-C standard to ensure accurate identification and
management of fiber optic routes and equipment. This task was essential for improving infrastructure
organization and supporting efficient network maintenance.
The second phase focused on the fieldwork carried out during fiber installations, emphasizing
the correct use of personal protective equipment (PPE), tools, and safety protocols. The tasks
performed by the work crew were documented, showing how the team divides responsibilities based
on the complexity of each installation. This stage also included the proper handling of cables,
connection boxes, and customer premises equipment to guarantee service stability.
In the third and final phase, diagnostic procedures were applied to evaluate the condition of
the fiber network and ensure the delivery of contracted internet speeds. Measurements of optical
power were taken using standardized tools and methods, and corrective actions were documented for
cases where performance issues were detected. These tasks contributed to a better understanding of
failure points and supported the company in maintaining high service quality.
Overall, this project strengthens the company's operational structure by promoting labeling
standardization, reinforcing field installation protocols, and systematizing diagnostic procedures. It
also provides valuable experience in the application of fiber optic technologies under real working
conditions.

16
III. INTRODUCCIÓN
El crecimiento exponencial de la demanda por servicios de conectividad estables y de alta
velocidad ha impulsado la adopción de tecnologías más eficientes, entre ellas la fibra óptica,
especialmente bajo el modelo FTTH (Fiber to the Home), el cual permite llevar el servicio
directamente hasta las viviendas o espacios de trabajo. Esta tecnología representa una solución
efectiva para suplir las necesidades actuales de navegación, comunicación y transmisión de datos en
tiempo real.
En este contexto, se desarrolla el presente proyecto de práctica profesional en la empresa Mi
Red Comunicaciones, ubicada en el municipio de Pamplona, Norte de Santander, la cual ofrece
servicios de internet mediante redes de fibra óptica. El proyecto se centra en tres líneas clave: el
diagnóstico técnico de la red mediante procedimientos de verificación de potencia óptica; la ejecución
de actividades de instalación y mantenimiento, que requieren la aplicación de protocolos de seguridad
y el uso de herramientas especializadas; y finalmente, la implementación de un sistema de etiquetado
estructurado de los elementos del rack de comunicaciones, basado en la normativa ANSI/TIA-606-C.
Estas actividades se ejecutan en campo y requieren no solo conocimientos técnicos, sino
también la aplicación de buenas prácticas, trabajo colaborativo en cuadrilla y el cumplimiento de
normativas que aseguren una operación segura, eficiente y organizada. La práctica busca fortalecer
la infraestructura existente, mejorar la calidad del servicio y contribuir con la gestión técnica de la
red, permitiendo a la empresa mantener estándares óptimos en sus procesos de instalación y soporte.

17
IV. PROBLEMA
La empresa Mi Red Comunicaciones, ubicada en Pamplona y dedicada a la prestación de
servicios de internet mediante tecnología FTTH, presenta una deficiencia en la organización de su
infraestructura de red, específicamente en el etiquetado del rack, no se cuenta con un sistema de
identificación física estandarizado en los componentes del rack, lo que dificulta la ubicación rápida
de conexiones y equipos dentro del mismo.
Esta situación puede representar un obstáculo para la expansión de la infraestructura o la
incorporación de nuevos equipos, ya que la falta de etiquetado físico limita el reconocimiento
inmediato del diseño y la estructura del sistema. Aunque existe documentación digital sobre la
distribución de los equipos, la ausencia de una guía visual directamente en el rack complica la
intervención técnica, especialmente para el personal nuevo o de apoyo que requiera interactuar con
esta infraestructura.
Las principales causas de esta problemática son la no implementación de normativas técnicas
desde la instalación inicial y la falta de un sistema de identificación basado en estándares como la
norma ANSI/TIA-606C. Esto genera una gestión menos eficiente y reduce la facilidad para realizar
mantenimientos o ampliaciones de manera segura y ordenada.
De no resolverse, esta situación podría generar dificultades en la trazabilidad de la red,
aumento en los tiempos de intervención y errores al momento de realizar modificaciones en el
sistema. Aunque existen normativas que regulan el etiquetado de infraestructura de red, su aplicación
en pequeñas empresas como esta no ha sido ampliamente desarrollada, lo que hace necesaria su
implementación adaptada a este entorno.

18
V. JUSTIFICACIÓN
El presente proyecto se desarrolla en el contexto de las prácticas profesionales en Mi Red
Comunicaciones, una empresa dedicada a la prestación de servicios de internet mediante fibra óptica
en la ciudad de Pamplona. La empresa enfrenta desafíos en la organización y mantenimiento de su
infraestructura de red, debido a la falta de un sistema adecuado de etiquetado en los racks de
comunicaciones.
La implementación de un sistema de etiquetado según las normativas ANSI/TIA-606-C
facilitará la identificación de los equipos y componentes de la red. Esto no solo permitirá un
mantenimiento más rápido y eficiente, sino que también mejorará la capacidad de realizar
ampliaciones o modificaciones de manera más ordenada y segura. La estandarización del etiquetado
garantizará que cualquier miembro del equipo técnico pueda localizar fácilmente los elementos
necesarios para realizar intervenciones, lo que reducirá tiempos de respuesta y minimiza errores en el
trabajo.
Además, se documentarán los procesos de seguridad que siguen los técnicos durante la
instalación y mantenimiento de los equipos. Esta documentación ayudará a mejorar la organización
del trabajo, asegurando que se sigan prácticas seguras y eficientes, lo que beneficiará tanto a la salud
ocupacional como a la productividad del equipo técnico.
También se implementarán diagnósticos y mediciones de calidad en la red de fibra óptica para
asegurar que la infraestructura cumpla con los estándares requeridos y ofrezca un servicio confiable
a los usuarios. El uso de herramientas especializadas para verificar la potencia óptica y otros
parámetros de la red permitirá detectar posibles fallas y tomar acciones correctivas de manera
oportuna.
En conjunto, estas acciones contribuirán a mejorar la organización, seguridad y eficiencia de
la red de fibra óptica de Mi Red Comunicaciones, asegurando un servicio de calidad para sus usuarios
y fortaleciendo la capacidad operativa de la empresa.

19
VI. OBJETIVOS
A. OBJETIVO GENERAL
Implementar la actualización del etiquetado del rack en la empresa de FTTH Mi Red
Comunicaciones de Pamplona, aplicando normativas ANSI/TIA-606-C para una gestión eficiente de
la configuración y funcionamiento de la Red.
B. OBJETIVOS ESPECIFICOS
Actualizar el sistema de etiquetado del nodo principal en la empresa Mi Red Comunicaciones
de Pamplona, según los lineamientos establecidos por la norma ANSI/TIA-606-C.
Documentar los procesos de seguridad que sigue la cuadrilla en la instalación y mantenimiento
de servicios, incluyendo distribución de tareas, gestión de cargas laborales y medidas de seguridad,
para mejorar la efectividad y la salud ocupacional.
Implementar protocolos de calidad y seguridad en los procesos de montaje y mantenimiento
de las instalaciones, realizando diagnósticos y mediciones en redes de fibra óptica mediante
herramientas especializadas, para garantizar eficiencia y confiabilidad en las intervenciones

20
VII. MARCO CONTEXTUAL
A. Reseña de la Empresa
Mi Red Comunicaciones es una empresa local de telecomunicaciones ubicada en el municipio
de Pamplona, Norte de Santander. Se especializa en la prestación de servicios de internet mediante
tecnología de fibra óptica bajo el modelo FTTH (Fiber to the Home). Su principal objetivo es ofrecer
conectividad rápida, estable y confiable, incluso en zonas donde otros proveedores no logran
cobertura, permitiendo a sus usuarios disfrutar de una experiencia de navegación superior.
Gracias a su compromiso con la comunidad, Mi Red Comunicaciones se ha convertido en una
opción clave para el acceso a servicios digitales, ayudando a reducir la brecha tecnológica en sectores
urbanos y rurales. Con un equipo de trabajo calificado y en constante formación, la empresa avanza
hacia la mejora continua de sus procesos técnicos y administrativos, fortaleciendo su presencia en el
mercado regional.
1. Misión
Ser la mejor opción en la prestación del servicio de internet en la región, comprometida con
la calidad en sus procesos y servicios, apalancados en un capital humano calificado con alto sentido
de pertenencia empresarial, enfocados a la satisfacción del cliente y servicio técnico personalizado,
teniendo en cuenta las condiciones de seguridad, salud y bienestar de sus colaboradores,
reinventándose de manera constante a los cambios y retos del mercado
2. Visión
Contribuir activamente en el mejoramiento de la sociedad en el entorno de las TICS,
permitiéndonos ofrecer soluciones integradas a clientes residenciales y comerciales con calidad e
innovación tecnológica, comprometidos con las necesidades de las partes interesadas, aspiramos a ser

21
reconocidos como el socio estratégico clave para el crecimiento económico sostenible en nuestra
región.
3. Valores y Compromisos
Aunque no están definidos explícitamente, Mi Red Comunicaciones se rige por valores como
la cercanía con el usuario, la responsabilidad social, el compromiso con la calidad del servicio, la
accesibilidad tecnológica y el trabajo en equipo. Su enfoque está orientado a superar las limitaciones
de cobertura existentes en zonas rurales, apostando por una red de alta capacidad y confiabilidad.
B. Localización
Mi Red Comunicaciones tiene su sede principal y nodo central ubicados en la ciudad de
Pamplona, Norte de Santander. Esta ubicación estratégica permite brindar cobertura eficiente en áreas
urbanas y periféricas del municipio.
A continuación, se presentan las coordenadas geográficas tanto de la oficina principal como
del nodo central, obtenidas mediante la herramienta Google Earth:
TABLAI
Ubicación del nodo central y la oficina principal
Ubicación Latitud Longitud
Oficina Principal 7°22'28"N 72°38'52"W
Nodo Central 7°22'49"N 72°38'40"W

22
Fig 1 Ubicación geográfica de la sede principal y nodo central
Fuente: [34].

23
VIII. MARCO TEORICO
A. Fibra Óptica
1. ¿Qué es la fibra óptica?
La fibra óptica es un medio de transmisión de datos que funciona mediante impulsos de luz
enviados a través de hilos muy finos de vidrio o plástico. Esta innovación ha transformado el campo
de las telecomunicaciones, ya que permite una velocidad de transferencia mucho mayor y una menor
pérdida de señal frente a los cables de cobre convencionales. Su uso es clave en las redes actuales,
sobre todo en las estructuras FTTH (Fibra hasta el hogar), donde la conexión llega directamente al
usuario final[1].
2. Estructura de la Fibra Óptica
Una fibra óptica típica consta de las siguientes capas:
• Núcleo (Core): El núcleo es la parte principal y más importante de la fibra óptica, ya
que es donde se transmite la luz. Está hecho de vidrio o plástico muy puro, que tiene un índice de
refracción alto. Este índice elevado es fundamental para que los pulsos de luz puedan desplazarse por
el núcleo con una pérdida mínima de señal [1].
• Revestimiento (Cladding): El revestimiento es la capa que envuelve al núcleo y está
fabricado con un material que tiene un índice de refracción menor que el del núcleo. Su función
principal es devolver la luz que se transmite por el núcleo, manteniéndola dentro mediante el efecto
de reflexión interna total [1].
• Revestimiento Primario (Primary Coating): La capa de protección es una cubierta extra
que se ubica justo fuera del revestimiento. Su propósito es resguardar tanto el núcleo como el
revestimiento frente a daños físicos y factores ambientales, como la humedad, sustancias químicas y
el desgaste por roce [1].

24
• Chaqueta (Jacket): La cubierta externa, también llamada jacket, es la capa más externa
que envuelve toda la fibra óptica. Su función es ofrecer una protección extra frente a condiciones
ambientales y daños físicos [1].
Fig 2 partes de la fibra óptica
Fuente: [30].
3. Tipos de Fibra Óptica
Existen principalmente dos tipos de fibra óptica, diferenciados por el modo en que la luz se
propaga a través de ellos:
Fibra Monomodo (Single-Mode)
Fig 3 Fibra Monomodo
Fuente: [31].

25
• Características: Tiene un núcleo muy delgado (aproximadamente 8,3 um de diámetro
que permite que la luz viaje en un solo modo. Esto reduce la dispersión y permite transmisiones a
largas distancias con altas velocidades [3].
• Aplicaciones: Es ideal para enlaces de larga distancia, como conexiones entre ciudades
o en redes troncales de telecomunicaciones.
• Identificación: Según la norma ANSI/TIA-598-C, los cables monomodo suelen tener
una chaqueta de color amarillo [2].
Fibra Multimodo (Multi-Mode)
Fig 4 Fibra Multimodo
Fuente [31].
• Características: Las fibras multimodo están formadas por un núcleo de mayor diámetro
que las monomodo (50 o 62.5 micras) y en consecuencia los haces de luz pueden circular por más de
un modo o camino que se reflejan con distintos ángulos dentro del núcleo. Esto puede causar más
dispersión, limitando la distancia efectiva de transmisión [3].
• Aplicaciones: Se utiliza comúnmente en redes de área local (LAN) y en conexiones
dentro de edificios o campus.
• Identificación: Los cables multimodo suelen tener chaquetas de color naranja (OM1 y
OM2) o aqua (OM3 y OM4), según la norma ANSI/TIA-598-C [2].
4. Cables Troncales de Fibra Óptica

26
Un cable troncal es un tipo de fibra óptica diseñado para transportar grandes volúmenes de
datos simultáneamente dentro de un sistema de telecomunicaciones. Funciona como la “columna
vertebral” o enlace principal de la red, conectando distintas zonas y manteniendo la calidad de la señal
incluso a largas distancias. Estos cables generalmente agrupan varias fibras en un solo conjunto, lo
que permite una alta capacidad de transmisión [4].
• Cantidad de Fibras: Pueden variar desde 12 hasta 288 fibras o más, dependiendo de las
necesidades de la red.
• Estructura: Están diseñados para ser robustos y resistentes, con protecciones
adicionales para instalaciones subterráneas o aéreas.
• Identificación de Fibras: Dentro del cable, cada fibra se identifica mediante un código
de colores estándar, facilitando su gestión y mantenimiento.
5. Código de Colores en Fibra Óptica
Para identificar y organizar las fibras dentro de un cable, se emplea un sistema de codificación
por colores según la norma ANSI/TIA-598-C. Este método asigna un color particular a cada fibra
dentro de un grupo de 12, y cuando hay más de 12 fibras, la secuencia de colores se repite añadiendo
una marca extra para diferenciar cada grupo [2].
Secuencia de Colores:
TABLA II
Código de colores de fibra óptica
# Color de la fibra Identificación
1 Azul Primera fibra
2 Naranja Segunda fibra
3 Verde Tercera fibra
4 Marrón Cuarta fibra

27

| 5   | Pizarra   |     | Quinta fibra     |     |
| --- | --------- | --- | ---------------- | --- |
| 6   | Blanco    |     | Sexta fibra      |     |
| 7   | Rojo      |     | Séptima fibra    |     |
| 8   | Negro     |     | Octava fibra     |     |
| 9   | Amarillo  |     | Novena fibra     |     |
| 10  | Violeta   |     | Décima fibra     |     |
| 11  | Rosa      |     | Undécima fibra   |     |
| 12  | Aqua      |     | Duodécima fibra  |     |

Este sistema permite a los técnicos identificar rápidamente cada fibra durante la instalación,
empalme o mantenimiento, reduciendo errores y mejorando la eficiencia operativa.

6.  Conectores y Empalmes

Para conectar las fibras ópticas entre sí o con equipos, se utilizan conectores y empalmes:

Fig 5 Tipos de conectores de fibra
 Fuente [5].

•  Conectores: Son dispositivos que permiten conectar y desconectar fácilmente las
fibras. Los más comunes son SC, LC, ST y FC [5].
•  Empalmes: Se utilizan para unir permanentemente dos fibras, ya sea mediante fusión
(fusion splicing) o mecánicamente. La fusión proporciona una conexión de baja pérdida y alta
durabilidad.

|     |     |     |     |     |
| --- | --- | --- | --- | --- |

28
7. Normativas y Estándares
La implementación y mantenimiento de redes de fibra óptica deben seguir ciertas normativas
para garantizar su calidad y compatibilidad:
• ANSI/TIA-568: Establece los estándares para cableado de telecomunicaciones en
edificios comerciales.
• ANSI/TIA-598-C: Define el código de colores para la identificación de fibras ópticas.
• IEEE 802.3: Estándar para Ethernet, incluyendo especificaciones para transmisión
sobre fibra óptica.
• IEC 60304: Norma internacional que también establece códigos de colores para cables
de fibra óptica, utilizada principalmente en Europa.
8. Aplicaciones de la Fibra Óptica
La fibra óptica se utiliza en diversas aplicaciones debido a sus ventajas en velocidad y
capacidad de transmisión:
1. Telecomunicaciones: Una de las principales aplicaciones de la fibra óptica es la
transmisión de datos en redes de telecomunicaciones y acceso a internet de alta velocidad. A diferencia
de los cables de cobre convencionales, la fibra óptica utiliza pulsos de luz para enviar información, lo
que permite alcanzar velocidades mucho mayores. Esto resulta fundamental para cubrir la creciente
necesidad de ancho de banda, especialmente con el auge de la transmisión de video en alta definición,
juegos en línea y otras aplicaciones que requieren gran cantidad de datos [5].
2. Redes de Datos: En infraestructuras de redes LAN, MAN y WAN.
3. Centros de Datos: En los entornos empresariales y de centros de datos, la fibra óptica
cumple un rol fundamental al permitir la conexión entre sistemas y facilitar la transferencia de grandes
cantidades de datos de forma eficiente. Es común su uso en redes de largo alcance y en

29
configuraciones de alta densidad, donde se requiere un gran ancho de banda y alta confiabilidad.
Además, ocupa menos espacio físico y es menos vulnerable a interferencias electromagnéticas en
comparación con los cables de cobre, lo que la convierte en una opción ideal para lugares donde la
integridad de la información es prioritaria [5].
4. Sistemas de Seguridad: En cámaras de vigilancia y sistemas de control de acceso.
5. Medicina: La fibra óptica tiene un uso muy extendido en el ámbito médico,
especialmente en equipos de diagnóstico por imagen como los endoscopios y fibroscopios. Gracias a
estos dispositivos, los profesionales de la salud pueden observar el interior del cuerpo humano con
gran claridad y precisión, lo que facilita diagnósticos acertados y permite realizar intervenciones poco
invasivas. También es fundamental en cirugías con tecnología láser, ya que permite una transmisión
eficiente de la luz para llevar a cabo procedimientos delicados.[5]
9. Ventajas de la Fibra Óptica
1. Alta Velocidad: La fibra óptica ofrece velocidades de transmisión que alcanzan varios
gigabits por segundo, superando ampliamente a las tecnologías basadas en cobre. Esta característica
es clave para soportar aplicaciones que demandan un gran ancho de banda, como la transmisión de
video en 4K, el uso de realidad virtual y el acceso a servicios en la nube [1].
2. Larga Distancia: Las señales pueden viajar más lejos sin necesidad de amplificación.
3. Inmunidad Electromagnética: No se ve afectada por interferencias electromagnéticas,
lo que garantiza una señal más limpia.
4. Seguridad: Es más difícil de interceptar que los cables de cobre, lo que la hace más
segura para la transmisión de datos sensibles.
5. Durabilidad: Resistente a condiciones ambientales adversas y con una vida útil
prolongada.
B. Redes FTTH (Fiber to the Home)

30
1. ¿Qué es FTTH?
FTTH, o Fiber to the Home, Es una tecnología que emplea fibra óptica para llevar el servicio
de Internet directamente hasta la residencia del usuario. A diferencia de las conexiones convencionales
basadas en cables de cobre, FTTH ofrece una velocidad de transmisión más alta y una conexión más
estable. Gracias a que la fibra óptica es menos propensa a interferencias y deterioro, se presenta como
una solución óptima para responder a la creciente necesidad de mayor ancho de banda [7].
Este tipo de tecnología ha crecido de forma acelerada por su eficiencia y la alta demanda de
servicios digitales que requieren grandes anchos de banda, como el streaming, el teletrabajo, los
videojuegos en línea o el internet de las cosas.
2. Componentes de una red FTTH
Una red FTTH cuenta con varios elementos clave que permiten llevar la señal óptica desde la
central hasta la vivienda. A continuación, se describen los más importantes:
OLT (Optical Line Terminal)
Fig 6 (Optical Line Terminal)
Fuente: [32].

31
El terminal de línea óptica (OLT) es un equipo de red de fibra óptica de alta capacidad que
funciona como el punto central en una red óptica pasiva (PON). Normalmente se encuentra instalado
en el centro de datos o en la sede principal del proveedor de servicios de internet (ISP), y desde allí
se conecta a varios terminales de red óptica (ONT) ubicados en los hogares o instalaciones de los
usuarios [8].
La OLT realiza varias funciones clave, entre ellas:
• Transmisión y recepción de señales ópticas a través de cables de fibra óptica.
• Gestión de la asignación de ancho de banda y calidad de servicio (QoS).
• Proporcionar acceso a Internet seguro y de alta velocidad a múltiples suscriptores.
• Manejo de VoIP, IPTV y tráfico de datos en redes de banda ancha de fibra.
Las OLT son esenciales para las redes de fibra hasta el hogar (FTTH), fibra hasta la empresa
(FTTB) y fibra hasta las instalaciones (FTTP), ya que garantizan una conectividad de alta velocidad
y baja latencia [8].
Splitter Óptico

32
Fig 7 Splitter óptico 1:8 con conectores SC/APC
Fuente: [33].
¿Qué es un splitter óptico?
Un splitter óptico es un componente pasivo que permite dividir una señal óptica en varias
señales simultáneas. Funciona mediante tecnología de fibra óptica que reparte la luz entre múltiples
salidas, lo que hace posible distribuir una sola señal a diferentes puntos. Este tipo de dispositivos se
utiliza comúnmente en redes de acceso de telecomunicaciones, donde una misma señal debe llegar a
varios usuarios finales [9].
Tipos de splitters ópticos
Existen principalmente dos tipos de splitters ópticos:
• Splitters ópticos balanceados: Dividen la señal de manera equitativa entre todas las
salidas. Si tienes un splitter 1x4, cada salida recibirá un 25% de la potencia original.
• Splitters ópticos desbalanceados: No distribuyen la señal de forma uniforme. Se usan
en casos específicos donde algunas salidas requieren más potencia óptica que otras.
En resumen, un splitter óptico es un dispositivo pasivo que permite dividir una señal óptica en
múltiples salidas, facilitando la distribución de la señal a diferentes ubicaciones en redes de

33
telecomunicaciones. Existen dos tipos principales: los balanceados, que distribuyen la señal de
manera equitativa entre las salidas, y los desbalanceados, que permiten distribuir la señal de forma
desigual, según necesidades específicas [9].
ODF (Optical Distribution Frame)
Fig 8 ODF (Optical Distribution Frame)
Fuente:[33]
ODF son las siglas en inglés de “Optical Distribution Frame”, es decir, distribuidor de fibra
óptica o “marco de distribución óptica”. Es un dispositivo utilizado en sistemas de fibra óptica para
gestionar y distribuir las conexiones de fibras ópticas. Permite organizar y proteger la fibra óptica y
facilitar la administración y el mantenimiento del sistema [10].
Es un panel de distribución donde se organizan las fibras ópticas dentro de la central o punto
de distribución. Permite gestionar las conexiones, realizar empalmes y organizar la red sin causar
enredos que puedan dañar los hilos.
¿Cuáles son los diferentes tipos de ODF?

34
Existen diferentes tipos de ODF (Optical Distribution Frame) utilizados en sistemas de fibra
óptica: ODF de montaje en pared, de montaje en piso y de montaje en bastidor (abierto o cerrado),
montado en rack (Rack-Mount ODF) y de alta densidad (High-Density ODF) [10]..
¿Cómo se instala un ODF?
Continuación se proporcionan algunos pasos generales que suelen seguirse al instalar un ODF:
seleccionar el lugar de instalación, preparar el espacio, fijar el ODF, realizar la conexión de cables de
fibra óptica, organizar y gestionar los cables de fibra óptica dentro del ODF y una vez que los cables
estén conectados y organizados, realizar pruebas para verificar la integridad y el rendimiento de las
conexiones de fibra óptica [10]..
¿Cuál es la diferencia entre ODF y OLT?
La diferencia fundamental entre un ODF y un OLT es su función y ubicación en el sistema de
comunicaciones de fibra óptica. El ODF se utiliza para gestionar y distribuir las conexiones de fibra
óptica, mientras que el OLT es un dispositivo de red utilizado en sistemas PON para gestionar el
tráfico de datos en la red de fibra óptica entre el proveedor de servicios y los clientes [10].
En conclusión, el ODF (Optical Distribution Frame) es un dispositivo clave en sistemas de
fibra óptica, que permite organizar, gestionar y proteger las conexiones de fibra para facilitar su
administración y mantenimiento. Existen diversos tipos de ODF según su montaje y densidad, y su
instalación requiere de un proceso organizado para asegurar un rendimiento óptimo. A diferencia del
OLT, que gestiona el tráfico de datos en redes PON, el ODF se enfoca en la distribución física de las
conexiones de fibra óptica.
Fibra Troncales y de Distribución
Las fibras troncales conectan las OLT con los splitters. Suelen tener mayor capacidad y pueden
estar compuestas por varios hilos de colores para su identificación. Las fibras de distribución van
desde el splitter hasta cada hogar. Cada hilo lleva una señal distinta y se distingue mediante códigos
de color, lo cual facilita el trabajo técnico y reduce errores en la conexión.

35
Fig 9 diagrama de la ruta de red FTTH
Fuente: [11]
Los buffers y las fibras ópticas se organizan en grupos conocidos como loose tube y se
identifican mediante un sistema de colores. Esta codificación facilita el orden interno del cable y
permite una identificación rápida y precisa al momento de realizar fusiones, ya sea por empalmes
debido a la longitud del cable o por derivaciones. Para asegurar la continuidad de la señal dentro del
cable de fibra, es fundamental seguir los códigos de colores establecidos durante el proceso de
empalme [12].

36
Fig 10 de colores
Fuente:[12].
ONT (Optical Network Terminal)
Fig 11 ONT
La ONT, o Terminal de Red Óptica, es un dispositivo que se instala en el domicilio del usuario
dentro de una red de fibra óptica. Su función principal es transformar las señales ópticas en señales
eléctricas, permitiendo así que equipos como routers, computadoras o televisores inteligentes se
conecten a internet de alta velocidad y accedan a otros servicios de red. Al ser el punto final de la

37
conexión de fibra, la ONT resulta clave para garantizar una conectividad estable y eficiente. Algunos
modelos actuales también ofrecen funciones adicionales como la medición de potencia óptica y el
monitoreo del estado del enlace [13].
C. Rack De Comunicaciones
Fig 12 Rack de comunicaciones
Fuente: [16].
1. ¿Qué es un rack de comunicaciones?
Un rack de comunicaciones, también conocido como armario o bastidor de red, es una
estructura metálica diseñada para alojar, organizar y proteger equipos relacionados con redes y
telecomunicaciones. Estos racks permiten centralizar dispositivos fundamentales como servidores,
switches, routers, paneles de conexión y otros equipos críticos, asegurando que todo esté ordenado y
de fácil acceso para su mantenimiento y configuración [15].

38
2. Función y Utilidad
La principal función de un rack de comunicaciones es proporcionar un espacio seguro y
estandarizado para los equipos, de modo que no solo estén organizados, sino también adecuadamente
ventilados, protegidos físicamente y accesibles para los técnicos. Además, facilita la gestión del
cableado estructurado, permitiendo una instalación más limpia y eficiente [15].
3. Tipos de Racks
Existen diversos tipos de racks, adaptados a diferentes necesidades y espacios:
Los racks de pie: también conocidos como racks de piso, son las unidades más grandes y
robustas dentro de la categoría de racks de comunicaciones. Estos racks están diseñados para
instalaciones que requieren una mayor capacidad para alojar equipos de red o servidores, por lo que
son ideales para centros de datos, grandes instalaciones de telecomunicaciones o cualquier
infraestructura donde se necesiten organizar múltiples dispositivos.Rack de Piso Abierto: Estructuras
sin paneles laterales ni puertas, que permiten un acceso más fácil a los equipos, pero ofrecen menos
protección física [15].
Racks de pared: son más pequeños y están diseñados para instalarse en superficies verticales,
como paredes, por lo que son ideales para situaciones donde el espacio en el suelo es limitado o donde
no se necesita una gran cantidad de equipos. Estos racks ofrecen una solución compacta y eficiente
para pequeñas instalaciones de redes. Rack Pivotante: Tienen una bisagra que permite girar el rack
para acceder fácilmente a la parte trasera de los equipos, facilitando el mantenimiento [15].
4. Componentes y Accesorios
Un rack de comunicaciones puede incluir diversos componentes y accesorios para mejorar su
funcionalidad [16]:

39
• Paneles de Conexión (Patch Panels): Organizan y gestionan las conexiones de red,
facilitando el mantenimiento y la identificación de cables.
• Bandejas: Pueden ser fijas o deslizantes, utilizadas para soportar equipos que no están
diseñados para montaje en rack.
• Regletas de Alimentación (PDU): Distribuyen la energía eléctrica a los equipos
instalados en el rack.
• Sistemas de Ventilación: Incluyen ventiladores o unidades de aire acondicionado para
mantener una temperatura adecuada dentro del rack.
• Organizadores de Cables: Ayudan a mantener el cableado ordenado y evitan enredos
que puedan dificultar el mantenimiento.
5. Ventajas de Utilizar Racks de Comunicaciones
• Organización: Permiten una disposición ordenada de los equipos y cables, facilitando
el acceso y mantenimiento.
• Seguridad: Protegen los equipos contra daños físicos, polvo y acceso no autorizado.
• Eficiencia: Mejoran la eficiencia del sistema al optimizar el flujo de aire y la gestión
del cableado.
• Escalabilidad: Facilitan la expansión de la infraestructura de red al permitir la adición
de nuevos equipos de manera sencilla.
D. Etiquetado Estructurado
1. ¿Qué es el etiquetado estructurado?

40
El etiquetado estructurado es una práctica esencial en las instalaciones de redes de
telecomunicaciones. Consiste en identificar de manera clara y precisa todos los componentes físicos
de la red, como cables, puertos, paneles de conexión y equipos, utilizando etiquetas que faciliten su
reconocimiento y gestión. Esta identificación permite una administración eficiente, facilita el
mantenimiento y reduce el riesgo de errores durante intervenciones en la infraestructura [17].
La norma ANSI/TIA-606-C establece las directrices para la administración y etiquetado de la
infraestructura de telecomunicaciones en edificios comerciales. Esta norma proporciona un sistema
estandarizado para la identificación de componentes, asegurando que cualquier técnico pueda
comprender la organización de la red sin necesidad de información adicional [18].
2. Importancia del etiquetado estructurado en redes FTTH
En las redes FTTH (Fiber to the Home), donde la fibra óptica se extiende directamente hasta
el usuario final, el etiquetado estructurado adquiere una relevancia aún mayor. Dado que estas redes
manejan una gran cantidad de conexiones y componentes, una identificación clara y precisa es crucial
para [19]:
• Facilitar el mantenimiento y la resolución de problemas.
• Reducir el tiempo de inactividad en caso de fallas.
• Permitir una rápida expansión o modificación de la red.
• Cumplir con normativas y estándares de calidad.
Un etiquetado adecuado en redes FTTH también contribuye a la seguridad, al evitar
desconexiones accidentales y garantizar que cada componente esté correctamente identificado.
3. Componentes que deben ser etiquetados

41
Según las directrices de la norma ANSI/TIA-606-C, los siguientes componentes de una red de
telecomunicaciones deben ser etiquetados:
• Cables horizontales y de backbone.
• Paneles de conexión (patch panels).
• Puertos de telecomunicaciones.
• Rutas de cableado y canalizaciones.
• Gabinetes y racks.
• Espacios de telecomunicaciones.
• Sistemas de puesta a tierra.
La identificación de estos componentes debe ser coherente y seguir un esquema lógico que
facilite su localización y gestión [18].
4. Requisitos de las etiquetas
Las etiquetas utilizadas en el etiquetado estructurado deben cumplir con ciertos requisitos para
garantizar su efectividad:
• Legibilidad: La información debe ser clara y fácil de leer, incluso en condiciones de
poca luz.
• Durabilidad: Las etiquetas deben resistir condiciones ambientales adversas y
mantenerse adheridas durante la vida útil del componente.
• Consistencia: El formato y la nomenclatura deben ser uniformes en toda la instalación.
• Ubicación: Las etiquetas deben colocarse en lugares visibles y accesibles,
preferiblemente en ambos extremos de los cables y en puntos intermedios si es necesario.

42
Además, es recomendable utilizar etiquetas codificadas por colores para diferenciar tipos de
servicios o niveles jerárquicos dentro de la red [19].
5. Beneficios del etiquetado estructurado
Implementar un sistema de etiquetado estructurado en una red de telecomunicaciones ofrece
múltiples beneficios:
• Mantenimiento eficiente: Facilita la identificación de fallas y su resolución rápida.
• Escalabilidad: Permite una fácil expansión o modificación de la red sin confusiones.
• Reducción de errores: Minimiza la posibilidad de desconexiones o conexiones
incorrectas.
• Cumplimiento normativo: Asegura que la instalación cumple con los estándares de la
industria.
• Mejora de la seguridad: Evita manipulaciones indebidas y garantiza la integridad de la
red.
Estos beneficios se traducen en una mayor eficiencia operativa y una reducción de costos a
largo plazo [19].
E. NORMATIVA ANSI/TIA-606-C
1. Introducción a la norma ANSI/TIA-606-C
La norma ANSI/TIA-606-C es un estándar voluntario desarrollado por la Telecommunications
Industry Association (TIA) que establece directrices para la administración de la infraestructura de

43
cableado de telecomunicaciones en edificios comerciales, industriales y residenciales. Publicada en
julio de 2017, esta norma reemplaza a la versión anterior TIA-606-B y busca mejorar la organización,
identificación y documentación de los sistemas de cableado estructurado [18].
2. Objetivos de la norma
La principal finalidad de la ANSI/TIA-606-C es proporcionar un sistema estandarizado para
la identificación y administración de los componentes de una red de telecomunicaciones, lo que
facilita:
• La instalación y mantenimiento eficientes de la infraestructura.
• La reducción de errores durante intervenciones técnicas.
• La mejora en la documentación y trazabilidad de los elementos de la red.
• La interoperabilidad entre sistemas de diferentes fabricantes.
Al seguir esta norma, se garantiza una gestión más efectiva de la infraestructura de
telecomunicaciones, permitiendo adaptaciones y expansiones futuras con mayor facilidad [18].
3. Alcance y aplicación
La ANSI/TIA-606-C se aplica a la administración de la infraestructura de telecomunicaciones
en:
• Edificios nuevos, renovados o existentes.
• Instalaciones comerciales, industriales y residenciales.
• Campus con múltiples edificios.
Esta norma es especialmente relevante en entornos donde se requiere una gestión precisa de
una gran cantidad de conexiones y componentes, como en centros de datos, oficinas corporativas y
redes FTTH (Fiber to the Home) [18].

44
4. Clases de administración
La norma define diferentes clases de administración basadas en la complejidad y tamaño de
la infraestructura:
• Clase 1: Aplicable a instalaciones con una sola sala de telecomunicaciones.
• Clase 2: Para edificios con múltiples salas de telecomunicaciones.
• Clase 3: Dirigida a campus con varios edificios interconectados.
• Clase 4: Enfocada en sistemas de telecomunicaciones que abarcan múltiples
ubicaciones geográficas.
Cada clase establece requisitos específicos para la identificación y documentación de los
componentes de la red [18].
5. Requisitos de etiquetado
La ANSI/TIA-606-C establece que todos los elementos de la infraestructura de
telecomunicaciones deben ser identificados de manera única y coherente. Los requisitos incluyen:
Fig 13 ejemplo de etiqueta
Fuente: [18].

45
• Identificadores únicos: Cada componente debe tener un código alfanumérico que
permita su fácil identificación y rastreo.
• Etiquetas legibles y duraderas: Las etiquetas deben ser claras, resistentes y ubicadas en
lugares visibles.
• Documentación asociada: Cada etiqueta debe estar respaldada por registros detallados
que incluyan información como ubicación, función y conexiones asociadas.
Además, se recomienda el uso de códigos de colores para facilitar la identificación visual de
diferentes tipos de cables y conexiones.
TABLA III
Tabla de colores para identificar cables
Anaranjado Conexión de oficina central
Verde Lado del usuario de la conexión de la oficina
central
Morado Conexión a PBX, computadora central, LAN,
multiplexor
Blanco Terminaciones del cable del subsistema de
cableado 3 del edificio que conecta el MC a los circuitos
integrados
Gris Terminaciones del cable del subsistema de
cableado 2 del edificio que conecta el MC a los circuitos
integrados
Café Terminación de cable de campus entre edificios
Azul Terminaciones del cable del Subsistema de
Cableado 1 en TS
Amarillo Gestión de alarmas, seguridad o energía
6. Beneficios de implementar la norma
La adopción de la ANSI/TIA-606-C ofrece múltiples ventajas:

46
• Eficiencia operativa: Facilita las tareas de instalación, mantenimiento y resolución de
problemas.
• Reducción de errores: Minimiza las desconexiones accidentales y las intervenciones
incorrectas.
• Mejora en la documentación: Proporciona registros detallados que respaldan la gestión
de la infraestructura.
• Cumplimiento normativo: Asegura que la instalación cumple con los estándares de la
industria, lo que puede ser un requisito para ciertas certificaciones y garantías.
Estos beneficios se traducen en una mayor confiabilidad y longevidad de la red de
telecomunicaciones [18].
F. HERRAMIENTAS DE MEDICIÓN EN REDES FTTH
1. ¿Qué son las herramientas de medición en redes FTTH?
En las redes de fibra óptica, especialmente en las implementaciones FTTH (Fiber To The
Home), es fundamental utilizar herramientas de medición precisas para garantizar la calidad y
fiabilidad de las conexiones. Estas herramientas permiten a los técnicos diagnosticar problemas,
verificar la integridad de las conexiones y asegurar que la infraestructura cumple con los estándares
requeridos [21].
2. Medidor de Potencia Óptica (Optical Power Meter - OPM)

47
Fig 14 Power Meter
Fuente: [22]
El medidor de potencia óptica es esencial para medir la intensidad de la señal óptica que llega
a un punto específico de la red. Esta medición se expresa en decibelios-milivatios (dBm) y ayuda a
determinar si la señal se encuentra dentro de los rangos aceptables para un funcionamiento óptimo
[22].
Aplicaciones principales:
• Verificar la pérdida de señal en diferentes segmentos de la red.
• Asegurar que los dispositivos receptores, como las ONT, reciben una señal adecuada.
• Diagnosticar problemas relacionados con la atenuación excesiva o conexiones
defectuosas.
3. Reflectómetro Óptico en el Dominio del Tiempo (OTDR)

48
Fig 15 OTDR
El OTDR es una herramienta avanzada que permite analizar la integridad de la fibra óptica a
lo largo de su longitud. Funciona enviando pulsos de luz a través de la fibra y midiendo las reflexiones
que regresan, lo que permite identificar eventos como empalmes, conectores y fallas [23].
Aplicaciones principales:
• Detectar y localizar fallas, como cortes o curvaturas excesivas.
• Medir la pérdida de inserción y la reflectancia en diferentes puntos de la fibra.
• Evaluar la calidad de los empalmes y conectores.
4. Localizador Visual de Fallas (Visual Fault Locator - VFL)

49
Fig 16 VFL
Fuente: [24].
El VFL es una herramienta que emite una luz láser roja visible para detectar fallas en la fibra
óptica. Es especialmente útil para identificar daños físicos, como cortes o curvaturas excesivas, que
pueden no ser detectados fácilmente por otras herramientas [24].
Aplicaciones principales:
• Localizar roturas o discontinuidades en la fibra.
• Identificar empalmes defectuosos o conectores mal alineados.
• Verificar la continuidad de la fibra durante las instalaciones.
El uso adecuado de herramientas de medición en redes FTTH es crucial para garantizar la
calidad, fiabilidad y rendimiento de las conexiones de fibra óptica. Estas herramientas permiten a los
técnicos identificar y resolver problemas de manera eficiente, asegurando que la infraestructura de
red cumple con los estándares requeridos y ofreciendo un servicio de alta calidad a los usuarios finales
[21].

50
IX. MARCO LEGAL
La regulación del despliegue de tecnologías FTTH en Colombia está respaldada por un
conjunto de leyes que promueven el acceso equitativo a la conectividad, consolidando el internet
como un servicio esencial para el desarrollo social, económico y educativo. Estas normativas
reafirman la necesidad de extender la infraestructura de fibra óptica en todo el territorio nacional, con
énfasis en zonas rurales y de difícil acceso [26].
Ley 1341 de 2009
Objetivo: Establecer los principios orientadores de las TIC en Colombia, promoviendo el
acceso equitativo, eficiente y universal a la conectividad [26].
• Declara el acceso a las TIC como un servicio público de interés general.
• Fomenta la organización técnica de redes para mejorar la calidad del servicio.
• Sirve de base para implementar prácticas como el etiquetado estructurado de la infraestructura física
de red.
Ley 1978 de 2019 (Ley TIC)
Objetivo: Reformar el marco normativo del sector TIC para garantizar mayor cobertura y
calidad, promoviendo la inversión en redes modernas como FTTH [26].
• Estimula la expansión de redes de fibra óptica bajo estándares técnicos y operativos.
• Favorece el uso compartido de infraestructura, lo que exige sistemas organizados como el etiquetado.
• Reconoce la importancia de la trazabilidad en la infraestructura física.

51
Ley 2108 de 2021 (Ley de Internet como Servicio Público Esencial)
Objetivo: Garantizar el acceso a internet como un derecho fundamental, con cobertura
universal, especialmente en zonas vulnerables [27].
• Reconoce la necesidad de redes eficientes y seguras, como las FTTH.
• Incentiva el orden y la trazabilidad en redes físicas para facilitar la expansión de servicios.
• Reafirma el rol de normas como la ANSI/TIA-606-C para mejorar la operación técnica.
Ley 2294 de 2023 (Plan Nacional de Desarrollo 2022–2026)
Objetivo: Consolidar la transformación digital mediante la conectividad con redes de alta
capacidad, priorizando la fibra óptica en la última milla [28].
• Promueve proyectos de actualización de infraestructura como el desarrollado en Mi Red
Comunicaciones.
• Fomenta prácticas técnicas estandarizadas para mejorar la gestión operativa y facilitar el
mantenimiento.
• Establece metas de conectividad rural mediante redes bien organizadas.
Decreto 1078 de 2015 (Único Reglamentario del Sector TIC)
Objetivo: Compilar toda la normativa técnica aplicable al sector TIC, incluyendo instalación,
acceso a infraestructura y buenas prácticas de gestión [29].

52
• Regula la organización física de las redes, lo que respalda el uso de sistemas de etiquetado técnico.
• Establece condiciones mínimas de seguridad para la instalación de equipos en racks y ODF.
• Refuerza la necesidad de documentación técnica de la red.
Estándares Técnicos (ANSI/TIA-606-C e ITU-T G.652/G.657)
Objetivo: Asegurar la calidad y durabilidad de las conexiones de fibra óptica mediante la
implementación de normas internacionales [30].
• La norma ANSI/TIA-606-C permite organizar y gestionar eficientemente los racks, cables y equipos.
• Los estándares ITU-T garantizan compatibilidad entre los componentes y reducen errores de
conexión.
• El cumplimiento normativo técnico es un requisito para operaciones confiables.

53
X. MARCO CONCEPTUAL
FTTH (Fiber To The Home): Tecnología de red que permite llevar la señal de fibra óptica
directamente hasta el hogar del usuario, ofreciendo velocidades superiores y una mayor estabilidad
en comparación con tecnologías anteriores basadas en cobre [7].
OLT (Optical Line Terminal): Dispositivo ubicado en la central del proveedor de servicios.
Administra el tráfico de datos en redes PON, distribuye la señal a través de puertos PON y permite
configurar servicios personalizados como perfiles de velocidad y VLAN [8].
Splitter óptico: Dispositivo pasivo que divide una señal óptica en varias salidas. Se utiliza en
redes de acceso para permitir que múltiples usuarios compartan una misma fuente de señal [9].
ODF (Optical Distribution Frame): Marco de distribución óptica donde se organizan y
protegen las conexiones de fibra. Facilita la administración y el mantenimiento de los empalmes y
permite una estructura clara para la gestión del cableado [10].
Cables troncales y de distribución: Los cables troncales conectan las OLT con los splitters
y poseen una mayor capacidad de transmisión. Los cables de distribución conectan los splitters con
cada cliente final, diferenciándose mediante códigos de colores para facilitar su identificación
[11][12].
ONT (Optical Network Terminal): Dispositivo que se encuentra en la vivienda del usuario
y convierte la señal óptica en señal eléctrica. Proporciona acceso a Internet y permite gestionar los
servicios contratados con el proveedor [13].

54
QoS (Quality of Service): Técnica de red que permite priorizar ciertos tipos de tráfico para
garantizar un rendimiento adecuado. Es fundamental para asegurar la calidad de servicios como VoIP
o videollamadas en redes FTTH [14].
Rack de comunicaciones: Estructura metálica diseñada para alojar, organizar y proteger
equipos como switches, routers, OLTs y paneles de parcheo. Facilita la gestión de los dispositivos de
red y su mantenimiento [15][16].
Etiqueta estructurada: Sistema de identificación que permite rotular los componentes de
una red como cables, puertos y dispositivos, asegurando su trazabilidad. Mejora el mantenimiento y
reduce los errores en la infraestructura [17].
Norma ANSI/TIA-606-C: Estándar técnico que establece directrices para el etiquetado de
cables y componentes en redes de telecomunicaciones. Mejora la organización y documentación del
sistema de cableado estructurado [18].
Importancia del etiquetado en redes FTTH: En estas redes, el etiquetado estructurado
asegura una intervención más rápida ante fallas, facilita ampliaciones y mejora el control de los
componentes, cumpliendo con los estándares de calidad exigidos [19].
Códigos de colores en fibra óptica: Los cables y conectores se identifican mediante colores
estandarizados que permiten una conexión correcta, ordenada y verificable. Este sistema es crucial
durante empalmes o instalación de nuevos servicios [2].

55
Herramientas de instalación de fibra óptica: Incluyen pelachaquetas, cortadoras de
precisión, tablas de corte y ponchadoras RJ45, todas necesarias para preparar, instalar y asegurar
adecuadamente el cableado en campo [6].
Power Meter: Dispositivo que mide la potencia óptica expresada en dBm. Es esencial para
verificar si una señal óptica se encuentra dentro de los rangos operativos aceptables en las
instalaciones FTTH [22].
OTDR (Reflectómetro Óptico en el Dominio del Tiempo): Herramienta que permite
analizar la calidad de la fibra óptica a lo largo de su trayecto, identificando fallas, empalmes y pérdidas
de señal [23].
VFL (Visual Fault Locator): Herramienta de diagnóstico que emite una luz roja visible a
través de la fibra óptica para detectar rupturas, empalmes defectuosos o dobleces [24].

56
XI. METODOLOGIA
La metodología aplicada en este proyecto se estructuró con base en los objetivos específicos
planteados, desarrollando un conjunto de actividades organizadas que permitieran cumplir con cada
uno de ellos de manera sistemática. Para facilitar el seguimiento, planificación y control de cada etapa
del proceso, se empleó la herramienta conocida como Estructura de Desglose del Trabajo (EDT) o
Work Breakdown Structure (WBS, por sus siglas en inglés).[14]
Esta metodología permite fragmentar el proyecto en tareas más pequeñas y concretas,
denominadas paquetes de trabajo, lo que facilita tanto la asignación de recursos como la supervisión
de avances. La WBS resulta especialmente útil en proyectos técnicos como el presente, donde es
fundamental tener un control detallado de los procesos que implican identificación, documentación y
mejora de la infraestructura de red en una empresa de telecomunicaciones.[14]
A continuación, se describe cómo fue organizada y aplicada la WBS en cada uno de los
objetivos del proyecto.
Fig 17 diagrama de desglose de actividades objetivo 1

57
A. Objetivo específico 1: Actualizar el etiquetado del rack en la empresa Mi Red Comunicaciones
de Pamplona, bajo los estándares ANSI/TIA-606-C, para optimizar la organización, gestión y
acceso a la infraestructura de red.
Este objetivo se centra en mejorar la forma en que se identifican y organizan los componentes
dentro del rack de telecomunicaciones de la empresa. El propósito principal es lograr un sistema de
etiquetado claro y estandarizado que facilite el acceso a los equipos, la trazabilidad de los cables y la
gestión técnica en futuras intervenciones. Para esto, se implementaron actividades claves que
permitieron identificar los elementos del rack, aplicar un etiquetado ordenado y finalmente
documentar todo el proceso.
1. Actividad 1: Realizar un diagnóstico de los puntos y equipos en el rack para determinar
la ubicación y el tipo de etiquetado necesario.
Esta actividad consiste en una revisión completa del rack de comunicaciones para identificar
todos los elementos que lo componen y cableado estructurado. Así poder evaluar el estado actual del
etiquetado e identificar los puntos críticos o mal rotulados. Esta actividad permite definir qué tipo de
etiquetas se necesitan, dónde deben colocarse y cuáles son los estándares para aplicar según la
normativa ANSI/TIA-606-C.
2. Actividad 2: Etiquetar cada cable y equipo en el rack según las normativas.
Esta sección se basa en la aplicación de etiquetas a cada componente del rack. Utilizando un
sistema de codificación basado en categorías como tipo de cable y ubicación física. Las etiquetas
deben ser elaboradas con un material resistente y se deben colocar de forma visible y legible,
siguiendo el esquema de colores y nomenclaturas establecidos en la norma. Esta actividad es clave
para asegurar un orden visual y operativo dentro del rack.

58
3. Actividad 3: hacer documentación del etiquetado del rack.
Para concluir este objetivo se requiere generar una documentación completa donde se registra
cada etiqueta aplicada, su ubicación y su significado. Esta documentación queda almacenada en
formatos digitales, para ser consultada por el personal técnico cuando sea necesario. Esto ayudara en
tareas futuras de mantenimiento o ampliación.
Fig 18 diagrama de desglose de actividades objetivo 2
B. Objetivo específico 2: Documentar los procesos de seguridad que sigue la cuadrilla en la
instalación y mantenimiento de servicios, incluyendo distribución de tareas, gestión de cargas
laborales y medidas de seguridad, para mejorar la efectividad y la salud ocupacional.
Este objetivo busca identificar la organización del trabajo de campo, asegurando que todas las
tareas que realiza el personal técnico se cumplan y se sigan de acuerdo con medidas de seguridad
definidas por la empresa. La idea es analizar y documentar cómo se ejecutan las instalaciones o
mantenimientos, su distribución del trabajo y que elementos de protección usa el personal.

59
1. Actividad 1: Documentar el equipamiento y herramientas empleados en cada
procedimiento.
Consiste en identificar y registrar todas las herramientas y equipos utilizados por la cuadrilla
durante sus actividades diarias. Esto incluye desde materiales básicos como pelacables, pinzas y fibra,
hasta equipos de protección como arnés, guantes dieléctricos y botas de seguridad.
2. Actividad 2: Identificar y describir los tipos de procedimientos de instalación y
mantenimiento que se utilizan.
Aquí se describe los pasos que siguen los técnicos para hacer una instalación nueva, un corte
o una reparación. Se observa cómo se realiza el tendido de fibra, el empalme, el uso de la fusionadora,
el armado de cajas terminales, entre otros. También se documenta cómo se reparten las tareas entre
los miembros del equipo, dependiendo de la complejidad del trabajo
3. Actividad 3: Detallar las medidas de seguridad implementadas durante la instalación.
Finalmente, se identifican todas las acciones que se aplican para proteger a los trabajadores
mientras hacen su labor. Se analizan prácticas como la señalización del área, conos de advertencia,
normas para subir a postes o escaleras, y procedimientos en caso de emergencia.

60
Fig 19 diagrama de desglose de actividades objetivo 3
C. Objetivo específico 3: Implementar protocolos de calidad y seguridad en los procesos de
montaje y mantenimiento de las instalaciones, realizando diagnósticos y mediciones en redes de
fibra óptica mediante herramientas especializadas, para garantizar eficiencia y confiabilidad en
las intervenciones.
Este objetivo tiene como propósito asegurar que las instalaciones que realiza la empresa
cumplan con ciertos estándares técnicos que garanticen una buena conexión y durabilidad. Para ello,
se aplican pruebas que permiten detectar si una red está funcionando bien o si presenta problemas.
También se busca tener una forma de corregir fallas con base en datos reales.
1. Actividad 1: Ejecutar diagnósticos en instalaciones de fibra óptica utilizando
herramientas especializadas.
Esta etapa consiste en utilizar equipos como el medidor de potencia óptica power meter y el
reflectómetro (OTDR) para hacer pruebas de calidad en distintos puntos de la red. Estas herramientas

61
permiten ver si hay pérdidas de señal, identificar cortes, empalmes defectuosos o conectores mal
instalados. Los resultados se interpretan para saber si la instalación es confiable.
2. Actividad 2: Documentar los resultados de las mediciones realizadas en las
intervenciones.
Esta actividad tiene como propósito documentar los valores obtenidos. Esta documentación
queda como respaldo técnico de que la instalación cumple con los estándares impuestos por la
empresa.
3. Actividad 3: Documentar plan de acciones correctivas basadas en los diagnósticos
realizados.
Finalmente, se hace la documentación de las acciones correctivas. Estas pueden incluir volver
a empalmar, limpiar conectores, reemplazar tramos de fibra o ajustar configuraciones. Así registrar
que se hizo, por qué y con qué resultados.

62
XII. RESULTADOS
En esta sección se detallan los resultados alcanzados conforme a los objetivos planteados.
Resultado de objetivo 1: Actualizar el etiquetado del rack en la empresa Mi Red
Comunicaciones de Pamplona, bajo los estándares ANSI/TIA-606-C, para optimizar la
organización, gestión y acceso a la infraestructura de red
Este objetivo tuvo como propósito mejorar el sistema de identificación de los elementos dentro
del rack de telecomunicaciones de la central de la empresa Mi Red Comunicaciones, con el fin de
facilitar el acceso, la organización y el mantenimiento de la infraestructura de la red. A través de esta
actualización, se buscó asegurar un entorno técnico más ordenado, claro y alineado con la normativa
planteada.
Actividades Desarrolladas:
Actividad 1: Realizar un diagnóstico de los puntos y equipos en el rack para determinar
la ubicación y el tipo de etiquetado necesario.
El proceso inició con una inspección física y visual de los tres racks principales de la empresa.
Durante esta fase se identificaron varias falencias, uso de cintas con codificación informal, cables sin
etiquetar y equipos sin identificaciones. Para resolver esto, se elaboró un análisis inicial donde se
listaron todos los dispositivos activos (como OLTs, routers, switches, Mikrotik, ODFs, entre otros),
así como cada punto de conexión y puerto disponible.
La información obtenida permitió establecer una base para definir el tipo de etiquetas
necesarias, sus ubicaciones específicas y la nomenclatura a emplear, teniendo en cuenta las directrices
de la norma ANSI/TIA-606-C.

63
Análisis de Los racks
Durante el análisis realizado a los racks de comunicaciones, se identificaron diversas
falencias relacionadas con el orden, la organización y el etiquetado de los equipos instalados.
Asimismo, se procedió a detallar los dispositivos actualmente en uso, así como los puertos que se
encuentran activos en cada uno de ellos. Esta revisión permitió establecer un diagnóstico claro del
estado actual de la infraestructura y sirvió como base para planificar su correcta reorganización y
etiquetado conforme a la normativa correspondiente.
RACK01
Fig 20 rack01

64
ODF01
Fig 21 ODF 01 DE 48 PUERTOS
La ODF 01 de cuarenta y ocho puertos presentaba una deficiencia notable en cuanto a su
identificación, ya que contaba con un etiquetado incorrecto e incluso, en algunos casos, con ausencia
total del mismo. De los 48 puertos disponibles, únicamente 37 se encontraban en uso al momento de
la inspección.
Los puertos activos correspondían a los rangos del P01 al P21 y del P25 al P40, mientras que
los puertos no activos incluían los comprendidos entre el P22 y el P24, así como del P41 al P48.
OLT01

65
Fig 22 OLT01
La OLT01 de marca Huawei con tres bandejas activas de cuarenta y ocho puertos en total
presentaba una deficiencia notable en cuanto a su identificación, ya que varios conectores ópticos
contaban con un etiquetado incompleto, deteriorado o ausente, lo cual dificultaba la correcta gestión
de los servicios y la trazabilidad de las conexiones.
De los 48 puertos disponibles, 46 se encontraban en uso al momento de la inspección.
Los puertos activos correspondían a los rangos del P01 al P46, mientras que los puertos no
activos incluían los comprendidos entre el P47 y el P48.
RACK02

66
Fig 23 Rack 02
ODF02
Fig 24 ODF02

67
La ODF (Optical Distribution Frame) de cuarenta y ocho puertos presentaba deficiencias
relacionadas con el etiquetado, ya que algunos conectores ópticos carecían de identificación visible o
presentaban rótulos poco legibles, lo que representa una limitación para una gestión adecuada del
cableado y futuras labores de mantenimiento.
De los 48 puertos disponibles, únicamente 46 se encontraban en uso al momento de la
inspección.
Los puertos inactivos de los 48 puertos correspondían a los puertos P30, P34, P36 y P48.
OLT02
Fig 25 OLT02 de dos tarjetas
La OLT de marca Huawei equipada con módulos GPFD, también presentó deficiencias en su
sistema de identificación, evidenciando etiquetas ausentes, lo cual representa una limitación
significativa para la trazabilidad y mantenimiento eficiente del sistema.

68
Durante la inspección, se observó que de los 32 puertos disponibles, un total de 32 se
encontraban en uso.
MikroTik01
Fig 26 Microtik01 de balanceo
En el tercer rack se identificó un router Mikrotik, asignado a la función de “Balanceo”, que
tampoco contaba con un sistema de etiquetado estandarizado ni legible según los lineamientos de la
norma ANSI/TIA-606-C. A pesar de tener una inscripción manuscrita en su carátula frontal, esta no
proporciona información suficiente ni trazabilidad clara para una gestión adecuada del equipo.
El análisis de conectividad reveló que de los puertos disponibles en el Mikrotik, los siguientes
se encontraban activos: SFP1, SFP2, SFP3, SFP7 y SFP9, los cuales fueron identificados con los
códigos:
ROUTER MEDIACOOMERCE

69
Fig 27 Reuter del proveedor de mediacoomerce
El router Cisco ASR 901 perteneciente al proveedor MediaCommerce también presentó
falencias en su sistema de identificación, con etiquetas parcialmente legibles y documentación física
adherida de forma poco clara o improvisada. Esta situación representa un obstáculo para la gestión
ordenada del rack y complica tanto el mantenimiento como la atención de incidentes de red.
Durante la inspección visual y documental, se constató que se encuentran activos los puertos
Te0/10 y Te0/11.
RACK03

70
Fig 28 Rack 03
SWITCH01
Fig 29 switch de 16 puerto
El switch Cisco SOHO 16H ubicado en el rack 3 presentó deficiencias en su sistema de
identificación, ya que el equipo no cuenta con ningún tipo de rótulo visible que lo identifique, ni posee

71
etiquetas claras en los puertos de conexión, lo cual dificulta su reconocimiento y seguimiento dentro
del sistema de cableado estructurado.
Durante la inspección, se constató que de los 16 puertos disponibles, un total de 8 se
encontraban en uso.
Los puertos activos correspondían a los siguientes: P3, P6, P9, P11, P12, P13, P14 y P15,
mientras que el resto de los puertos se encontraban sin uso al momento de la revisión.
MikroTik02
Fig 30 microtik02
El router Mikrotik03, ubicado en el rack 3, presentó deficiencias evidentes en cuanto al sistema
de identificación, ya que no cuenta con un rótulo externo visible que permita su reconocimiento
inmediato. Además, los puertos de conexión no están debidamente etiquetados, lo que dificulta la
gestión del cableado y puede generar confusiones durante procesos de mantenimiento o ampliación
de la red.
Durante la inspección, se constató que, de los puertos disponibles, un total de 3 se encontraban
en uso al momento de la revisión.
Los puertos activos correspondían a los identificados como SPF1, SPF2 y ETH1, mientras que
el resto de puertos permanecían inactivos.
MikroTik03

72
Fig 31 microtik03
El router Mikrotik, ubicado en el rack 3, evidenció deficiencias en cuanto a su identificación
estructural, ya que no cuenta con un rótulo externo que lo enmarque adecuadamente ni con etiquetas
visibles en los puertos de conexión. Esta ausencia de señalización clara puede dificultar labores de
trazabilidad, diagnóstico y mantenimiento.
Durante la inspección, se constató que de los puertos disponibles, un total de 3 se encontraban
en uso al momento de la revisión.
Los puertos activos correspondían a los identificados como SPF1, SPF2 y ETH1, mientras que
el resto de puertos permanecían inactivos.
MikroTik04
Fig 32 microtik04
El router Mikrotik instalado en el rack 3 también presentó deficiencias notables en cuanto al
sistema de identificación, ya que no dispone de una rotulación visible en su estructura externa ni en
sus interfaces de red. Esta falta de señalización dificulta la identificación rápida de los enlaces y
complica futuras tareas de mantenimiento o ampliación.
Durante la inspección se observó que 7 puertos se encontraban en uso al momento de la
revisión.

73
Los puertos activos correspondían a las interfaces SPF1, ETH3, ETH4, ETH5, ETH6, ETH7
y ETH8, mientras que el resto permanecían sin conexión.
ROUTER-UFINET
Fig 33 Reuter del proveedor ofinet
El router-ufinet ubicado en el rack 3, identificado como R3-SW2, presenta una carencia total
de rotulación visible tanto en su chasis como en los puertos, lo que impide identificar fácilmente las
conexiones existentes y compromete la eficiencia en las tareas de soporte técnico o ampliación.
Este dispositivo cuenta con una alta densidad de puertos, sin embargo, durante la inspección
se evidenció que únicamente dos se encontraban en uso.
Los puertos activos correspondían a los interfaces SPF1 y SPF4, mientras que el resto
permanecían desocupados.
La información recopilada permitió establecer una base para definir el tipo de etiquetas
necesarias, sus ubicaciones específicas y la codificación a emplear, teniendo en cuenta las directrices
de la norma ANSI/TIA-606-C. También se detectaron zonas críticas con sobrecarga de cables o
enrutamientos poco eficientes, lo que sirvió como insumo para reorganizar algunos tramos.
Actividad 2: Etiquetar cada cable y equipo en el rack según las normativas.

74
En esta fase se llevó a cabo la instalación de etiquetas normalizadas en cada componente del
rack, siguiendo el sistema estructurado basado en la norma ANSI/TIA-606-C. El etiquetado se realizó
utilizando vinilos adhesivos resistentes, con impresión clara y código alfanumérico legible.
Cada etiqueta fue elaborada teniendo en cuenta la función del elemento (equipo o cable), su
ubicación en el rack y la conexión asociada. Se aplicaron etiquetas en puntos clave como puertos
ODF, OLTs, routers, switches, patchcords y alimentaciones. Esta implementación facilitó un orden
visual más eficiente y permitió una trazabilidad directa de cada conexión.
Entre las etiquetas aplicadas se encuentran las siguientes:
Etiqueta:
R01-ODF02-P01-MOL03-ARP01 / R01-OLT02-T03-PON00
Significado detallado:
TABLA IV
Tabla de información de la etiqueta
Segmento Interpretación
FBR Tipo de cable: Fibra óptica.
R01-ODF02-P01 Origen: Rack 01, panel ODF 02, puerto 01.
MOL03 Molécula 3: Conjunto de fibras dentro del ODF.
ARP01 Arpón 1: Identificador de fibra individual dentro de la molécula.
/ Separador lógico entre tramos de conexión.
R01-OLT02-T03-PON00 Destino: Rack 01, equipo OLT 02, tarjeta 31, puerto óptico número
00 (PON00).
Descripción funcional:

75
Esta etiqueta corresponde a un enlace de fibra óptica que conecta el puerto 01 del ODF01 que
corresponde a la Molécula 03 Arpon 01 en el Rack 01 con el puerto PON00 de la tarjeta T01 de una
OLT ubicada en el mismo rack. Se trata de una conexión directa que forma parte de la red de
distribución FTTH, y está asignada a la VLAN10, según la tabla técnica general.
Fig 34 plancha de etiquetas
La figura muestra la plancha con todas las etiquetas elaboradas para el proceso de
actualización del rack. Estas etiquetas fueron diseñadas y producidas por la empresa Arquidiseños de
Pamplona, cumpliendo con las especificaciones técnicas establecidas en la norma ANSI/TIA-606-C.
Se utilizaron materiales de vinil adhesivo con tinta de secado UV, lo cual garantiza durabilidad
frente a condiciones como calor, polvo y manipulación constante. Las etiquetas están organizadas en
dos líneas y utilizan tipografía azul oscuro sobre fondo blanco, lo que mejora la visibilidad y facilita
su lectura durante las intervenciones técnicas.
Estas etiquetas fueron desarrolladas para ser aplicadas en formato tipo bandera, tal como lo
exige la norma, permitiendo una identificación rápida tanto de equipos como de cables, sin
obstrucción de los conectores.

76
Fig 35 proceso de etiquetado de los racks
La figura evidencia el inicio del proceso de aplicación de etiquetas dentro del rack, siguiendo
el diseño estandarizado previamente establecido. En ella se observa cómo se va realizando la
identificación punto por punto de los elementos que conforman la infraestructura, tales como puertos
del panel ODF, salidas de la OLT, routers y conexiones de fibra óptica.
Cada etiqueta se posiciona de forma visible, alineada y legible, utilizando el formato tipo
bandera, lo que permite verificar con facilidad el origen y destino de cada conexión. Este proceso se
desarrolló de manera ordenada, asegurando que cada dispositivo fuera etiquetado según su ubicación
física y funcionalidad dentro del rack
La correcta identificación no solo facilita las tareas de mantenimiento y monitoreo, sino que
también mejora la trazabilidad en la red, permitiendo a los técnicos tener un control preciso de cada
punto de conexión y su correspondencia lógica.

77
Fig 36 Rack 01 etiquetado
En esta figura se presenta el Rack 01 ya con todo su sistema de etiquetado finalizado. Se puede
observar que tanto los puntos de conexión como los dispositivos activos y pasivos (como el panel
ODF, la OLT y otros equipos de red) han sido correctamente identificados conforme a la norma
ANSI/TIA-606-C.
Cada etiqueta está colocada de forma ordenada y estratégica, utilizando el formato tipo
bandera, lo cual garantiza su visibilidad sin interferir con el funcionamiento de los puertos o cables.
Además, en la parte superior del rack se ha instalado un identificador físico que señala claramente
que se trata del Rack 01, lo que permite una ubicación rápida dentro de la sala técnica.
Esta etapa refleja la culminación del proceso de actualización, logrando una infraestructura
más organizada, funcional y estandarizada, lo que facilita la labor técnica diaria y la gestión de futuras
ampliaciones o mantenimientos.

78
Fig 37 rack 02 correctamente etiquetado
La figura muestra el Rack 02 luego de ser intervenido, con el proceso de etiquetado finalizado
y una organización detallada del cableado. Todos los puntos de conexión, incluyendo puertos del
ODF, equipos de red y cables de fibra óptica, han sido correctamente identificados mediante etiquetas
tipo bandera, siguiendo el sistema estructurado y codificado definido por la norma ANSI/TIA-606-C.
Además del etiquetado, se realizó un trabajo de ordenamiento del cableado estructurado,
asegurando que cada conexión tenga una ruta clara, sin cruces ni obstrucciones. Esto no solo mejora
la estética y ventilación del rack, sino que también facilita el acceso a los puertos y reduce riesgos
durante las intervenciones técnicas.
Este resultado contribuye significativamente a la trazabilidad y eficiencia en el manejo de la
red interna, garantizando que cada técnico pueda identificar, seguir y operar con seguridad sobre cada
componente del rack.

79
Fig 38 rack 03 correctamente etiquetado
La figura evidencia el estado final del Rack 03, tras completar el proceso de etiquetado e
identificación de todos sus elementos. En este rack se aplicaron etiquetas normalizadas a puertos de
conexión, switches, cables troncales y demás dispositivos presentes, manteniendo la coherencia en la
nomenclatura y el diseño visual conforme a la norma ANSI/TIA-606-C.
Además del etiquetado, se observa una disposición limpia y estructurada del cableado, lo cual
facilita las tareas de mantenimiento y garantiza una operación segura. Cada etiqueta fue colocada de
forma estratégica para asegurar su lectura rápida, sin entorpecer el acceso a los puertos ni generar
interferencias con otros elementos del rack.
Este resultado consolida la estandarización del sistema de etiquetado en toda la infraestructura
de la empresa, asegurando una correcta gestión de la red, una mejor trazabilidad y reducción de
errores en futuras intervenciones técnicas.

80
Fig 39 verificación de etiquetado por parte del ingeniero a acargo
La figura muestra la verificación realizada por el ingeniero encargado, quien confirma que el
etiquetado fue ejecutado correctamente, cumpliendo con los estándares establecidos y sus
expectativas en cuanto a organización, legibilidad y cumplimiento normativo.
Actividad 3: hacer documentación del etiquetado del rack.
Como parte final del proceso de actualización del etiquetado, se hizo una documentación
donde se registran todas las etiquetas aplicadas, su ubicación física en el rack y su relación con los
elementos de red conectados. Esta base de datos se entregó y quedó almacenada en la central técnica
de Mi Red Comunicaciones para uso interno del personal autorizado.

81
Fig 40 con la estructura y ubicación de etiquetas
Fig 41 Excel de significado etiqueta por etiqueta

82
Objetivo específico 2: Documentar los procesos de seguridad que sigue la cuadrilla en la
instalación y mantenimiento de servicios, incluyendo distribución de tareas, gestión de cargas
laborales y medidas de seguridad, para mejorar la efectividad y la salud ocupacional.
Este objetivo se centró en analizar y registrar los procedimientos de trabajo que aplica el
equipo técnico en las salidas de campo, especialmente con las medidas de seguridad, el uso de
herramientas y la distribución de tareas. Su propósito fue garantizar condiciones de trabajo adecuadas,
prevenir riesgos laborales y tener buenas prácticas en la instalación y mantenimiento de servicios de
fibra óptica.
Actividades Desarrolladas:
Actividad 1: Documentar el equipamiento y herramientas empleados en cada
procedimiento.
Para llevar a cabo una documentación técnica precisa de los procesos de instalación y
mantenimiento realizados por la cuadrilla, fue necesario identificar las herramientas y equipos que
forman parte del trabajo diario en campo. Esta actividad permitió identificar los elementos utilizados
en las tareas, además de facilitar la comprensión del rol que desempeña cada herramienta en las
diferentes fases del proceso. Con esta documentación se pretende no solo estandarizar el uso de los
equipos, sino también asegurar que su empleo cumpla con los requerimientos de seguridad y
eficiencia establecidos por la empresa.
Durante el levantamiento de información, se identificaron herramientas básicas y
especializadas que se emplean en distintos escenarios operativos, desde instalaciones domiciliarias
hasta trabajos en alturas o espacios reducidos. A continuación, se describen los elementos más
relevantes registrados durante las observaciones y acompañamientos en terreno:
Herramientas de instalación y corte de fibra óptica:

83
Estas herramientas son esenciales para preparar correctamente los cables de fibra óptica
durante las instalaciones. Permiten realizar cortes precisos, retirar recubrimientos sin dañar el núcleo
de la fibra y facilitar el montaje de conectores. Su correcta utilización es clave para garantizar la
calidad del empalme y minimizar las pérdidas de señal. Dentro de esta categoría se encuentran
herramientas como la pelachaquetas, la tabla de corte y la cortadora de precisión, todas diseñadas para
trabajar con la delicadeza que requiere la manipulación de fibras ópticas.
Pelachaquetas: herramienta indispensable que se utiliza para retirar el recubrimiento externo
de la fibra óptica sin dañar su estructura interna. Este paso es esencial para dejar al descubierto el
filamento que posteriormente será trabajado.
Fig 42 pela chaquetas
Tabla de corte: herramienta multifuncional que permite tanto pelar la fibra como guiar el
corte según el tipo de conector que se va a instalar. Es útil especialmente cuando se trabaja con
conectores prepolishados o mecánicos.

84
Fig 43 tablas de corte
Cortadora de precisión: utilizada para realizar un corte recto y limpio en la fibra óptica,
garantizando una conexión eficiente y minimizando la pérdida de señal durante la transmisión.
Fig 44 cortadora

85
Ponchadora RJ45: utilizada para la instalación de conectores RJ45 en cables UTP, que
también forman parte de la infraestructura de red en algunos tramos del servicio.
Fig 45 ponchadora
Herramientas auxiliares:
Son herramientas complementarias que apoyan las labores de instalación y fijación del
cableado en distintas superficies. Aunque no trabajan directamente sobre la fibra, son indispensables
para asegurar un tendido organizado, firme y estéticamente aceptable, especialmente en instalaciones
domiciliarias o de edificios. Entre ellas se encuentran el martillo, puntillas, grapas, la zonda guía para
ducterías cerradas y la ponchadora RJ45, usada en conexiones de red internas.
Zonda: herramienta que se emplea principalmente en instalaciones en edificios, ya que
permite identificar y guiar la fibra a través de ducterías internas de difícil acceso.
Herramientas de apoyo: entre ellas se encuentran el martillo, puntillas, grapas,
destornilladores y alicates, que son fundamentales para el montaje físico de las redes, fijación de
cables y aseguramiento de equipos en superficies.

86
Fig 46 herramientas de apoyo
Equipos de medición y prueba:
Estos equipos permiten verificar la calidad del servicio una vez finalizada la instalación de la
red. Son fundamentales para asegurar que la señal transmitida a través de la fibra cumple con los
estándares técnicos requeridos por la empresa. El uso del Power Meter y el VFL permite identificar
problemas como pérdidas de potencia, fallas en los empalmes o cortes en el tendido, ayudando a
garantizar una conexión estable y confiable para los usuarios finales.
Power Meter: dispositivo que mide la potencia óptica en los extremos de la fibra, permitiendo
verificar si la señal transmitida cumple con los parámetros requeridos.

87
Fig 47 power meter
VFL (Visual Fault Locator): emite una luz roja visible a través de la fibra para detectar
rupturas, dobleces o empalmes mal hechos. Es una herramienta rápida para diagnósticos visuales.
Fig 48 vfl

88
Elementos de protección personal:
La empresa Mi Red Comunicaciones exige el uso obligatorio de equipos de protección
personal para todos los integrantes de la cuadrilla, los cuales son fundamentales para prevenir
accidentes y cumplir con la normativa de seguridad industrial. Los elementos utilizados son:
Fig 49 elementos de seguridad
Casco de seguridad: Protege de impactos directos durante trabajos en campo o en altura.
Guantes: Evitan cortes o quemaduras al manipular cables y herramientas.
Arnés de seguridad: Utilizado por el técnico de postería para asegurar su posición durante
trabajos en altura.
Eslinga de posicionamiento: Proporciona soporte adicional al rodear el poste y mantener al
técnico fijo durante la operación.

89
Escalera extensible: Herramienta utilizada para alcanzar cajas de distribución elevadas; debe
asegurarse con un lazo de sujeción.
Conos de seguridad: Delimitan el área de trabajo, especialmente cuando se trabaja en zonas
transitadas.
Botas de seguridad: Previenen lesiones por impacto de herramientas o materiales pesados.
Estos elementos forman parte de los protocolos de seguridad establecidos por la empresa, y su
uso es supervisado en cada intervención.
La recopilación de esta información se realizó mediante la observación directa en jornadas
laborales de la cuadrilla técnica, así como entrevistas informales con los operarios, quienes explicaron
el uso práctico y la importancia de cada elemento.
Actividad 2: Identificar y describir los tipos de procedimientos de instalación y
mantenimiento que se utilizan.
esta actividad tuvo como finalidad analizar y registrar los procedimientos técnicos que aplica
el personal en las salidas de campo durante las labores de instalación y mantenimiento de redes de
fibra óptica en la empresa Mi Red Comunicaciones. La estandarización y correcta ejecución de estos
procedimientos es fundamental para garantizar la calidad del servicio, la seguridad del personal y la
eficiencia operativa en cada intervención realizada.
La metodología aplicada consistió en observaciones directas a la cuadrilla técnica,
acompañamiento en jornadas laborales y entrevistas informales con los trabajadores, permitiendo así
una recolección de los pasos seguidos en distintos escenarios de trabajo. Se presto atención a la
secuencia de actividades, las herramientas utilizadas, los roles dentro del equipo y las buenas prácticas
adoptadas por la empresa.

90
A través de esta recopilación de información se logró documentar los tipos de procedimientos
ejecutados con mayor frecuencia (instalación o mantenimiento), nivel de complejidad, y tipo de
intervención (aérea, domiciliaria o en edificación). Esta información es esencial para el
fortalecimiento de la gestión operativa y la implementación de futuras mejoras.
Composición y dinámica operativa de la cuadrilla
Esta fase tiene como finalidad identificar, describir y sistematizar los procedimientos
operativos y las medidas de seguridad implementadas por el equipo técnico de la empresa Mi Red
Comunicaciones durante las actividades de instalación y mantenimiento de redes de fibra óptica.
Asimismo, se documenta la distribución de funciones dentro de la cuadrilla y los protocolos seguidos
para garantizar una operación segura y eficiente.
La cuadrilla está conformada por cinco integrantes, incluido el estudiante en práctica. La
estructura de trabajo es dinámica, permitiendo la organización del equipo dependiendo del número y
tipo de actividades asignadas durante la jornada y su complejidad. En algunas ocasiones, el grupo
actúa de forma unificada para intervenciones complejas; en otras, se divide estratégicamente para
atender múltiples solicitudes, optimizando el tiempo.
Los roles establecidos en condiciones normales de operación son los siguientes:
Técnico de postería: Es el encargado de subirse en los postes, acomodar y tensar la fibra para
que no quede escurrida, realiza conexiones en la caja NAT, deja la marquilla para identificar a quien
le corresponde el servicio y informa de que caja y que puerto queda el servicio.
Técnico ayudante exterior: Es el asiste al técnico de postería durante el tendido del cable
desde el exterior de la vivienda o edificio encargado de alimentar y mover el carrete, estar pendiente
de que la fibra no se enrede o un vehículo al pasar la dañe.
Técnico de acceso: Se encarga de que el tendido de la fibra desde el punto de acceso hasta el
interior del inmueble tenga una instalación estética, bien tensada y sin riesgos de interferencia o
deterioro.

91
Técnico ayudante interior: Colabora con el paso de la fibra óptica hacia el punto de
instalación del equipo terminal (ONT), además de identificar cajas de paso cuando se trata de
edificaciones que van por ducteria.
Técnico configurador: es el encargado de la configuración de la ONT, realiza pruebas de
conectividad, entrega el servicio y completa la ficha técnica del usuario.
La versatilidad del grupo permite que se asignen tareas por separado. Por ejemplo, ante un
alto volumen de trabajo, tres integrantes pueden encargarse de una instalación, mientras los otros dos
realizan inspecciones o mantenimientos. Esta flexibilidad garantiza cumplimiento en los tiempos de
respuesta establecidos por la empresa.
Procedimiento general para instalaciones FTTH
El proceso inicia con la inspección del domicilio o establecimiento donde se va a realizar la
instalación. El técnico examina y evalúa las condiciones del lugar para determinar el recorrido óptimo
para la fibra, identificando puntos de ingreso, cajas de distribución y espacios adecuados para la
instalación de la ONT.
Cuando se trata de edificios, si no hay guías previas se realiza un sondeo en la ductería
existente para verificar continuidad entre cajas y poder pasar la fibra fácilmente con la sonda. Si la
infraestructura no permite el paso del cable ya sea por obstrucción o que la ductería este mal diseñada,
se opta por una instalación externa que cumpla con criterios de estética y funcionalidad, cuidando la
tensión del cable y su correcta fijación.
El objetivo de esta etapa es garantizar un servicio eficiente y estetica, minimizar los posibles
daños al cableado, evitar riesgos para el usuario y facilitar futuras intervenciones técnicas.
A continuación, se presentan evidencias fotográficas que ilustran las distintas etapas del
proceso de instalación del servicio FTTH, realizadas en campo durante el desarrollo de esta práctica.
Cada imagen representa una parte clave del procedimiento descrito anteriormente.

92
Fig 50 Acomodación del cable en la vivienda del usuario
En esta etapa, el técnico realiza el tendido interno del cable de fibra dentro del domicilio del
usuario. Se evalúan los recorridos más seguros y estéticos para asegurar una instalación ordenada y
funcional.

93
Fig 51 Preparación de la ONT en el sitio de instalación
La ONT es colocada provisionalmente en el sitio designado para verificar la cobertura
eléctrica, ventilación y cercanía con los dispositivos del usuario, antes de su fijación definitiva.
Fig 52 ubicada en un punto central del apartamento
Se selecciona una zona estratégica dentro del apartamento para garantizar una cobertura
adecuada de la señal WiFi y facilitar futuras intervenciones técnicas.

94
Fig 53 Conexión de la fibra en la caja NAT para habilitar el servicio
El técnico realiza la conexión final de la fibra al nodo asignado (NAT), permitiendo la
activación del servicio y enlazando al usuario con la red principal de la empresa.
Fig 54 Introducción de la fibra en una caja de reparto de edificio

95
Este proceso permite llevar la señal óptica desde la red troncales hacia los puntos de
distribución individuales de cada apartamento dentro del edificio.
Fig 55 Técnico en rol de postería acomodando cables y conectando en caja NAT
el técnico organiza los cables en los postes, asegurando una correcta tensión, fijación y
conexión con el punto de entrega.
Fig 56 Sondeo de ductería dentro de una vivienda

96
Cuando no es posible instalar la fibra de forma superficial con grapas, se realiza un sondeo
para verificar la continuidad de la ductería interna y así pasar el cable por dentro de las paredes.
Fig 57 ONT suspendida en espera de verificación de potencia
Antes de fijar la ONT, se conecta temporalmente para confirmar que los niveles de potencia
sean los adecuados, garantizando el funcionamiento del servicio.
Fig 58 ONT instalada definitivamente en la pared

97
Una vez verificada la señal, la ONT se fija en la ubicación elegida, asegurando su
funcionamiento estable y una instalación limpia y segura.
Fig 59 Técnico realizando configuración de la ONT
se accede a su interfaz para establecer los parámetros de red requeridos por la empresa.
Fig 60 Interfaz de configuración de la ONT

98
Desde esta plataforma se asignan los valores de VLAN, contraseña, nombre de red WiFi, entre
otros, personalizando el servicio para el nuevo usuario.
Fig 61 Solicitud de activación al grupo técnico de la empresa
Una vez completada la configuración, el técnico solicita la activación de la ONT al grupo
centralizado encargado de registrar el dispositivo en la red principal.

99
Fig 62 Diligenciamiento de la ficha de nuevo usuario
Se finaliza en proceso de instalación pidiéndole al usuario sus datos y así llenar la ficha e
usuario nuevo.
.
Fig 63 Interfaz del sistema para el registro del nuevo usuario

100
Este registro se realiza en una plataforma digital interna de la empresa, la cual centraliza la
información técnica y administrativa del cliente.
Procedimiento general para mantenimiento de redes FTTH
Los mantenimientos en redes de fibra óptica se ejecutan con el fin de preservar la calidad del
servicio, corregir fallas y garantizar el buen estado de los componentes de la red. Estos procedimientos
pueden clasificarse en dos tipos: correctivos y preventivos.
Los mantenimientos correctivos son aquellos que se realizan como respuesta a reportes de
fallas, tales como pérdida total de servicio, disminución de la potencia óptica, cortes en el cableado o
deterioro de conectores. Por otro lado, los mantenimientos preventivos se programan periódicamente
para revisar el estado de las conexiones, limpiar componentes ópticos y verificar que los niveles de
potencia estén dentro del rango operativo, reduciendo así la probabilidad de fallas futuras.
El procedimiento comienza con un diagnóstico inicial, donde el técnico consulta el historial
del cliente y realiza mediciones con equipos como el Power Meter o el OTDR. Estas herramientas
permiten identificar con precisión el punto de la falla o determinar si hay una pérdida anormal de
señal.

101
Fig 64 técnico diagnosticando y revisando potencia
Fig 65 powermeter con potencia
Una vez localizado el problema, se procede con la intervención física. Dependiendo del caso,
esto puede incluir la sustitución de tramos de fibra deteriorados, la reconexión de cables sueltos, el
cambio de conectores SC/APC o la refusión de empalmes afectados. En instalaciones más complejas,
también puede implicar acceder a cajas de distribución o revisar el trayecto completo de la acometida.

102
Fig 66 tendido de fibra correctivo
Fig 67
Fig. I Re empalme de hilos en caja nat
Posteriormente, se realiza una reverificación de la señal, asegurándose de que los niveles
ópticos sean los adecuados y que el cliente haya recuperado el servicio. Finalmente, se lleva a cabo
el registro de la intervención, donde se documenta la causa del problema, los materiales utilizados y

103
las acciones tomadas. Este registro forma parte de los controles internos de la empresa y permite llevar
un seguimiento técnico de cada caso.
Fig 68 verificación de potencia en ont
El objetivo de este proceso es mantener la red en óptimas condiciones operativas, resolver
fallas con agilidad y asegurar la satisfacción del usuario final mediante intervenciones bien
planificadas y ejecutadas.
Actividad 3: Detallar las medidas de seguridad implementadas durante la instalación.
Protocolo de seguridad en trabajos de altura
Para los trabajos en poste, se siguen una serie de pasos cuidadosamente definidos:
• Se colocan conos de seguridad en un perímetro prudente alrededor de la escalera,
señalizando el área de riesgo.
• El operario debe de colocarse y asegurar el casco de seguridad.

104
• El técnico debe portar el arnés correctamente ajustado.
• Se asegura la escalera al poste utilizando el lazo de sujeción incorporado.
• El trabajador asciende y, al llegar a la altura requerida, posiciona la eslinga de
seguridad alrededor del poste.
• Durante toda la operación, el técnico debe usar guantes de protección, especialmente
si existe presencia de líneas eléctricas.
Estos pasos garantizan la seguridad del personal, previniendo caídas, descargas eléctricas y
accidentes con transeúntes o vehículos.
A continuación, se presenta la evidencia fotográfica correspondiente a la aplicación de los
protocolos de seguridad establecidos durante el proceso de instalación del servicio FTTH. Estas
imágenes muestran el uso adecuado de los elementos de protección personal por parte del personal
técnico, así como las condiciones seguras en las que se llevaron a cabo las actividades en campo,
cumpliendo con las normativas de seguridad industrial vigentes.
Fig 69 Área de trabajo delimitada con conos de seguridad y escalera correctamente ubicada.
En la imagen se observa el espacio destinado para la instalación, el cual ha sido previamente
señalizado con conos para advertir a transeúntes y vehículos sobre la presencia de trabajos en curso.
La escalera se encuentra posicionada de forma estable, siguiendo las recomendaciones de seguridad
para evitar caídas o accidentes durante la labor en altura.

105
Fig 70 asegurada al poste con cuerda de seguridad.
La imagen muestra la correcta fijación de la escalera al poste mediante una cuerda de
seguridad, medida indispensable para evitar deslizamientos o caídas durante el ascenso o trabajo en
altura. Esta acción forma parte del protocolo de seguridad exigido por la empresa para proteger al
personal técnico durante las intervenciones en redes aéreas.
Fig 71 equipado con elementos de protección personal

106
En esta imagen se evidencia al técnico de campo portando todos los implementos de seguridad
exigidos por el protocolo: arnés de seguridad, casco, chaleco reflectivo, guantes, gafas y botas
dieléctricas. El uso completo del equipo de protección personal es fundamental para garantizar la
integridad física del trabajador durante las labores en altura y la manipulación de elementos eléctricos
o estructurales.
Fig 72 Técnico equipado cargando la escalera.
En esta fotografía se observa al técnico completamente equipado con sus elementos de
protección personal, transportando la escalera hacia el lugar de instalación. Esta acción evidencia el
cumplimiento de las normas de seguridad desde el inicio de la actividad, garantizando que tanto el
traslado del equipo como su ubicación se realicen de manera segura y controlada.

107
Fig 73 Técnico realizando labores en el poste.
En esta imagen se puede observar al técnico ejecutando trabajos en altura sobre el poste,
utilizando correctamente su arnés de seguridad, casco, botas dieléctricas y demás elementos
requeridos. Esta evidencia refleja la aplicación del protocolo de seguridad en condiciones de riesgo,
asegurando la integridad del personal durante la conexión del servicio.
Fig 74 Uso constante de guantes de seguridad.

108
La fotografía muestra un primer plano de las manos del técnico, lo cual evidencia el uso
continuo de guantes de seguridad durante toda la intervención. Este elemento de protección es
esencial para evitar cortes, quemaduras por fibra óptica o contactos eléctricos accidentales,
cumpliendo con las normas de seguridad industrial exigidas por la empresa.

109
Objetivo específico 3: Implementar protocolos de calidad y seguridad en los procesos de
montaje y mantenimiento de las instalaciones, realizando diagnósticos y mediciones en redes de
fibra óptica mediante herramientas especializadas, para garantizar eficiencia y confiabilidad
en las intervenciones.
Esta fase está orientada a la descripción de los procedimientos de verificación de calidad
realizados durante las actividades de instalación y mantenimiento de la red FTTH. El objetivo es
garantizar que los servicios ofrecidos cumplan con los estándares técnicos establecidos y asegurar la
satisfacción del usuario final.
Actividades desarrolladas
Actividad 1: Ejecutar diagnósticos en instalaciones de fibra óptica utilizando
herramientas especializadas.
En esta actividad se llevan a cabo pruebas técnicas en puntos específicos de la red, tanto en
instalaciones nuevas como en mantenimientos. Se emplean equipos como el medidor de potencia
(Power Meter), el OTDR y el localizador visual de fallas (VFL), que permiten medir atenuación,
verificar continuidad y detectar problemas físicos en el tendido de fibra. Los diagnósticos realizados
son fundamentales para asegurar que la señal llegue con los niveles adecuados al usuario final.
Medición de potencia óptica
Durante el proceso de instalación, uno de los principales indicadores de calidad es la medición
de la potencia óptica, la cual se expresa en decibelios (dB). El rango aceptable para una conexión
funcional debe situarse entre -18 dB y -24dB. Una señal fuera de estos límites puede indicar problemas
de conexión, empalmes defectuosos o daños en el cableado.
La medición de potencia se realiza utilizando un equipo denominado powermeter, el cual
permite obtener una lectura precisa de la señal óptica en el punto de terminación. En casos donde el
powermeter no esté disponible, se puede realizar una medición indirecta utilizando el software de la

110
ONT (Optical Network Terminal), accediendo al apartado de “Optical” donde se refleja la potencia
recibida en tiempo real.
A continuación, evidencias fotográficas:
Fig 75 Análisis de diagnóstico con equipo OTDR
En esta imagen se evidencia el uso del reflectómetro óptico en el dominio del tiempo (OTDR)
para realizar un diagnóstico detallado del estado de la red de fibra óptica. Esta herramienta permite
identificar atenuaciones, pérdidas de señal, empalmes defectuosos o rupturas en el cableado, gracias
a su capacidad de enviar pulsos de luz y analizar la señal reflejada. El análisis con el OTDR es
fundamental para localizar con precisión los puntos de falla y tomar decisiones correctivas efectivas
en las instalaciones y mantenimientos.

111
Fig 76 Verificación de continuidad con VFL
La imagen muestra el uso del localizador visual de fallas (VFL), una herramienta esencial para
la inspección rápida de la continuidad en fibras ópticas. El VFL emite una luz roja visible que recorre
el interior de la fibra, permitiendo detectar cortes, dobleces excesivos o conectores mal instalados.
Esta verificación visual es clave durante las tareas de instalación y mantenimiento, ya que permite
identificar problemas de forma inmediata y garantizar una correcta transmisión de señal antes de
realizar pruebas más complejas.

112
Fig 77 Medición de potencia óptica con Power Meter
En esta imagen se observa el uso del medidor de potencia óptica (Power Meter), una
herramienta fundamental para evaluar la intensidad de la señal recibida en una instalación de fibra
óptica. El técnico conecta el equipo a la salida óptica para comprobar si los niveles de potencia se
encuentran dentro del rango aceptable especificado por el proveedor. Esta prueba es esencial para
garantizar que la señal llegue con suficiente fuerza al usuario final, evitando pérdidas que puedan
afectar la calidad del servicio.
Actividad 2: Documentar los resultados de las mediciones realizadas en las
intervenciones.
Esta etapa consiste en el registro detallado de los datos obtenidos durante las pruebas técnicas.
Se consignan los valores de potencia, pérdidas, distancia a fallas y cualquier anomalía encontrada. La
documentación se realiza en formatos establecidos por la empresa, permitiendo hacer seguimiento del
estado de la red y tomar decisiones informadas para futuras intervenciones. Este registro también es
una evidencia clave de la calidad del servicio entregado.

113
Validación del servicio con el usuario
Una vez culminada la instalación o reviion y verificada la potencia adecuada, se procede a
realizar una validación del servicio directamente con el usuario. Esta validación incluye:
• Prueba de conectividad: Se solicita al usuario que pruebe el acceso a internet en los
espacios de interés dentro de su vivienda o negocio para confirmar cobertura y calidad
de señal.
• Test de velocidad: Se realiza una prueba de velocidad utilizando herramientas
especializadas o plataformas de medición, con el fin de evidenciar que el ancho de
banda contratado corresponde al entregado.
Esta etapa es fundamental no solo para certificar la instalación desde el punto de vista técnico,
sino también para brindar confianza al usuario respecto a la calidad del servicio recibido.
Fig 78 Lectura de potencia dentro del rango óptimo con Power Meter

114
En esta imagen se muestra una lectura realizada con el Power Meter donde la señal se
encuentra dentro del rango considerado adecuado para una instalación FTTH, específicamente entre
-18 dBm y -24 dBm. Esta medición indica que la fibra óptica está transmitiendo correctamente sin
pérdidas excesivas, lo que garantiza una conexión estable y eficiente para el usuario final. La
validación de estos valores es esencial para aprobar la instalación y proceder con la activación del
servicio.
Fig 79 fuera de rango en Power Meter
La imagen evidencia una medición de potencia óptica realizada con el Power Meter, la cual
arroja un valor de -36 dBm, indicando una pérdida significativa en la señal. Este resultado se
encuentra fuera del rango óptimo establecido para instalaciones FTTH, lo que sugiere una posible
falla en la continuidad de la fibra, empalmes defectuosos, conectores sucios o una mala conexión en
la caja de distribución. Esta lectura requiere intervención inmediata para diagnosticar y corregir la
causa del problema antes de habilitar el servicio.

115
Fig 80 Power Meter sin recepción de señal óptica
La imagen muestra una lectura de -70 dBm en el Power Meter, lo cual indica que no hay señal
óptica presente. Este valor es característico cuando el cable de fibra no está conectado correctamente
o no existe ninguna fuente de luz activa en el puerto correspondiente. Este tipo de medición es útil
para comprobar rápidamente si el enlace está físicamente establecido antes de realizar pruebas más
detalladas con equipos como el OTDR o el VFL.

116
Fig 81 Test de velocidad de conexión exitoso
La imagen evidencia la realización de una prueba de velocidad, la cual muestra que el servicio
de internet está entregando la totalidad de las megas correspondientes al plan contratado por el
usuario. Esta verificación forma parte del protocolo de aseguramiento de calidad posterior a la
instalación o mantenimiento, garantizando que el usuario reciba un servicio óptimo y conforme a lo
pactado.
Actividad 3: Documentar plan de acciones correctivas basadas en los diagnósticos
realizados.
Cuando los diagnósticos arrojan resultados fuera de los parámetros aceptables, se procede a
elaborar un plan de acciones correctivas. Esta actividad contempla la descripción de los problemas
detectados, las causas probables y las soluciones aplicadas, como refusión de empalmes, reemplazo
de conectores o reubicación de tramos defectuosos. En la práctica, las actividades se informan
internamente al equipo técnico mediante canales de comunicación establecidos, sin contar con un
registro formal documentado.

117
Corrección de fallas durante la instalación
Si durante la medición inicial se detecta que la potencia está fuera del rango adecuado, se
procede a realizar las siguientes acciones correctivas:
• Reempalme de conectores (ponchado): Se realiza nuevamente el ponchado de los
conectores ópticos para eliminar posibles defectos de terminación que puedan estar
afectando la transmisión.
• Inspección del cableado: Se examina toda la trayectoria de la fibra para identificar
puntos donde el cable pueda estar tensionado, doblado en exceso o comprometido
estructuralmente, lo cual podría generar pérdidas en la señal.
• Verificación visual con láser: En situaciones donde la medición de potencia indica
ausencia de señal, se utiliza un localizador visual de fallos (VFL, por sus siglas en
inglés) o láser para comprobar la continuidad de la fibra. Si el haz de luz no se detecta
en los extremos correspondientes, se considera que existe una ruptura o daño severo
en la fibra.
La aplicación rigurosa de estas medidas busca minimizar las posibilidades de futuras fallas y
asegurar una instalación robusta y duradera.
Procedimiento de revisión y mantenimiento de servicios existentes
En caso de reportes de fallas o degradación del servicio, el procedimiento de revisión incluye
los siguientes pasos:
• Medición de potencia óptica: Se verifica el nivel de potencia en la ONT para descartar
pérdidas de señal como causa principal del inconveniente.

118
• Inspección física de la fibra: Se examina la fibra óptica expuesta para identificar
signos visibles de ruptura, cortes o daños mecánicos.
• Prueba de continuidad óptica: En ausencia de señal, se utiliza un láser o VFL para
comprobar la continuidad de la fibra desde ambos extremos.
• Reparación de conectores: Si se identifican defectos en los conectores, se realiza
nuevamente el ponchado para restaurar la transmisión adecuada.
• Reemplazo de fibra: Si tras las correcciones anteriores no se restablece la potencia,
se procede al cambio de la acometida de fibra óptica afectada.
Estos procedimientos permiten restaurar la calidad del servicio, mejorar la experiencia del
usuario y prolongar la vida útil de la infraestructura de red.
A continuación, evidencias fotográficas
Fig 82 Reinstalación del tendido de fibra óptica por daño en el cable

119
La imagen muestra el procedimiento de reinstalación de la fibra óptica en el domicilio del
usuario, el cual se realiza cuando el tendido original ha sufrido daños que afectan la calidad del
servicio. Esta acción forma parte de las intervenciones correctivas, donde se reemplaza el tramo
afectado para restablecer la conectividad bajo los estándares técnicos adecuados, asegurando una
transmisión estable y sin pérdidas.
Fig 83 Reemplazo de la ONT por fallas en el equipo existente
En esta imagen se evidencia el cambio de una ONT defectuosa por un nuevo equipo. Esta
acción se lleva a cabo cuando la ONT instalada presenta fallas como pérdida de señal, intermitencia,
quemaduras internas o cuando, a pesar de reconfiguraciones, no entrega el ancho de banda contratado.
El reemplazo asegura que el cliente reciba un servicio estable y con la velocidad correspondiente a su
plan, cumpliendo así con los estándares de calidad establecidos.

120
Fig 84 Evidencia del test de velocidad compartida en el grupo de trabajo
La imagen muestra la captura del chat grupal de la empresa donde el técnico comparte los
resultados del test de velocidad realizado tras una intervención de mantenimiento. Esta práctica
permite dejar una trazabilidad del trabajo efectuado, demostrando que el servicio quedó en óptimas
condiciones y cumpliendo con el ancho de banda contratado por el usuario. Además, facilita el
seguimiento por parte del equipo de soporte y respalda la eficiencia del procedimiento realizado.

121
Fig 85 Confirmación del ajuste de potencia desde la interfaz de la ONT
En esta imagen se observa un pantallazo del chat grupal de la empresa donde el técnico
comparte la interfaz de la ONT, mostrando que los niveles de potencia han sido corregidos
satisfactoriamente tras la intervención. Esta evidencia respalda que la falla fue atendida con éxito y
que la señal de fibra óptica se encuentra ahora dentro de los parámetros óptimos, garantizando un
funcionamiento estable del servicio.

122
XIII. CONCLUSIONES
La actualización del etiquetado del rack en la empresa Mi Red Comunicaciones, aplicando la
norma ANSI/TIA-606-C, permitió organizar todos los equipos y cables que forman parte de la red.
Esto facilita el trabajo del personal técnico, ya que es más sencillo identificar cada conexión y realizar
tareas de mantenimiento o instalación de nuevos equipos sin confusiones ni pérdida de tiempo. El
diagnóstico inicial evidenció problemas como etiquetas mal hechas o completamente ausentes, lo cual
dificultaba la gestión del servicio. Con el nuevo etiquetado, se logró mejorar la identificación de
puertos en los equipos que conforman la red, y se dejó todo documentado para futuras intervenciones.
Además, durante las prácticas se pudo observar cómo trabaja la cuadrilla en los procesos de
instalación y mantenimiento, identificando las herramientas que usan, cómo se reparten las tareas y
qué medidas de seguridad aplican. Esta información fue útil para mejorar la organización del trabajo
y resaltar la importancia de cuidar la salud del personal. Por otra parte, se realizaron pruebas de
calidad con equipos como el medidor de potencia óptica y el OTDR, lo cual ayudó a comprobar si la
señal de internet llegaba correctamente a los usuarios. Estas mediciones permitieron detectar
problemas en algunas zonas y aplicar correcciones a tiempo.

123
XIV. RECOMENDACIONES
Es importante que la empresa mantenga el sistema de etiquetado actualizado cada vez que se
realicen cambios en los racks o en caso de instalación de nuevos equipos. Esto garantiza que la
organización lograda no se pierda con el tiempo. También se recomienda que el personal técnico
reciba capacitaciones sobre el uso de etiquetas y las normas que las rigen, ya que eso ayuda a mantener
un trabajo uniforme y más profesional así manteniendo continuidad de la estructura creada.
Además, se recomienda generar formatos para documentar cada salida de campo, ya sea para
instalación, mantenimiento de red. Esto facilitará que el personal técnico registre de manera clara y
ordenada las actividades realizadas lo que permite tener un mejor control y trazabilidad del trabajo
realizado, lo cual ayuda a evitar errores y mejora la respuesta ante cualquier problema. También es
importante seguir promoviendo capacitaciones relacionadas con la calidad del servicio y la seguridad
en el trabajo, para que el equipo esté preparado y actualizado frente a los retos que se presentan en la
operación diaria.

124
XV. REFERENCIAS
[1]Fibra óptica, “¿Qué es la Fibra Óptica?" iREDD. Disponible en: https://iredd.net/fibra-
optica/que-es-la-fibra-
optica/#:~:text=Definici%C3%B3n%20Avanzada%20de%20Fibra%20%C3%93ptica%20La%20fib
ra,y%20alta%20capacidad%20de%20transmisi%C3%B3n%20de%20datos.
[2] GLC Tec - Código de colores en fibra óptica: Guía completa para identificar fibras y
conectores. Disponible en: https://www.glctec.com/codigo-de-colores-en-fibra-optica-guia-
completa-para-identificar-fibras-y-conectores--news--8-1029
[3] "Fibra Óptica y FTTH," Organización de los Estados Americanos (OEA). Disponible en:
https://www.oas.org/es/citel/infocitel/2010/abril/ftth_e.asp.
[4] Ascent Optics "Cables troncales de fibra óptica," Ascent Optics, Disponible en:
https://ascentoptics.com/blog/es/trunk-
cable/#:~:text=R:%20Los%20cables%20troncales%20de,la%20r%C3%A1pida%20transferencia%2
0de%20datos.
[5] RedesZone - Todo sobre los cables de fibra óptica: tipos, conectores y más. Disponible en:
https://www.redeszone.net/tutoriales/redes-cable/cableado-fibra-optica-caracteristicas-tipos-
conectores/
[6] R. L. S. F. F., "Aplicaciones de la fibra óptica: Impulsando la era de la comunicación de
alta velocidad," LinkedIn, 26 de enero de 2024. Disponible en:
https://es.linkedin.com/pulse/aplicaciones-de-la-fibra-%C3%B3ptica-impulsando-era-
comunicaci%C3%B3n-rlsff.
[7] SAT PCS, "FTTH: La Revolución Silenciosa que Está Transformando el Internet en el
Hogar," SAT PCS. Disponible en: https://satpcs.com/sp/blog/revolucion-de-fibra-optica-ftth
[8] Motive, "¿Qué es el Optical Line Terminal (OLT)?", Motive. Disponible en: https://motive-
com.translate.goog/glossary/what-is-optical-line-
terminal?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc

125
[9] GLC TEC, "¿Qué es un splitter óptico? Para qué sirve, usos y beneficios," GLC TEC.
Disponible en: https://www.glctec.com/que-es-un-splitter-optico-para-que-sirve-usos-y-beneficios--
news--8-
1016#:~:text=Un%20splitter%20%C3%B3ptico%20es%20un%20dispositivo%20pasivo,debe%20s
er%20compartida%20entre%20muchos%20usuarios%20finales.
[10] Aselcom, "ODF (Optical Distribution Frame)," Aselcom Disponible en:
https://aselcom.com/414-odf-optical-distribution-frame
[11] TVC, "¿Cuántos hilos de fibra óptica requiero para mis conexiones?", Foro TVC.
Disponible en: https://foro.tvc.mx/docs/cuantos-hilos-de-fibra-optica-requiero-para-mis-
conexiones#:~:text=El%20sistema%20est%C3%A1%20conformado%20por,de%20sangrado%20ha
cia%20otras%20colonias.
[12] Fyco Learning, "Códigos de colores norma," Fyco Learning, Disponible en:
https://info.fycolearning.com/curso1/modulo1_2/Curso1_mod1.2_13-CodigosColoresNorma.pdf.
[13] V-SOL, "¿Qué significa ONT?", V-SOL. Disponible en:
https://es.vsolcn.com/blog/what-does-ont-mean.html
[14] Fortinet, "QoS (Quality of Service)", Fortinet Cyberglossary. Disponible en:
https://www.fortinet.com/lat/resources/cyberglossary/qos-quality-of-service
[15] I. Bernal, “Racks de Comunicaciones: ¿Qué son y Por Qué son Esenciales en
Telecomunicaciones?”, Data Mercantil. Disponible en: https://datamercantil.com/racks-de-
comunicaciones-que-son-y-por-que-son-esenciales-en-telecomunicaciones/
[16] S. De Luz, “Qué es un rack, para qué sirven y modelos de rack mural y suelo”,
RedesZone, Disponible en: https://www.redeszone.net/tutoriales/redes-cable/que-es-armario-rack-
modelos/
[17] Ignifugados CVC. "¿Cuál es la importancia del etiquetado del cableado estructurado?".
Disponible en: https://www.ignifugadoscvc.es/cual-es-la-importancia-del-etiquetado-del-cableado-
estructurado/
[18] Brady Corporation, “TIA-606-C: Estándares de Etiquetado de Cables – ¿Qué hay de
nuevo?”, BradyID.com. Disponible en: https://www.bradyid.com/resources/tia-606-c-cable-labeling-
standards

126
[19] J. Sánchez, “La importancia de etiquetar cables de red de telecomunicaciones FTTH”,
Gravotech. Disponible en: https://www.gravograph.es/blog/aplicaciones/identificacion/importancia-
de-etiquetar-cables-de-red-telecomunicaciones-ftth/
[20] DuraLabel, “Estándares de Etiquetado de Cables ANSI/TIA-606-B”, DuraLabel.
Disponible en: https://resources.duralabel.com/articles/ansi-tia-606-b-cable-labeling-standards
[21] SeikoFire, “The RedLight Fiber Optic Power Meter and Its Advantages in FTTH
Applications”, SeikoFire. Disponible en: https://www.seikofire.com/blog/the-redlight-fiber-optic-
power-meter-and-its-advantages-in-ftth-applications_b110
[22] FS.com, “Medidor de potencia óptica (OPM): ideal para las pruebas de cables de fibra”,
FS.com. Disponible en: https://www.fs.com/es/blog/optical-power-meter-an-essential-tester-for-
fiber-optic-testing-2230.html
[23] VIAVI Solutions, “¿Cuáles son los principios de funcionamiento y las características de
los OTDR?”, VIAVI Solutions. Disponible en: https://www.viavisolutions.com/es-es/cuales-son-los-
principios-de-funcionamiento-y-las-caracteristicas-de-los-otdr
[24] FibraMarket, “Uso del VFL”, FibraMarket. Disponible en:
https://www.fibramarket.com/uso-del-vfl/
[25] Congreso de Colombia, “Ley 1341 de 2009”. Disponible en:
https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=36913
[26] Congreso de Colombia, “Ley 2108 de 2021”. Disponible en:
https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=167946
[27] Departamento Nacional de Planeación, “Ley 2294 de 2023 - Plan Nacional de Desarrollo
2022-2026”. Disponible en:
https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=209510
[28] Ministerio TIC, “Decreto 1078 de 2015”. Disponible en:
https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=77888
[29] ITU-T, “Recomendación G.652 y G.657”. Disponible en: https://www.itu.int/rec/T-REC-
G.652/en
[30] Rubén T.I., “Fibra Óptica”, Tecnología Industrial 1, 25 de noviembre de 2017. Disponible
en: https://rubenti1.blogspot.com/2017/11/fibra-optica.html
[31] Uniteelcom, “Fibras Ópticas Monomodo (SM) versus Multimodo (MM)”, Uniteelcom.
Disponible en: https://uniteelcom.com.br/fibras-opticas-monomodo-sm-versus-multimodo-mm/

127
[32] Multiplay Telecomunicaciones, “OLT GPON de 7 tarjetas de 6RU - Huawei”, Multiplay
Telecomunicaciones. Disponible en: https://multiplay.com.pe/producto/producto/olt-gpon-de-7-
tarjetas-de-6ru-huawei/
[33] L. González, “FTTH, lo que debes saber”, El Cajón del Electrónico, 11 de mayo de 2017.
Disponible en: https://elcajondelelectronico.com/tag/splitter/
[34] Google Earth Web. Google LLC. Disponible en: https://earth.google.com/web/