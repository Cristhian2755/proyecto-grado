Análisis del Potencial de la realidad aumentada (AR) en el

desarrollo de experiencias Inmersivas para la educación: Aplicación

planta de café

Geison Sneider Peñaloza Mendoza

Tein Eduardo Bustos Cruz

Informe final para optar al título de Tecnólogo en Gestión de Redes y Sistemas Teleinformáticos

Director del Trabajo de grado

MSc. Jorge Antonio Sequeda Serrano

Codirector del trabajo de grado

Mauricio Alfredo Zafra Aycardi

Instituto Superior de Educación Rural

Facultad de Ingeniarías e Informática

Tecnología En Gestión De Redes Y Sistemas Teleinformáticos

 Pamplona, Norte de Santander, Colombia

2025

TABLA DE CONTENIDO

LISTA DE TABLAS ................................................................................................................................... 4

LISTA DE FIGURAS ................................................................................................................................. 5

SIGLAS, ACRÓNIMOS Y ABREVIATURAS ........................................................................................ 8

RESUMEN ................................................................................................................................................... 9

ABSTRACT ............................................................................................................................................... 11

I. INTRODUCCION ................................................................................................................................. 13

II. PLANTEAMIENTO DEL PROBLEMA ........................................................................................... 15

III. JUSTIFICACION ............................................................................................................................... 16

IV. OBJETIVOS ........................................................................................................................................ 18

➢  Objetivo General .......................................................................................................................... 18

➢  Objetivos Específicos .................................................................................................................... 18

V. MARCO TEORICO ............................................................................................................................. 19

5.1 Antecedentes .................................................................................................................................... 19

Antecedentes Internacionales ........................................................................................................... 19

Antecedentes Nacionales ................................................................................................................... 21

Antecedentes Locales ........................................................................................................................ 22

5.2 Marco Conceptual. .......................................................................................................................... 23

•

•

•

•

Realidad Aumentada (AR) ...................................................................................................... 23

Control de Versiones ................................................................................................................ 23

Unity .......................................................................................................................................... 23

Blender ...................................................................................................................................... 23

•  Marcadores AR ........................................................................................................................ 24

•  Modelado 3D............................................................................................................................. 24

•

•

•

Texturas .................................................................................................................................... 24

Strapi ......................................................................................................................................... 24

ARCore ..................................................................................................................................... 24

5.3 Marco Teórico.................................................................................................................................. 24

5.5 Aspectos legales del sofware ........................................................................................................... 29

VI. METODOLOGIA ............................................................................................................................... 30

Metodología de Prototipado Rápido .................................................................................................... 30

VII.RESULTADOS ................................................................................................................................... 33

2

Casos de Uso .......................................................................................................................................... 33

Diagrama de secuencia .......................................................................................................................... 34

Modelado de la hoja .............................................................................................................................. 36

Modelado Grano de Café ...................................................................................................................... 50

Modelado Flor de Café.......................................................................................................................... 56

Modelado Planta de Café ...................................................................................................................... 62

Metodología de desarrollo de aplicación AR para visualización de planta de café: prototipado
rápido iterativo ...................................................................................................................................... 82

Especificaciones del proyecto ............................................................................................................... 82

Tabla I. Ciclo de Comunicación ........................................................................................................... 82

Tabla II. Ciclo de Planificación Rápida .............................................................................................. 84

Tabla III. Ciclo de Modelado ............................................................................................................... 85

Tabla IV. Ciclo de Construcción del Prototipo ................................................................................... 87

Tabla V. Ciclo de Desarrollo – Entrega – Retroalimentación ........................................................... 88

Video Aplicación CafeAR ..................................................................................................................... 89

VIII. DISCUSIONES ....................................................................................................................................... 90

IX. CONCLUSIONES ...................................................................................................................................... 92

X. RECOMENDACIONES .............................................................................................................................. 93

XI. REFERENCIAS ......................................................................................................................................... 94

3

LISTA DE TABLAS

Tabla 1 Ciclo de Comunicación .................................................................................................................... 83
Tabla 2 Ciclo de Planificación Rápida .......................................................................................................... 84
Tabla 3 Ciclo de Modelado .......................................................................................................................... 86
Tabla 4 Ciclo de Construcción del Prototipo ............................................................................................... 87
Tabla 5 Ciclo de Desarrollo - Entrega - Retroalimentación ......................................................................... 88

4

LISTA DE FIGURAS

Fig.  1 AR en la Educación Fuente: https://blog.inmersys.com/ ................................................................. 25
Fig.  2 AR en la medicina Fuente: https://upload.wikimedia.org/wikipedia/commons/5/5f/Augmented-
reality-1957411_1920.jpg ........................................................................................................................... 26
Fig.  3 AR en el Turismo. Fuente:
https://static.wixstatic.com/media/da5627_2fdf8939987e4222a4d5aed7f651a4c7~mv2.webp/v1/fill/w_
740,h_311,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/da5627_2fdf8939987e4222a4d5aed7f
651a4c7~mv2.webp. ................................................................................................................................... 26
Fig. 4  Metodología de Prototipado Rápido ................................................................................................ 30
Fig 5 Diagrama caso de uso aplicación AR ................................................................................................... 34
Fig. 6 Diagrama de secuencia aplicación AR ................................................................................................ 35
Fig. 7 Modelado Hoja .................................................................................................................................. 36
Fig. 8 Imagen de referencia ......................................................................................................................... 36
Fig. 9 Seleccionar imagen ............................................................................................................................ 37
Fig. 10 Modelado Principal .......................................................................................................................... 37
Fig.  11 Configurar Visibilidad ...................................................................................................................... 38
Fig. 12 Empezar a extruir ............................................................................................................................. 38
Fig. 13 Cuerpo de la hoja ............................................................................................................................. 39
Fig. 14 Limpiar mallado ............................................................................................................................... 39
Fig.  15 Grosor y detalles de la hoja ............................................................................................................ 40
Fig.  16 Relieve central ................................................................................................................................ 40
Ilustración 17 Ajustar venas ........................................................................................................................ 41
Fig. 18 Suavizado y subdivisión de la superficie .......................................................................................... 41
Fig. 19 Suavizar mallado .............................................................................................................................. 42
Fig. 20 Aplicar modificadores ...................................................................................................................... 42
Fig. 21 Mallado Limpio ................................................................................................................................ 43
Fig. 22 Curvatura central ............................................................................................................................. 43
Fig. 23 Texturizado ...................................................................................................................................... 44
Fig. 24 Node Wrangler ................................................................................................................................. 44
Fig. 25 Nodo Image Texture ........................................................................................................................ 45
Fig. 26 Configurar material .......................................................................................................................... 45
Fig. 27 UV mapping ..................................................................................................................................... 46
Fig. 28 Ajustar posición ............................................................................................................................... 46
Fig. 29 Origen del objeto ............................................................................................................................. 47
Fig.  30 Modo objeto ................................................................................................................................... 47
Fig. 31 Optimizar modelo ............................................................................................................................ 48
Fig. 32 Resultado mallado ........................................................................................................................... 48
Fig. 33 Exportación modelo ......................................................................................................................... 49
Fig.  34 Modelado Grano de Cafe ................................................................................................................ 50
Fig. 35 Silueta ovalada ................................................................................................................................. 50
Fig. 36 Detalles superficiales ....................................................................................................................... 51
Fig. 37 Texturizado ...................................................................................................................................... 51
Fig.  38 Optimización modelado .................................................................................................................. 52

5

Fig.  39 Menos polígonos en el objeto ........................................................................................................ 52
Fig. 40 UV Mapping ..................................................................................................................................... 53
Fig.  41 Activar Node Wrangler ................................................................................................................... 53
Fig. 42 Conectar Texturas ............................................................................................................................ 54
Fig.  43 Conexiones de los nodos ................................................................................................................ 54
Fig. 44 Buscar Textura ................................................................................................................................. 55
Fig. 45 Configurar materiales ...................................................................................................................... 55
Fig.  46 Exportación de modelo ................................................................................................................... 56
Fig.  47 Modelado Flor ................................................................................................................................. 56
Fig.  48 Adecuación del modelo .................................................................................................................. 57
Fig. 49 Edit Mode ......................................................................................................................................... 57
Fig. 50 Escultura del modelo ....................................................................................................................... 58
Fig. 51 Activación DynTopo ......................................................................................................................... 58
Fig.  52 Forma general y refinamiento ........................................................................................................ 59
Fig.  53 Uso brocha Smooth......................................................................................................................... 59
Fig. 54 Creación del centro de la flor ........................................................................................................... 60
Fig. 55 Usar Snake Hook .............................................................................................................................. 60
Fig. 56 Optimización del modelo ................................................................................................................. 61
Fig. 57 Aplicar los cambios .......................................................................................................................... 61
Fig. 58 Importación del objeto .................................................................................................................... 62
Fig. 59 Modelado Planta de Cafe................................................................................................................. 62
Fig. 60 Eliminar objeto predeterminado ..................................................................................................... 63
Fig. 61 Añadir nuevo objeto ........................................................................................................................ 63
Fig. 62 Ir a modo edición ............................................................................................................................. 64
Fig. 63 Unir vértices ..................................................................................................................................... 64
Fig. 64 Extruir vertice ................................................................................................................................... 65
Fig. 65 Aplicar Modificadores ...................................................................................................................... 65
Fig. 66 Smooth Shading ............................................................................................................................... 66
Fig. 67 Modificar .......................................................................................................................................... 66
Fig.  68 Forma de tallo ................................................................................................................................. 67
Fig. 69 Añadir modificador Mirror ............................................................................................................... 67
Fig. 70 Ramas de la planta ........................................................................................................................... 68
Fig. 71 Extruir la planta ................................................................................................................................ 68
Fig.  72 Ajustar grosor de tallos y ramas ..................................................................................................... 69
Fig. 73 vértices de tallo principal ................................................................................................................. 69
Fig.  74 Aplicar modificares ......................................................................................................................... 70
Fig. 75 Separar ramas como objetos independientes ................................................................................. 70
Fig. 76 Unir ramas a la planta ...................................................................................................................... 71
Fig. 77 Unir como objeto independiente .................................................................................................... 71
Fig.  78 Texturizado tronco de café ............................................................................................................. 72
Fig.  79 Activar Node Wrangler ................................................................................................................... 72
Fig.  80 Texturizado ..................................................................................................................................... 73
Fig.  81 Seleccionar textura ......................................................................................................................... 73

6

Fig.  82 Ajustar nodo de texturas ................................................................................................................ 74
Fig.  83 Texturizado ramas de café .............................................................................................................. 74
Fig.  84 Ajuste textura de ramas .................................................................................................................. 75
Fig. 85 Importar modelo 3D hoja ................................................................................................................ 75
Fig. 86 Buscar modelo 3D ............................................................................................................................ 76
Fig.  87 Configurar partículas de la hoja ...................................................................................................... 76
Fig.  88 Rotación .......................................................................................................................................... 77
Fig.  89 Activación Render del objeto .......................................................................................................... 77
Fig.  90 Resultado configuración de las hojas .............................................................................................. 78
Fig. 91 Importación modelo de fruto .......................................................................................................... 78
Fig.  92 Configurar sistema de partículas del fruto ..................................................................................... 79
Fig. 93 Activar rotación del fruto ................................................................................................................. 79
Fig.  94 Seleccionar instancia ....................................................................................................................... 80
Fig.  95 Importar modelo flor ...................................................................................................................... 80
Fig.  96 Configurar sistema de partículas de la flor ..................................................................................... 81
Fig.  97 Rotación de la flor ........................................................................................................................... 81

7

AR

CMS

IoT

PBR

LOD

API

REST

SDK

GLB

UV

BSDF

IOR

SIGLAS, ACRÓNIMOS Y ABREVIATURAS

Augmented Reality

Content Management System

Internet of thing

Physically Based Rendering

Level of Detail

Application Programming Interface

Representational State Transfer

Software Development Kit

glTF Binary

Ultraviolet (Mapping)

Bidirectional Scattering Distribution Function

Index of Refraction

8

RESUMEN

El  presente  proyecto  se  desarrolló  con  el  objetivo  de  transformar  la  enseñanza  de  la

caficultura, un pilar económico y cultural en la región, mediante el uso de tecnologías emergentes.

Para superar las limitaciones de interactividad y  dinamismo de los métodos tradicionales [1].Se

propuso  el  diseño  e  implementación  de  un  prototipo  de  aplicación  móvil  basada  en  realidad

aumentada (AR), capaz de ofrecer una experiencia educativa inmersiva para la comprensión de los

procesos del cultivo del café. [3].

El objetivo del proyecto fue analizar el potencial de la realidad aumentada (AR) para crear

experiencias  educativas  Inmersivas,  focalizándose  en  la  visualización  e  interacciones  con  un

modelo 3D de una planta de café. Como punto de partida, se llevó a cabo un análisis del estado del

arte relacionado con tecnologías y técnicas de inmersión, lo que permitió identificar enfoques y

herramientas relevantes para el desarrollo de este tipo de experiencias. A partir de estos hallazgos,

se procedió al diseño de un prototipo que integrara dichas técnicas de manera coherente, con el fin

de brindar una experiencia educativa atractiva y funcional. Finalmente, se trabajó en la integración

de un modelo 3D interactivo dentro de una aplicación de realidad aumentada plenamente operativa,

lo cual implicó el uso combinado de herramientas como Unity, Blender y Strapi, permitiendo unir

el modelado 3D, el desarrollo AR y la gestión dinámica de contenidos en una sola solución.

La metodología adoptada fue la de prototipado rápido, que facilita la creación de versiones

preliminares  de  la  aplicación  que  pueden  ser  evaluadas  y  refinadas  en  fases  tempranas  del

desarrollo.  Esta aproximación  permite validar rápidamente aspectos  como  la interfaz gráfica,  la

interacción del usuario con los modelos 3D de la planta de café y las funcionalidades de realidad

aumentada,  asegurando  iteraciones  eficientes  y  ajustes  basados  en  retroalimentación  real  para

optimizar el prototipo final.

Como  resultado  principal,  se  obtuvo  un  prototipo  funcional  que  permite  visualizar  e

interactuar con un modelo 3D de alta fidelidad en un entorno de AR. La aplicación renderiza en

tiempo real, se adapta al entorno y se optimizo para un rendimiento eficiente, La integración de

Strapi asegura la escalabilidad y actualización del contenido educativo. Se concluye que la realidad

aumentada  (AR)  representa  una  herramienta  de  alto  potencial  para  generar  experiencias  de

9

aprendizaje inmersivas y efectivas en el ámbito de la caficultura, sentando las bases para futuros

desarrollos y validaciones en entornos educativos reales.

10

Comentado [tI1]: No tiene relación con el resumen en
español

ABSTRACT

The present project was developed with the aim of transforming coffee cultivation

education—an economic and cultural pillar in the region—through the use of emerging

technologies. This initiative sought to overcome the limitations of interactivity and dynamism

inherent in traditional methods \[1]. The design and implementation of a mobile application

prototype based on augmented reality (AR) was proposed, capable of offering an immersive

educational experience for understanding the processes involved in coffee cultivation \[3].

The general objective of the project was to analyze the potential of augmented reality

(AR) to create immersive educational experiences, focusing on the visualization and interaction

with a 3D model of a coffee plant. As a starting point, a state-of-the-art analysis related to

immersion technologies and techniques was carried out, allowing the identification of relevant

approaches and tools for the development of this type of experience. Based on these findings, a

prototype was designed that coherently integrated such techniques in order to provide an

engaging and functional educational experience. Finally, an interactive 3D model was integrated

into a fully operational augmented reality application, which involved the combined use of tools

such as Unity, Blender, and Strapi, enabling the fusion of 3D modeling, AR development, and

dynamic content management into a single solution.

The methodology adopted was rapid prototyping, which facilitates the creation of

preliminary versions of the application that can be evaluated and refined in the early stages of

development. This approach allows for the quick validation of aspects such as the graphical

interface, user interaction with the 3D models of the coffee plant, and augmented reality

functionalities, ensuring efficient iterations and adjustments based on real feedback to optimize

the final prototype.

As the main result, a functional prototype was obtained that allows users to visualize and

interact with a high-fidelity 3D model in an AR environment. The application renders in real-

time, adapts to the environment, and has been optimized for efficient performance. The

integration of Strapi ensures scalability and the continuous updating of educational content. It is

concluded that augmented reality (AR) represents a high-potential tool for generating immersive

11

and effective learning experiences in the field of coffee cultivation, laying the groundwork for

future developments and validations in real educational settings.

12

I. INTRODUCCION

La caficultura representa un pilar fundamental de la economía y la cultura en Colombia,

especialmente en regiones rurales como Pamplonita, Norte de Santander, donde el cultivo del café

es una actividad productiva. Sin embargo, los métodos educativos tradicionales, como las clases

teóricas, los materiales impresos y las visitas al campo, presentan limitaciones significativas en

términos de interactividad, dinamismo y capacidad para transmitir conceptos complejos de manera

efectiva [2]. Estos métodos, aunque valiosos, a menudo no logran captar plenamente el interés de

los estudiantes ni facilitar una comprensión profunda de procesos agrícolas clave, como las etapas

de  crecimiento  de  la  planta  de  café,  el  manejo  fitosanitario  o  las  técnicas  de  recolección.  Esta

situación puede resultar en una menor retención de conocimientos y una motivación limitada, lo

que impacta la preparación de los estudiantes para enfrentar los desafíos de la agricultura moderna

[1].

En este contexto, la realidad aumentada (AR) emerge como una tecnología innovadora con

el  potencial  de  transformar  la  educación  agropecuaria.  La  realidad  aumentada  (AR)  permite

superponer elementos digitales, como modelos 3D, animaciones e información interactiva, sobre

el entorno físico, utilizando dispositivos accesibles como teléfonos inteligentes o tabletas [3]. Esta

tecnología ha demostrado ser efectiva en entornos educativos al ofrecer experiencias inmersivas

que  fomentan  la  participación  activa,  mejoran  la  retención  de  conocimientos  y  facilitan  la

comprensión de conceptos abstractos o complejos [9]. En el caso de la caficultura, una aplicación

AR puede permitir a los estudiantes visualizar una planta de café en tamaño real, interactuar con

sus  componentes  (e.g.,  hojas,  frutos,  raíces)  y  acceder  a  información  contextual  sobre  aspectos

como el tipo de suelo ideal, las plagas comunes o las prácticas de poda, todo ello en un entorno

interactivo y motivador.

El presente proyecto,  tuvo  como  objetivo  analizar el  potencial de la realidad  aumentada

Comentado [tI2]: en pasado...tuvo

para  desarrollar  experiencias  inmersivas  en  la  educación,  con  un  enfoque  específico  en  la

enseñanza del cultivo del café. Para ello, se diseñó y desarrolló un prototipo de aplicación móvil

que integra un modelo 3D interactivo de una planta de café, utilizando herramientas de vanguardia

como Unity para el desarrollo de la aplicación, Blender para el modelado 3D y Strapi como sistema

de gestión de contenidos (CMS) para administrar información educativa de manera dinámica [10].

La  aplicación  permite  a  los  estudiantes  escanear  una  superficie  plana,  anclar  el  modelo  3D  y

13

explorar sus características mediante interacciones táctiles, como toques en pantalla para acceder

a datos específicos, lo que enriquece la experiencia de aprendizaje.

Este  proyecto  no  solo  aborda  una  necesidad  educativa  específica  en  el  ISER,  sino  que

también  tiene  un  impacto  potencial  más  amplio  al  proponer  un  modelo  replicable  para  otras

instituciones  y  áreas  del  conocimiento  agrícola.  La  accesibilidad  de  la  solución,  al  utilizar

dispositivos móviles comunes y herramientas de código abierto, la hace viable para entornos rurales

con  recursos  limitados.  Además,  el  prototipo  incorpora  técnicas  de  inmersión  visual,  como

renderizado  en  tiempo  real,  y  gestión  de  contenidos  dinámica,  lo  que  asegura  una  experiencia

educativa  personalizada  y  actualizable.  Los  resultados  preliminares  sugieren  que  la  AR  puede

mejorar  significativamente  la  motivación  y  la  comprensión  de  los  estudiantes,  posicionando  al

ISER como pionero en la adopción de tecnologías emergentes en la educación rural.

14

II. PLANTEAMIENTO DEL PROBLEMA

La caficultura es una actividad de gran relevancia a nivel regional y nacional, especialmente

en  contextos  rurales  como  el  ISER,  donde  constituye  un  eje  fundamental  en  la  formación

académica y productiva de los estudiantes. No obstante, la enseñanza del cultivo del café continúa

desarrollándose  principalmente  mediante  métodos  tradicionales,  como  clases  teóricas,  material

impreso y visitas al campo.

Aunque estas estrategias aportan conocimientos básicos, presentan limitaciones para lograr

una comprensión profunda y significativa de los procesos involucrados en el cultivo del café. En

muchos casos, los estudiantes enfrentan dificultades para asimilar conceptos relacionados con las

etapas de crecimiento, el manejo fitosanitario y las prácticas de recolección, lo que afecta la calidad

y efectividad del proceso de enseñanza-aprendizaje.

Esta  situación  se  debe,  en  gran  medida,  a  la  escasa  incorporación  de  herramientas

tecnológicas  innovadoras  que  permitan  una  experiencia  educativa  más  interactiva,  visual  y

dinámica. En particular, en el ISER no se han implementado aplicaciones educativas que utilicen

tecnologías de inmersión, como la realidad aumentada, aplicadas a la enseñanza de la caficultura.

La realidad aumentada (AR) se presenta como una alternativa tecnológica con alto potencial

educativo, ya que permite la superposición de elementos virtuales como modelos 3D, animaciones

e  información  interactiva  sobre  el  entorno  real,  facilitando  la  comprensión  de  contenidos

complejos.  Su  aplicación  en  el  ámbito  educativo  ha  demostrado  mejorar  la  motivación,  la

participación y el aprendizaje significativo de los estudiantes.

En  este  contexto,  surge  la  necesidad  de  desarrollar  un  aplicativo  educativo  basado  en

realidad  aumentada  que  apoye  la  enseñanza  del  cultivo  del  café  en  el  ISER,  permitiendo  a  los

estudiantes interactuar con modelos tridimensionales y contenidos informativos que fortalezcan su

proceso formativo y contribuyan a una mejor comprensión de la caficultura.

15

III. JUSTIFICACION

Desde una perspectiva educativa, la implementación de la AR  en  el  ISER responde a la

necesidad de modernizar los métodos de enseñanza para mejorar el aprendizaje de la caficultura.

La AR permite a los estudiantes interactuar con un modelo 3D de una planta de café, visualizar sus

componentes (e.g., hojas, frutos, raíces) y acceder a información contextual, como tipos de suelo,

manejo de plagas o técnicas de poda, en un entorno inmersivo [12]. Esta interactividad fomenta la

participación activa y la retención de conocimientos, superando las limitaciones de los métodos

tradicionales que dependen de recursos estáticos o actividades logísticamente restringidas. Estudios

previos, como el de SánchezObando y Duque (2022) [3], han demostrado que la AR aumenta la

motivación y el compromiso en entornos educativos rurales, lo que respalda la pertinencia de este

proyecto para el  ISER.  Al proporcionar una herramienta que permite a los  estudiantes  explorar

conceptos agrícolas de manera práctica y visual, el prototipo tiene el potencial de cerrar la brecha

entre  la  teoría  y  la  práctica,  preparando  mejor  a  los  estudiantes  para  las  demandas  del  sector

cafetero.

Desde un punto de vista tecnológico, el proyecto se alinea con las tendencias globales en la

adopción de tecnologías emergentes en la educación y la agricultura. La AR ha sido reconocida

como una herramienta transformadora en estudios internacionales, como el de Oliveira y Corrêa

(2020),  que  destaca  su  capacidad  para  mejorar  la  productividad  agrícola  mediante  experiencias

interactivas [4]. Proyectos como FarmAR (Katsaros et al., 2017) [9] han integrado AR con IoT

para enriquecer la educación agrícola, mientras que, en el contexto local, el trabajo de Madarriaga

Acevedo  (2024)  en  el  ISER  sentó  un  precedente  al  utilizar  Strapi  y  Unity  para  objetos  de

aprendizaje  AR.  Este  proyecto  aprovecha  herramientas  de  vanguardia,  como  Unity  para  el

desarrollo  de  la  aplicación,  Blender  para  el  modelado  3D  y  Strapi  como  CMS  para  la  gestión

dinámica de contenidos, garantizando una solución técnica robusta y escalable [10]. La elección

de  herramientas  de  código  abierto  y  dispositivos  móviles  comunes  asegura  la  accesibilidad,  un

factor crítico en entornos rurales con recursos limitados.

El  impacto  socioeconómico  la  formación  de  profesionales  competentes  en  técnicas

agrícolas modernas es esencial para mantener la competitividad del sector cafetero, que enfrenta

desafíos  como  el  cambio  climático,  las  plagas  y  la  necesidad  de  prácticas  sostenibles  [3].  Al

mejorar  la  calidad  de  la  educación  agropecuaria,  el  prototipo  contribuye  a  la  preparación  de

16

estudiantes  que  puedan  implementar  soluciones  innovadoras  en  el  campo,  fortaleciendo  la

productividad y la sostenibilidad de los cultivos de café. Además, el modelo desarrollado tiene el

potencial  de  replicarse  en  otras  instituciones  educativas  rurales  y  aplicarse  a  otros  cultivos,

amplificando su impacto en el desarrollo regional.

La viabilidad del proyecto se sustenta en su diseño práctico y enfocado. El prototipo utiliza

tecnologías accesibles, como smartphones, que son ampliamente utilizados por los estudiantes, y

herramientas de código abierto que reducen los costos de implementación. La integración de Strapi

permite actualizar el contenido educativo sin modificar el código de la aplicación, asegurando su

sostenibilidad a largo plazo

17

➢  Objetivo General

IV. OBJETIVOS

Analizar el potencial de la realidad aumentada (AR) en el desarrollo de experiencias inmersivas

para la educación: Aplicación planta de café.

➢  Objetivos Específicos

•  Analizar el estado del arte sobre el uso de tecnologías de realidad aumentada y técnicas de

inmersión aplicadas a la educación, especialmente en el ámbito agropecuario.

•  Diseñar un prototipo de aplicación educativa basado en realidad aumentada, teniendo en

cuenta la técnica de inmersión seleccionada para la enseñanza del cultivo del café.

•

Integrar modelos tridimensionales (3D) del cultivo del café en una aplicación de realidad

aumentada, permitiendo su visualización e interacción como apoyo al proceso de

enseñanza-aprendizaje.

18

5.1 Antecedentes

V. MARCO TEORICO

El uso de tecnologías emergentes como la realidad aumentada (AR) ha ganado relevancia en los

ámbitos de la agricultura y la educación, debido a su capacidad para mejorar la productividad,

optimizar procesos y enriquecer las experiencias de aprendizaje. A continuación, se presentan

antecedentes internacionales, nacionales y locales que contextualizan el desarrollo de este

proyecto, destacando su pertinencia en la enseñanza de la caficultura.

Antecedentes Internacionales

En  el  Symposium  on  Virtual  and  Augmented  Reality  (SVR),  celebrado  en  Porto  de

Galinhas, Brasil, se llevó a cabo la presentación del estudio, “Aplicaciones de realidad virtual y

realidad  aumentada  en  la  agricultura:  una  revisión  bibliográfica”,  el  estudio  fue  presentado  por

Monique Emidio de Olivera y Cleber Gimenez Correa, de la Federal University of Tecnology –

Parana – Brasil en noviembre de 2020. Este estudio tenía como objetivo buscar entender cómo se

han  aplicado  las  tecnologías  de  la  realidad  aumentada,  realidad  virtual  y  realidad  mixta  en  el

contexto agrícola: en qué áreas de la agricultura se estaba usando, que tendencias se evidenciaban,

que  tecnologías  acompañaban  estas  aplicaciones,  y  cuáles  son  las  brechas  y  limitaciones  que

existen.  Para  este  estudio  llevaron  a  cabo  una  revisión  sistemática  de  la  literatura  (“literature

review”)  como  metodología,  revisando  artículos  científicos  que  tratan  sobre  aplicaciones  de

realidad aumentada (AR) y realidad virtual (VR) en agricultura, empleando criterios de inclusión

y exclusión para asegurar la calidad. Como resultado obtuvieron que alrededor de 2010 se observa

un crecimiento sostenido en la cantidad de publicaciones sobre AR/VR/RM en la agricultura, esta

tecnología  se  aplica  en  varios  sectores  de  la  agricultura  y  aún  existen  vacíos  importantes  en  la

aplicación de esta tecnologia.[4].

Por otro lado, en abril de 2023 en el marco de la 7th International Conference on Trends in

Electronics and Informatics (ICOEI) se presente el proyecto que lleva como título “Una agricultura

de  precisión  inteligente  basada  en  la  realidad  aumentada  que  utiliza  la  técnica  de  avance  en

cascada” de los autores M. Ulagammai y R. Narayana Moorthy, estos están afiliados al Saveetha

19

Engineering Collage, departamento de Ingenieria y Electronica , Chennai, Tamil Nadu, India. Este

proyecto tenía  como  objetivo  desarrollar un  sistema agrícola de precisión  inteligente basado  en

realidad  aumentada  (AR)  que  además  incorporaba  sensores  con  el  fin  de  mejorar  las  prácticas

agrícolas,  con  esto  se  buscaba  automatizar  la  gestión  del  riego,  mejorando  así  la  eficiencia  y

productividad de la agricultura. Para el desarrollo del sistema se emplearon diferentes componentes

de  hardware,  como  el  microcontrolador  ESP32  y  el  sensor  DHT11,  además  se  incorporaron

herramientas  de  software  como  Unity  Hub  y  la  aplicación  Blynk.  Este  proyecto  obtuvo  como

resultado  significativo  que  el  sistema  propuesto  basado  en  realidad  aumentada,  puede  mejorar

eficazmente el apartado de gestión de riego para los agricultores. Al emplear sensores inteligentes

y una plataforma de IoT, el sistema desarrollado permite el correcto monitoreo y control en tiempo

real  de  los  procesos  de  riego,  asimismo  la  realidad  aumentada  proporciona  una  interfaz  visual

permitiendo que los agricultores tomen decisiones según la información sobre el riego y gestión de

cultivos [17].

Del mismo modo, el 29 de abril del 2024 en la Facultad de ciencia de la Computación PGRI

Banyuwangi llevó a cabo una investigación denominada “Diseño de un folleto didáctico sobre el

proceso  de  siembra  y  procesamiento  del  café  basado  en  realidad  aumentada  en  Gombengsari”

desarrollada  por  R.  Yulianto,  A,  E,  Musantono  y  R,  Maulana.  Esta  tenía  por  objetivo  crear  un

diseño de folleto de plantación de café basado en Realidad Aumentada utilizando marcadores para

producir videos educativos que presenten visualizaciones realistas y puedan ayudar a proporcionar

información de apoyo que sea fácil de absorber y comprender. El método utilizado para crear este

medio  de  aprendizaje  es  el  Ciclo  de  Vida  del  Desarrollo  Multimedia  con  seis  etapas,  a  saber:

conceptualización,  diseño,  recopilación  de  material,  ensamblaje,  prueba  y  distribución.  La

aplicación de videos basados en realidad aumentada tiene como objetivo aumentar la impresión de

aprender el proceso de siembra y procesamiento del café mediante la presentación de imágenes

realistas.  Por  esta  razón,  realizar  un  folleto  de  aprendizaje  sobre  el  proceso  de  siembra  y

procesamiento del café basado en realidad aumentada produce marcadores que se pueden leer en

condiciones de iluminación de 10 lux y más, marcadores en condiciones húmedas, marcadores en

condiciones  aplastadas,  marcadores  en  condiciones  rayadas,  una  altura  máxima  de  90  cm  y

diferentes a los teléfonos inteligentes. Los problemas con los marcadores que no se pueden leer

incluyen marcadores de tornado, iluminación inferior a 10 lux y una altura de más de 90 cm. Como
20

conclusión, el folleto con soporte de realidad aumentada es un recurso de aprendizaje viable que

mejora  la  experiencia  de  los  visitantes  y  contribuye  a  una  mejor  comprensión  del  proceso  de

producción del café.  [18].

Así mismo, en 2017 se presentó el proyecto títulado “Optimización del cultivo con realidad

aumentada:  una  nueva  perspectiva  para  fortalecer  la  educación  agrícola  mediante  tecnología

inmersiva” desarrollado por Katsaros, A.; Keramopoulos, E.; Salampasis, M, presentado durante

la 8th International Conference on Information and Communication Technologies in Agriculture,

en la ciudad de Chanai, Creta, Grecias. Este proyecto tenía como objetivo mejorar la enseñanza

agrícola, enfocándose en el uso de tecnologías emergentes como la realidad aumentada (AR), con

el fin de superar las limitaciones de los métodos educativos tradicionales. El estudio se centró en

el desarrollo de una aplicación móvil interactiva denominada FarmAR, la cual integra AR, sensores

del Internet de las Cosas (IoT) y una base de conocimiento semántico para brindar información

contextualizada sobre cultivos. Esta herramienta permite identificar plantas, mostrar datos sobre

enfermedades  comunes,  y  visualizar  condiciones  ambientales  en  tiempo  real,  enriqueciendo  el

aprendizaje a través de una experiencia inmersiva. La investigación demuestra el potencial de esta

tecnología  para  transformar  la  educación  agrícola,  promoviendo  una  mayor  participación

estudiantil, mejorando la comprensión de conceptos relacionados con los cultivos, y facilitando un

entorno de aprendizaje práctico y seguro apoyado por información precisa y localizada. [19].

Antecedentes Nacionales

Se encontró una investigación que lleva por título “Tecnologías emergentes para el agro y

su aplicación en Colombia” desarrollado en septiembre del 2023 por Juan Camilo Ovella, Felipe

Andres  Romero  y  Claudia  Patricia  Uribe  de  la  Corporacion  Colombiana  de  Investigacion

Agropecuaria (AGROSAVIA). Su objetivo es explorar diversas tecnologías como la inteligencia

artificial, el internet de las cosas y la cadena de bloques, evaluando sus limitaciones, aplicaciones

y tendencias en el mundo. Los resultados obtenidos muestran que la agricultura en Colombia se

basa  en  técnicas  tradicionales,  con  un  vacío  significativo  en  la  implementación  de  tecnologías

avanzadas en comparación con el resto del mundo. El estudio destaca que, si bien existen algunos

21

avances en tecnologías como la agricultura 4.0, la incorporación de la agricultura 5.0 aun es escasa

[1].

Por otro lado, se halló una investigación realizada en Colombia denominada “Estrategia de

realidad aumentada como alternativa didáctica en escuelas públicas rurales de Colombia” realizada

por Jhon Wilder Sanchez-Obando y Nestor Dario Duque-Mendez, publicada en diciembre del 2022

en la revista Computer Applications in Engineering Educaction. Esta tenía como objetivo principal

diseñar una estrategia que empleara realidad aumentada para la intervención didáctica en las aulas

rurales. La estrategia planteada busca mejorar la manera en cómo los estudiantes interactúan con

los  materiales  educativos  y  enfrentar  las  brechas  que  existen  entorno  al  acceso  tecnológico.  El

estudio  se  basaba  en  definir  las  actividades  educativas  y  crear  un  aplicativo  móvil  en  realidad

aumentada  diseñado  para  las  escuelas  de  Samaná  (Colombia).  Se  obtuvieron  unos  resultados

previos que demuestran que la adopción de AR en las actividades de aprendizaje permite mejorar

significativamente la motivación de los estudiantes y profesores, mejorando eficazmente el proceso

educativo [2].

Así mismo, se encontró una investigación la cual posee como título “Predicción temprana

de rendimiento por árbol de café mediante imágenes aéreas multiespectrales” realizada por Steven

M,  LaValle  en  2017  y  publicada  en  Cambridge  University  Press  .  Esta  tenía  como  objetivo

principal  evaluar  el  uso  de  imágenes  capturadas  por  drones  como  herramienta  tecnológica

innovadora para estimar el rendimiento de cultivos de café de forma anticipada y no invasiva. En

los resultados hallados se menciona que el uso de imágenes multiespectrales permite identificar

características  físicas  y  espectrales  relevantes,  optimizando  la  toma  de  decisiones  en  el  manejo

agrícola y mejorando la eficiencia del proceso productivo [16].

Antecedentes Locales

En  el  Instituto  Superior  de  Educación  Rural  (ISER),  ubicado  en  Pamplona,  Norte  de

Santander,  Colombia,  se

llevó  a  cabo  un  proyecto

titulado  “PROTOTIPO  PARA

VISUALIZACIÓN  DE  OBJETOS  DE  APRENDIZAJE  BASADOS  EN  REALIDAD

AUMENTADA.  (O.A.R.A)”,  presentado  como  propuesta  de  grado  por  Yobani  Madarriaga

22

Acevedo.  Este  proyecto  tenía  como  objetivo  desarrollar  un  objeto  de  aprendizaje  interactivo

mediante tecnología Strapi y Unity para ofrecer un servicio de API REST, que incluya modelado

de  información,  diseño  de  marca  y  visualización  en  realidad  aumentada.  Se  empleo  para  su

desarrollo Strapi como backend para gestionar los datos y crear una API REST, además se modeló

un  objeto  3D  interactivo,  se  realizó  el  diseño  de  una  marca  para  el  objeto  de  aprendizaje,

adicionalmente se utilizó Unity para permitir la visualización del objeto de aprendizaje en realidad

aumentada, para ello se integraron las capacidades de seguimiento de Vuforia, por último se creó

un  script  en  Unity  para  realizar  la  conexión  con  la  API  REST  de  Strapi  y  así  recuperar  la

información  del  objeto  de  aprendizaje.  Como  resultado  se  obtuvo  el  desarrollo  de  un  prototipo

funcional de un objeto de aprendizaje basado en realidad aumentada, que integra las tecnologías

Strapi y Unity para la gestión de contenido y visualización [5].

5.2 Marco Conceptual.

El proyecto se fundamenta en una serie de conceptos clave que definen su enfoque tecnológico y

educativo. A continuación, se presentan las definiciones esenciales.

•  Realidad  Aumentada  (AR):  Tecnología  que  superpone  elementos  digitales,  como

modelos 3D, imágenes o datos, sobre el entorno físico, permitiendo interacciones en tiempo

real mediante dispositivos como smartphones o tabletas.  [17]

•  Control de Versiones: Sistema que registra cambios en archivos, permitiendo recuperar

versiones específicas y colaborar en el desarrollo de software. En el proyecto, se emplea

Git para gestionar el código fuente en Unity.

•  Unity: Plataforma de desarrollo de aplicaciones 2D y 3D, ampliamente utilizada para crear

experiencias AR y VR. Unity es el motor principal del prototipo, integrando ARCore para

la detección de superficies y el renderizado en tiempo real [6].

•  Blender: Herramienta de código abierto para modelado, animación y renderizado 3D. Se

utiliza para crear y optimizar el modelo 3D de la planta de café, exportado en formato GLB

[8].

23

•  Marcadores AR: Imágenes u objetos físicos que desencadenan acciones en aplicaciones

AR,  como  la  visualización  de  modelos  3D.  Aunque  este  proyecto  utiliza  AR  con

marcadores (markerless AR) mediante ARCore, los marcadores son un concepto relevante

en el contexto general [17].

•  Modelado  3D:  Proceso  de  creación  de  superficies  digitales  que  imitan  objetos  reales,

utilizando técnicas como la escultura digital o el modelado poligonal. En este proyecto, el

modelado 3D se realiza en Blender para representar la planta de café [10].

•  Texturas:  Patrones  visuales  aplicados  a  modelos  3D  para  simular  materiales,  como  la

rugosidad de las hojas o el brillo de los frutos. Se utilizan materiales PBR (Physically Based

Rendering) para lograr realismo [18].

•  Strapi: Sistema de gestión de contenidos (CMS) headless que permite crear y administrar

contenido dinámico a través de APIs REST. En el proyecto, Strapi gestiona información

educativa sobre la caficultura [5].

•  ARCore:  SDK  de  Google  para  desarrollar  aplicaciones  AR  en  Android,  que  ofrece

funciones como detección de planos, seguimiento de movimiento y ajustes de iluminación.

ARCore es la base tecnológica para la visualización del modelo 3D en el prototipo [23].

Estos conceptos proporcionan el vocabulario técnico y teórico necesario para comprender el

desarrollo y la implementación del prototipo, asegurando una base sólida para el proyecto.

5.3 Marco Teórico

La realidad aumentada (AR), consiste en una representación de la realidad que se puede

visualizar a través de diferentes dispositivos, esto se logra mediante la superposición de elementos

digitales  sobre  elementos  físicos,  esta  implementación  permite  la  creación  de  una  realidad

aumentada que se ejecuta en tiempo  real. Esta tecnología innovadora permite la interacción del

entorno digital con uno físico, permitiendo la interacción con modelos de objetos 3D [1].

24

La  realidad  aumentada  se  ha  vuelto  una  herramienta  importante  para  el  acceso  a

información  lo  que  le  permite  ubicarse  y  expandirse  hacia  diferentes  ámbitos  gracias  a  los

beneficios  que  presenta  ya  que,  permite  acceder  de  manera  rápida  a  información,  proporciona

contenidos además de animaciones en 3D, permite interactuar con los elementos digitales y permite

la geolocalización esta función puede cambiar el contenido que se visualiza según la ubicación del

usuario.

En el campo de la educación, permite la interacción con contenidos educativos enfocados

a la enseñanza de las áreas de estudio en un entorno de realidad aumentada, permitiendo que los

aprendices  se  entretengan  y  motiven  a  aprender  potenciando  de  esta  manera  la  adquisición  de

conocimiento [1] como se puede observar en la Fig. 1.

Fig.  1 AR en la Educación Fuente: https://blog.inmersys.com/

En la medicina, permite la visualización de información  de los pacientes en tiempo real,

además proporciona a los estudiantes del área un entorno para la adquisición de conocimiento de

forma interactiva o la generación de un entorno de práctica, la implementación de esta tecnología

no solo mejora la gestión de información, la adquisición y puesta en práctica de la misma sino que

permite agilizar diversas actividades lo que deriva en un menor tiempo de ejecución de las mismas,

lo cual en medicina resulta importante [9] cómo se puede observar en la Fig. 2

25

Fig.  2 AR en la medicina Fuente: https://upload.wikimedia.org/wikipedia/commons/5/5f/Augmented-reality-1957411_1920.jpg

En turismo y navegación, permite una experiencia más inmersiva e interactiva a los turistas

proporcionando guías interactivas que proporcionen información histórica y cultural sobre puntos

de interés, puede permitir la navegación asistida superponiendo indicaciones y rutas directamente

sobre  el  mundo  real  o  incluso  poder  visualizar  como  eran  los  lugares  históricos  en  el  pasado

mediante reconstrucciones virtuales [17] como se puede observar en la Fig. 3

Fig.  3 AR en el Turismo. Fuente:
https://static.wixstatic.com/media/da5627_2fdf8939987e4222a4d5aed7f651a4c7~mv2.webp/v1/fill/w_740,h_311,al_c,q_80,us
m_0.66_1.00_0.01,enc_avif,quality_auto/da5627_2fdf8939987e4222a4d5aed7f651a4c7~mv2.webp.

La Realidad Aumentada (AR) permitir superponer modelos 3D sobre el entorno físico del

usuario mediante la cámara del dispositivo. Para ello, se utilizan SDKs ARKit (iOS) y ARCore

26

(Android), que facilitan funciones avanzadas con el seguimiento de superficies, detección de planos

y ajustes de iluminación en tiempo real [10]. Por ejemplo, al apuntar el teléfono hacia una mesa, la

aplicación detectara la superficie y anclara un modelo 3D interactivo, ajustando automáticamente

su escala y orientación. La interacción se basa en gestos táctiles: un toque puede activar una ventana

emergente con información adicional, mientras que un arrastre permite rotar el modelo 3D para

examinarlo desde diferentes puntos de vista.

Para complementar al motor de desarrollo se emplea Blender, esta es una herramienta de

código  abierto,  la  cual  es  ampliamente  utilizada  para  el  modelado  3D.  Esta  herramienta  tiene

compatibilidad  con  cualquier  proceso  de  creación  3D,  esto  incluye  modelado,  rigging,

animaciones, simulaciones, renderizado, etc. Blender incluye una gran variedad de herramientas

que le permiten ser útil para la creación de cualquier tipo de producción multimedia. Los modelos

se  pueden  mejorar  para  su  visualización  en  dispositivos  móviles  para  ello  se  debe  manejar  un

modelado  estructural  y  procurar  emplear  materiales  PBR  (Physically  Based  Rendering),  esto

permite  simular  texturas  realistas  como  rugosidad,  brillo  o  reflejos.  Finalmente,  estos  modelos

pueden  exportarse  en  formatos  como  GLB  para  asegurar  la  compatibilidad  con  motores  de

desarrollo como Unity y de esta forma poder conservar las texturas y animaciones.

Además  de  las  características  visuales  e  interactivas,  los  proyectos  necesitan  gestionar

como  también  almacenar  datos  que  permitan  mejorar  la  experiencia  de  usuario.  Para  ello  se

manejan algunas herramientas fundamentales como: SQLite, Firebase y Starpi. SQLite se emplea

como base de datos local para almacenar información directamente en el dispositivo, permitiendo

acceder rápido sin dependencia de conexión a internet. Firebase por otra parte, funciona como base

de  datos  en  la  nube  para  contenido  dinámico,  como  actualizaciones  en  tiempo  real  de  datos.

Firebase  también  gestiona  autenticación  de  usuarios  y  análisis  de  uso.  Por  último,  Strapi  actúa

como CMS (Content Management System) para administrar contenido educativo complejo, como

artículos científicos, videos explicativos y cuestionarios explicativos. Strapi se aloja en un servidor

y  se integra con  Unity  mediante APIs  REST,  permitiendo  actualizar contenido  sin  modificar el

código de la app.

27

Estas herramientas realizan un trabajo en conjunto para activar funciones necesarias de la

aplicación, entre ellas la visualización 3D, donde el usuario escanea una superficie plana (como

una  mesa)  para  anclar  el  modelo  3D  de  la  planta.  La  iluminación  del  modelo  se  ajusta

automáticamente usando el sensor de luz ambiente del dispositivo, y los LODs (Levels of Detail)

reducen  la  complejidad  del  modelo  cuando  se  visualiza  a  distancia,  permitiendo  mejorar  el

rendimiento sin afectar la calidad visual.

Por otro lado, la inmersión auditiva en la cual se usa el audio espacial o audio 3D para de

esta manera proporcionar una experiencia más inmersiva. Los efectos de sonido deben adecuarse

con precisión en el entorno virtual para permitir que el usuario de manera más natural perciba la

dirección y distancia de los sonidos. Se utilizan técnicas de procesamiento de audio que permiten

simular la manera en la que el ser humano percibe los sonidos, lo que brinda un entorno más realista

[19].

Por  su  parte,  la  Inmersión  Háptica  (Táctil)  busca  que  el  usuario  experimente  texturas,

impactos o presente resistencia, esto mediante dispositivos especiales, que aumentan el realismo y

la interacción dentro del entorno [19].

Del  mismo  modo,  la  Inmersión  Cinestésica  (Movimiento  del  Cuerpo)  emplea  el

seguimiento  de  los  movimientos  físicos,  usando  sensores  y  cámaras,  para  proporcionar  una

reacción dentro del entorno que sigue los movimientos del usuario. Esta técnica permite al usuario

moverse libremente dentro del entorno virtual, lo cual mejora significativamente la interacción y

sensación de estar inmerso en el entorno [19].

Por último, la Inmersión Cognitiva (Narrativa e Interacción) proporciona una interacción

fluida e intuitiva gran importancia en los entornos virtuales. Esto permite que el usuario se sienta

incluido dentro de la parte narrativa del entorno virtual, mediante la incorporación de interfaces

más naturales y respuestas que sean proporcionadas en tiempo real y así las acciones que realice el

usuario afecten el entorno digital [19].

28

5.4 Marco Legal

Dentro de las condiciones que plantea la institución y el programa como requisitos para opción de
grado  se  plantea  en  el  reglamento  académico  y  estudiantil  el  desarrollo  del  proyecto  de  grado  en  3
modalidades diferentes que el estudiante selecciona y desarrolla según su motivación (Instituto Superior
de educación Rural, 2017).

Para el caso de este proyecto se desarrolló mediante la modalidad de investigación siguiendo los

lineamientos del reglamento estudiantil y la guía de trabajos de grado modalidad investigación.

Del reglamento académico y estudiantil del ISER:

ARTÍCULO 92

En el Plan de estudios de algunos programas, el Instituto establece como requisito para la obtención del
título  académico,  la  realización  por  parte  del  estudiante, de  un  trabajo  especial  que  se  denomina
“TRABAJO  DE  GRADO”. Por  intermedio  de  este  trabajo  se  consolida  en  el  estudiante  su  formación
integral.

ARTÍCULO 94

El  Trabajo  de  Grado,  según  sus  características,  puede  ser  realizado  en  forma  individual  o  en  grupo.
Corresponde al Comité de Trabajos de Grado autorizar que dos (2) o más estudiantes se integren en grupo
para realizar un solo trabajo.

ARTÍCULO 95

 El Trabajo de Grado puede desarrollarse en las siguientes modalidades:
Investigación:  comprende  la  planeación,  organización,  dirección  y  control  de  proyectos  que,  siendo
cabalmente  ejecutados,  procuran  obtener  información  relevante  y  fidedigna  para  entender,  verificar,
corregir o aplicar el conocimiento de la disciplina académica.

ARTÍCULO 96

 El Trabajo de Grado se desarrollará en el último período académico y para matricularlo el estudiante
debe estar cursando el sexto semestre del plan de estudios. Este será enmarcado dentro de las líneas de
investigación definidas por cada Unidad y debe sustentarse ante un jurado, compuesto por tres (3) personas
conocedoras  del  tema  y  puede  recibir  como calificación  “No  Aprobado”,  “Aprobado”,  “Excelente”  o
“Incompleto” cuando no cumpla con los objetivos propuestos en la modalidad en la cual se adelanta. En
tal caso, el estudiante deberá matricular nuevamente en el semestre académico siguiente el Trabajo de
Grado.

5.5 Aspectos legales del sofware

I.
Strapi: v5.13.1
II.  Unity hub: v3.14.3
III.  Unity Editor: v6000.0.45f1 – Licencia Personal
IV.  Blender: v4.2

29

VI. METODOLOGIA

Metodología de Prototipado Rápido

Fig. 4  Metodología de Prototipado Rápido

El prototipado rápido es una metodología de desarrollo de software que se enfoca en crear

versiones funcionales de un sistema de manera iterativa y en corto tiempo, permitiendo obtener

retroalimentación temprana.

¿Qué es el Prototipado Rápido?

Es  un  enfoque  de  desarrollo  donde  se  construyen  prototipos  funcionales  del  sistema

rápidamente para que los usuarios puedan interactuar con ellos, proporcionar feedback y validar

requisitos antes de la construcción final. El objetivo es reducir riesgos, aclarar requisitos ambiguos

y asegurar que el producto final satisfaga las necesidades reales.

Fases del Prototipado Rápido

1.  Comunicación

En esta fase inicial se establece el diálogo entre desarrolladores y usuarios para:

•

Identificar los objetivos del proyecto

•  Recopilar requisitos iniciales (aunque pueden estar incompletos)

•  Comprender las necesidades y expectativas del usuario

•  Definir el alcance general del prototipo

30

2.  Plan Rápido

Se realiza una planificación ágil que incluye:

•  Definición rápida de requisitos prioritarios

•  Establecimiento de tiempos cortos de desarrollo

•

Identificación de recursos necesarios

•  Determinación de qué características incluir en el prototipo

•  Planificación de iteraciones

3.  Modelado y Diseño Rápido

Se crean modelos y diseños simplificados:

•  Diseño de interfaces de usuario básicas

•  Diagramas simples de flujo y arquitectura

•  Diseño visual rápido (mockups, wireframes)

•  Enfoque en aspectos visibles y funcionales que el usuario pueda evaluar

•  Se prioriza la velocidad sobre la perfección

4.  Construcción del Prototipo

Se desarrolla el prototipo funcional:

•

Implementación rápida de funcionalidades clave

•  Puede usar herramientas de desarrollo rápido

•  Se enfoca en características visibles al usuario

•  No necesariamente incluye toda la lógica del sistema final

•  Puede tener código "temporal" o simplificado

5.  Desarrollo, Entrega y Retroalimentación

El prototipo se presenta a los usuarios para:

•  Demostrar funcionalidades implementadas

•  Recoger opiniones y sugerencias

•

Identificar problemas o malentendidos en los requisitos

•  Validar si el sistema va en la dirección correcta

•  Obtener aprobación o solicitudes de cambios

31

Iteración del Ciclo

Después de la retroalimentación, el ciclo se repite:

•  Se incorporan los cambios sugeridos

•  Se refinan requisitos

•  Se desarrolla una nueva versión del prototipo

•  El proceso continúa hasta que el prototipo satisface las necesidades del usuario

Ventajas de esta Metodología

•  Reducción de riesgos: Se detectan problemas tempranamente

•  Mayor participación del usuario: Involucramiento activo durante el desarrollo

•  Clarificación de requisitos: Especialmente útil cuando los requisitos son ambiguos

•  Validación temprana: Se confirma que se está construyendo lo correcto

•  Flexibilidad: Permite cambios y ajustes constantes

32

VII.RESULTADOS

1.  Realizar el análisis del estado del arte en el ámbito de la tecnología y técnicas de inmersión.

Las tecnologías inmersivas en el ámbito agrícola evidencian un avance sostenido impulsado

por la integración de realidad aumentada, virtual y mixta con sensores inteligentes, modelado 3D,

sistemas  IoT  y  herramientas  de  análisis  de  datos.  El  crecimiento  constante  en  el  uso  de  estas

tecnologías para optimizar procesos agrícolas, ha demostrado que puede fortalecer la gestión de

cultivos y mejorar la eficiencia en actividades como el riego, el monitoreo ambiental y la detección

temprana de problemáticas en las plantas. En paralelo, la educación agrícola se ha beneficiado del

desarrollo  de  interfaces  inmersivas  que  permiten  presentar  información  contextualizada,

interactuar  con  contenido  visual  en  tiempo  real  y  recrear  escenarios  productivos  con  mayor

realismo, lo que facilita la comprensión de conceptos complejos y fortalece la toma de decisiones.

En el caso de la caficultura, las aplicaciones inmersivas han demostrado ser especialmente útiles

para apoyar la enseñanza de los jóvenes caficultores. Al mismo tiempo, la integración de imágenes

aéreas, datos multiespectrales y tecnologías inmersivas permite anticipar el comportamiento del

cultivo  y  mejorar  la  planificación  agrícola.  En  contextos  rurales,  estas  soluciones  también  han

mostrado  un  impacto  positivo  en  la  motivación  estudiantil  y  en  la  reducción  de  barreras

tecnológicas  mediante  el  diseño  de  herramientas  accesibles  y  adaptadas  a  diferentes  niveles  de

infraestructura.  En  conjunto,  la  literatura  evidencia  que  las  tecnologías  de  inmersión  están

consolidándose como un recurso clave tanto para la modernización de las prácticas agrícolas como

para la educación técnica del sector cafetero, aunque aún persisten desafíos relacionados con la

infraestructura digital, la accesibilidad de los dispositivos, la estandarización de plataformas y la

apropiación tecnológica en las comunidades rurales.

2.  Diseñar el prototipo atendiendo la técnica de inmersión seleccionada.

Casos de Uso

En el diagrama de casos de uso que se muestra en la Fig. 5, se detallan las funcionalidades

que puede tener un usuario al momento de interactuar con la aplicación AR, el usuario podrá iniciar

la aplicación y explorar el entorno de realidad aumentada pudiendo interactuar con el modelo 3D

de la planta de café, seleccionando una parte de este tendrá la posibilidad de visualizar información

33

referente a  la selección  en  un  panel informativo  y  por  último  podrá  cerrar el aplicativo  cuando

desee.

Fig 5 Diagrama caso de uso aplicación AR

Diagrama de secuencia

El diagrama de secuencia presente en la Fig. 6, muestra la interacción entre un usuario, una

aplicación movil AR, el SDK AR Core y strapi en un flujo de interacción AR. El proceso inicia

cuando  el  usuario  abre la aplicación  móvil,  lo  cual lleva a la app a solicitar la activación  de la

cámara  posteriormente  el  usuario  debe  ubicar  el  teléfono  sobre  el  marcador  AR;  al  detectarlo,

ARFoundation  envía  la  posición  y  orientación  del  marcador  para  que  la  aplicación  muestre  en

pantalla el modelo 3D de la planta de café. Cuando el usuario toca alguna parte del modelo, la

aplicación  identifica  la  sección  seleccionada  y,  mediante  ARFoundation,  envía  a  Strapi  una

solicitud de información específica sobre esa parte. Strapi procesa la petición y devuelve los datos

correspondientes, que luego son mostrados en la aplicación, permitiendo al usuario visualizar de

manera interactiva la información asociada a cada componente de la planta directamente sobre la

representación en realidad aumentada.

34

Fig. 6 Diagrama de secuencia aplicación AR

35

Modelado de la hoja

1.  Preparar área de trabajo.

•  Ubica la vista en el eje Z (vista superior), presionando la tecla Numpad 7.

Fig. 7 Modelado Hoja

•  Agrega una imagen de referencia, presiona la tecla Shift + A, ve a Image y selecciona

la opción reference.

•  Ahora se selecciona la imagen que usarás como referencia para modelar el objeto 3D.

Fig. 8 Imagen de referencia

36

2.  Modelado principal.

Fig. 9 Seleccionar imagen

•

Inicia agregando un plano, presiona la tecla Shift + A elige Mesh y la opción plane.

Fig. 10 Modelado Principal

•  Configura la visibilidad, para ello activa la vista Wireframe y los rayos X para poder

ver a través de los objetos (presiona ALT + Z).

37

Fig.  11 Configurar Visibilidad

•  Empieza a extruir la vena principal de la hoja, entra en modo edición (Tab), emplea el

selector de bordes (tecla 2) y selecciona el borde que apunta hacia la punta de la hoja,

luego presiona la tecla E para extruir siguiendo la vena principal.

Fig. 12 Empezar a extruir

•  Crea  el  cuerpo  de  la  hoja,  sigue  extruyendo  las  caras  desde  la  vena  principal  para

formar el restante de la hoja.

38

•  Mantén la malla lo más limpia posible evitando geometría innecesaria.

Fig. 13 Cuerpo de la hoja

Fig. 14 Limpiar mallado

3.  Grosor y detalles de la hoja.

•  Agrégale  un  grosor  a  la  hoja,  sal  del  modo  edición  (TAB),  añade  el  modificador

solidify y ajusta el grosor (Thickness) de 0.5 m, dependiendo del grosor requerido.

39

Fig.  15 Grosor y detalles de la hoja

•  Añade un pequeño relieve a la vena principal, para esto entra a modo edición (TAB),

procura activar el selector de caras (3), selecciona toda la vena y extruye brevemente

hacia arriba (E + Z).

Fig.  16 Relieve central

•  Ajusta los bordes de la vena, usa el selector de bordes (2), selecciona y mueve hacia

abajo (G + Z) los bordes individuales.

40

4.  Suavizado y subdivisión de la superficie.

Ilustración 17 Ajustar venas

•  Agrega  una  subdivisión  para  suavizar,  para  lo  cual  debes  añadir  el  modificador

Subdivision Surface ajustando el nivel a 1 (Viewport).

Fig. 18 Suavizado y subdivisión de la superficie

•  Suaviza  la  malla,  en  modo  objeto  presiona  clic  derecho  y  elige  la  opción  Shade

Smooth.

41

Fig. 19 Suavizar mallado

•  Aplica los modificadores para que se plasmen en el objeto, presiona clic derecho sobre

el objeto elige Convert to opción Mesh.

Fig. 20 Aplicar modificadores

•  Como  resultado  se  podrá  visualizar  una  malla  limpia  con  todas  las  modificaciones

realizadas.

42

Fig. 21 Mallado Limpio

5.  Curvatura de la hoja.

•  Crea la curvatura que caracteriza la hoja, para lograrlo entra en modo edición (TAB),

activa la edición proporcional (0), en tipo de influencia selecciona Sphere y mueve

hacia arriba ligeramente (G + Z).

6.  Texturizado de la hoja.

Fig. 22 Curvatura central

•  Activa  el  complemento  Node  Wrangler  para  agilizar  el  trabajo  con  nodos,  ve  a  la

pestaña editar (edit), busca la opción preferencias (prerferences) y en el apartado Add-

ons busca y activa Node Wrangler.

43

Fig. 23 Texturizado

•  Emplea el Node Wrangler para conectar texturas de manera fácil, en el Shader Editor,

selecciona el material base, ubica el puntero del mouse sobre el color base del BSDF

y presiona Ctrl + T.

•  En el nodo Image Texture, haz clic en Open y selecciona tu textura.

Fig. 24 Node Wrangler

44

Fig. 25 Nodo Image Texture

•  Configura  el  material,  para  ello  ajusta  los  valores  de  Metallic,  Roughness,  IOR  y

Alpha según el efecto requerido.

Fig. 26 Configurar material

•  Crea el UV Mapping para mapear la superficie 3D a una textura 2D, entra en modo

edición,  selecciona  todo  el  objeto  (A),  presiona  clic  derecho  elige  la  opción  UV

Unwrap apartado Cube Projection.

45

•  Ajusta la posición y escala del mapeado (S, G) en el UV Editor.

Fig. 27 UV mapping

Fig. 28 Ajustar posición

7.  Ajustar origen del objeto 3D.

•  Ubique el punto de origen en la base de la hoja, para conseguirlo selecciona un vértice

base, luego presiona Shift + S y selecciona la opción Cursor to Selected para ubicar

un cursor sobre el vértice que se seleccionó.

46

Fig. 29 Origen del objeto

•  Sal al modo objeto (Tab) y asigna el punto de origen con clic derecho opción Set origin

y elige Origin to 3D Cursor.

8.  Optimización de modelo.

Fig.  30 Modo objeto

•  Reduce la cantidad de polígonos para optimizar el modelo 3D si es necesario. Añade el

modificador Decimate (Diezmar), selecciona el modo Un-Subdivide para trabajar con

mallas irregulares y asígnale un valor de 2 (ajusta según la calidad requerida) al número

de iteraciones (iterations).

47

Fig. 31 Optimizar modelo

•  Como  resultado  se  obtiene  una  malla  muy  similar,  pero  con  una  menor  cantidad  de

polígonos o caras.

9.  Exportación del modelo 3D.

Fig. 32 Resultado mallado

•  Exporta  el  modelo  con  textura,  dirígete  a  la  pestaña  archivo  (file),  busca  la  opción

exportar (export) y selecciona el formato glTF 2.0 (.glb/ .gltf)

48

•  Seleccione el directorio de destino de su archivo y presione exportar.

Fig. 33 Exportación modelo

49

Modelado Grano de Café

1.  Modelado del grano de café.

•  Con el cubo que aparece predeterminado le aplicaremos una subdivisión Surface

(nivel 3).

Fig.  34 Modelado Grano de Cafe

•  En modo edición, se escala en los ejes X e Y (S + Shift+Z) para lograr una silueta

ovalada.

2.  Detalles superficiales del grano de café.

Fig. 35 Silueta ovalada

•  Con el modificador Displace, se aplica un mapa de ruido procedural (tipo Magic)

en baja intensidad para generar micro imperfecciones.

50

Fig. 36 Detalles superficiales

3.  Texturizado del grano.

•  Activa el complemento Node Wrangler para agilizar el trabajo con nodos, ve a la

pestaña editar (edit), busca la opción preferencias (prerferences) y en el apartado

Add-ons busca y activa Node Wrangler.

4.  Optimización del objeto.

Fig. 37 Texturizado

•  Reducir la cantidad de polígonos para optimizar el modelo 3D si es necesario.

Añadiendo el modificador Decimate, seleccionando el modo Collapse con un

ratio de 0.7 se reducirán la cantidad de polígonos del objeto sin alterar su forma.

51

Fig.  38 Optimización modelado

•  Como resultado se optiene un objeto con menos polígonos y mas optimizado sin

deformarze.

5.  Aplicación de texturas.

Fig.  39 Menos polígonos en el objeto

•  Crea el UV Mapping para mapear la superficie 3D a una textura 2D, entra en modo

edición, selecciona todo el objeto (A), presiona la tecla U y elige la opción Project

from View (Bounds).

52

Fig. 40 UV Mapping

•  Activa el complemento Node Wrangler para agilizar el trabajo con nodos, ve a la

pestaña editar (edit), busca la opción preferencias (prerferences) y en el apartado

Add-ons busca y activa Node Wrangler.

Fig.  41 Activar Node Wrangler

•  Emplea el Node Wrangler para conectar texturas de manera fácil,  en el Shader

Editor, selecciona el material base, ubica el puntero del mouse sobre el color base

del BSDF y presiona Ctrl + T, luego elimina el nodo Mapping.

53

Fig. 42 Conectar Texturas

•  Une el Generate del nodo Texture Cordinate con el Vector del Image Texture,

luego en el nodo Image Texture, haz clic en Open.

Fig.  43 Conexiones de los nodos

•  Busca y abre tu textura.

54

Fig. 44 Buscar Textura

•  Configura  el  material,  para  ello  ajusta  los  valores  de  Metallic  entre  0.8-0.9  y

Roughness  entre 0.9-1.0, además en  el  nodo  Image Texture selecciona la opción

Box y ajusta el valor del Blend a 1.000 para permitir que las partes de la textura se

fusionen mejor, selecciona en la cuarta opción Mirror.

6.  Exportación del modelo.

Fig. 45 Configurar materiales

•  Exporta el modelo con textura, dirígete a la pestaña archivo (file), busca la opción

exportar (export) y selecciona el formato glTF 2.0 (.glb/ .gltf)

55

Fig.  46 Exportación de modelo

•  Seleccione el directorio de destino de su archivo y presione exportar.

Modelado Flor de Café

1.  Preparación base de trabajo.

•  Usamos el bloque que se nos proporciona por defecto en el área de trabajo.

Fig.  47 Modelado Flor

•  Adecuaremos el cubo al tamaño optimo para poder trabajar el diseño de flor que en

este caso será X:1.0, Y:1.4, Z:1.0.

56

Fig.  48 Adecuación del modelo

•  En el Edit mode le aplicaremos un subdivide de nivel 4 al cubo el cual nos va a

permitir trabajar mejor el cubo.

Fig. 49 Edit Mode

2.  Escultura del modelo.

•  Cambiamos a Sculpt mode (Ctrl + Tab).

57

Fig. 50 Escultura del modelo

•  En la barra lateral derecha, activa DynTopo (Dynamic Topology), ya que este nos

ayudara modificando la malla mientras esculpimos, quitando o agregando polígonos

automáticamente según el nivel de detalle.

3.  Dar forma general de pétalos y refinamiento.

Fig. 51 Activación DynTopo

•  Usando la brocha Grab para estirar el cubo haciendo la base de donde estarna las

hojas y pétalos de la flor.

58

Fig.  52 Forma general y refinamiento

•  Usando la brocha Smooth para suavizar la superficie hecha y eliminar defectos en la

base de las hojas y pétalos, con DynTopo activado mientras usamos la brocha se

estará eliminado polígonos y vértices innecesarios en el modelo.

4.  Creación centro de la flor.

Fig.  53 Uso brocha Smooth

•  Usando la brocha Grab daremos forma ovalada a la parte superior del centro de la

flor.

59

Fig. 54 Creación del centro de la flor

•  Usando Snake Hook crearemos y daremos forma a los pequeños pistilos del centro de

la flor.

5.  Optimización del modelo.

Fig. 55 Usar Snake Hook

•  Usando el modificador Decimate en su opción de Un-subdivide aumentaremos la

sección de Iterations hasta bajar los vértices y polígonos del objeto lo mas posible sin

dañar su forma.

60

Fig. 56 Optimización del modelo

•  Aplicamos los cambios al modelo y veremos una disminución drástica de los vértices

y polígonos del objeto.

6.  Importación del objeto.

Fig. 57 Aplicar los cambios

•  Exporta el modelo con textura, dirígete a la pestaña archivo (file), busca la opción

exportar (export) y selecciona el formato glTF 2.0 (.glb/ .gltf)

61

•  Seleccione el directorio de destino de su archivo y presione exportar.

Fig. 58 Importación del objeto

Modelado Planta de Café

1.  Eliminar objeto por defecto

•  Al iniciar un nuevo proyecto, encontrarás un cubo por defecto en la escena.

Fig. 59 Modelado Planta de Cafe

2.  Seleccionalo (Clic izquierdo o con la tecla A) y elimínalo presionado la tecla x o supr.

62

Fig. 60 Eliminar objeto predeterminado

3.  Añadir nuevo objeto.
•  Presiona Shift + A y selecciona Mesh y la opción Plane para añadir un nuevo plano.

Fig. 61 Añadir nuevo objeto

4.  Ir a modo edición.
•  Selecciona el objeto y presiona la tecla TAB para ir a modo edición.

63

Fig. 62 Ir a modo edición

5.  Unir los vértices.
•  Presiona la tecla A para seleccionar todos los vértices y luego con la tecla M elige la

opción “At Center” para fusionarlos en un solo vértice.

Fig. 63 Unir vértices

6.  Extruir vértice.
•  Con el vértice seleccionado, presiona la tecla E para extruirlo hacia arriba permitiendo

formar el tallo y darle la forma que se necesita.

64

Fig. 64 Extruir vertice

7.  Aplicar modificadores.
•  Busca el panel de modificadores (ícono de llave inglesa) y añade el modificador Skin,

también añade Subdivisión Surface.

Fig. 65 Aplicar Modificadores

•  Habilita el Smooth Shading del modificador Skin y asígnale un Levels Viewport de 2 al

Subdivisión Surface.

65

Fig. 66 Smooth Shading

8.  Modificar.
•  En el modo edición, cambia a la vista Wireframe (tecla Z o en la parte superior derecha)

se debe tener el modo selección de vértices activo (en la parte superior izquierda).

•  Selecciona el vertice superior y extruye (Tecla E) hasta obtener la forma del tallo deseada.

Fig. 67 Modificar

66

Fig.  68 Forma de tallo

9.  Añadir modificador Mirror.
•  Ve al panel de modificadores y agrega Mirror, en los ajustes marca los ejes X/Y y activa

Clipping, esto permitirá que las ramas se creen de manera simétrica.

Fig. 69 Añadir modificador Mirror

10. Crear ramas de la planta.
•  Selecciona los verticés laterales del tallo desde donde saldrán las ramas.

67

Fig. 70 Ramas de la planta

•  Extruye (Tecla E) los vertices necesarios para darle la forma necesaria a la planta

pensando en futuras hojas o frutos.

Fig. 71 Extruir la planta

11. Ajusta grosor del tallo y ramas.
•  Selecciona una rama en modo edición y modifica el grosor (Ctrl + A) de la rama de

forma precisa.

68

Fig.  72 Ajustar grosor de tallos y ramas

•  Ahora selecciona los vértices del tallo principal y asígnale el grosor (Ctrl + A) para darle

el grosor que necesites.

Fig. 73 vértices de tallo principal

12. Aplicar modificadores.
•  Vuelve al modo objeto (Tecla TAB) y haz clic derecho sobre el modelo seleccionando

Convert To opción Mesh.

69

Fig.  74 Aplicar modificares

13. Separar ramas como objetos independientes.
•  En modo edición (Tecla TAB), selecciona las ramas y oprime la tecla P, selecciona la

opción “Selection” para separarlas en un nuevo objeto.

Fig. 75 Separar ramas como objetos independientes

14. Unir ramas de la planta.
•  En el modo objeto, selecciona todas las ramas (shift + clic en cada rama).

70

Fig. 76 Unir ramas a la planta

•  Presiona las teclas Ctrl + J para unirlas como un solo objeto independiente.

Fig. 77 Unir como objeto independiente

15. Texturizado del tronco de café.
•  Selecciona el tronco de la planta, ve a edición (Tab), presiona clic derecho y ve a la

opción UV Unwrap Faces y allí busca Cube Projection para hacer un mapeado UV de
la forma exacta del tronco.

71

Fig.  78 Texturizado tronco de café

•  Ve a la pestaña Edit, busca la opción de Preferences y activa el Node Wrangler de la

opción Add-ons para conectar texturas de manera fácil.

Fig.  79 Activar Node Wrangler

•  Dentro de la pestaña Shading, selecciona el Base Color del nodo Principled BSDF y
presiona ctrl + T para crear varios nodos de manera rápida, elimina el nodo Mapping,
luego presiona open en el nodo Image Texture para buscar y abrir la textura que
emplearás.

72

•  Busca y selecciona la textura que emplearás en el modelo 3D.

Fig.  80 Texturizado

Fig.  81 Seleccionar textura

•  Selecciona el Generated del Texture Coordinate y conéctalo con el Vector del nodo
Image Texture, luego aplica los ajustes al Image Texture para evitar que se vean las
divisiones de la textura, para ello aplica un Box con un Blend de 1.000 y selecciona la
opción de Mirror, posteriormente en el nodo Principled BSDF aplica un Metallic de 0,
un roungness de 0, IOR de 1.000 y Alpha de 1.000.

73

Fig.  82 Ajustar nodo de texturas

16. Texturizado de ramas de café.
•  Ve a la pestaña UV Editing, luego selecciona las ramas de la planta y presiona clic
derecho, en las opciones que se despliegan busca UV Unwrap Faces y selecciona
Unwrap Minimun Stretch para que las ramas se distribuyan en el espacio de trabajo del
mapeado.

Fig.  83 Texturizado ramas de café

•  Dirígete a la pestaña Shading y realiza el mismo proceso que se llevó a cabo en el tronco
exceptuando las configuraciones de los nodos, para estas en el nodo de Image Texture
modifica únicamente la opción repeat y en el Principed BSDF configura el Roughness
en 0.5, IOR en 1.5 y el Alpha 1.0.

74

Fig.  84 Ajuste textura de ramas

17. Importar modelo 3D de la hoja.
•  Dirígete a archivo luego selecciona la opción import y oprime en glTF 2.0 (.glb/gltf).

Fig. 85 Importar modelo 3D hoja

•  Navega hasta la ubicación del archivo e importalo.

75

Fig. 86 Buscar modelo 3D

18. Agregar y configurar el sistema de partículas para la hoja.
•  Selecciona el objeto al que se le añadirán hojas, observa el panel de caracteristicas
sección particulas, pulsa el boton “+” para construir un sistema de particulas, y
selecciona el tipo Hair, activa la opción Advance para tener acceso a más opciones,
otorgale un valor de 60 a la Emission y selecciona Vertices en la opción Emit From.

Fig.  87 Configurar partículas de la hoja

•  Se activa la rotación en normal con un ramdomize de 0 (O un valor bajo para dar algo de

variacion).

76

Fig.  88 Rotación

•  Se activa un render de tipo object y en Instance Object selecciona el modelo de la hoja

que importaste, aplicale un scale de 0.150 (ajusta según el tamaño de la hoja).

Fig.  89 Activación Render del objeto

•  Como resultado se obtienen hojas en cada vértice de las ramas.

77

Fig.  90 Resultado configuración de las hojas

19. Importación del modelo del fruto.
•  Se debe realizar el proceso de importación del modelo 3D del fruto seleccionándolo y

dándole en import.

Fig. 91 Importación modelo de fruto

20. Agregar y configurar el sistema de partículas para el fruto.
•  Se dirige a la pestaña sistema de partículas, se le da al más, se selecciona hair, advanced,

se le otorga un numero de emission de 30, y se selecciona emit from vértices.

78

Fig.  92 Configurar sistema de partículas del fruto

•  Se activa la rotación en orientación normal y un ramdoming de 0.539, se selecciona la

opción render as object con un scale de 0.190

Fig. 93 Activar rotación del fruto

•  Se selecciona en instance el modelo de los frutos que importamos.

79

Fig.  94 Seleccionar instancia

21. Importación modelo 3D flor de café.
•  Se selecciona el modelo y se oprime import.

Fig.  95 Importar modelo flor

22. Creación y configuración de sistema de partículas para la flor.
•  Se crea un nuevo sistema de partículas, se selecciona hair, advanced, un emission number
de 9 y speed de 1 para evitar que se sobrepongan sobre los frutos, y emit from vértices.

80

Fig.  96 Configurar sistema de partículas de la flor

•  Se activa la rotación en normal, se selecciona render as object con scale de 0.50 y en

instance se selecciona el modelo 3D de la flor.

Fig.  97 Rotación de la flor

81

3.  Integrar el modelo 3D en una aplicación AR, permitiendo su visualización.

Metodología de desarrollo de aplicación AR para visualización de planta de café:
prototipado rápido iterativo

Especificaciones del proyecto

Equipo: 2 personas
Plataforma: Unity 6 + AR Foundation + Strapi
Dispositivo Objetivo: Android 7.0+
Duración estimada: 12 meses

Tabla I. Ciclo de Comunicación

Objetivo del Proyecto

Alcance Inicial

Especificaciones Técnicas

Requerimientos Funcionales

Requerimientos no Funcionales

Recursos Necesarios

Analizar el potencial de AR/VR en procesos educativos
mediante una aplicación AR que permita visualizar una
planta de café en 3D, reconocer sus partes y consultar
información desde Strapi.

Construir una app AR para Android 7.0+ con detección de
marcador, visualización de planta, interacción táctil, UI
informativa y consumo de API.

1.  Unity 6 (URP Template)
2.  Android Studio (para ADB)
3.  Node.js (para Strapi)
4.  Visual Studio.

1.  Detección precisa del marcador
2.  Proyección del modelo 3D sobre el marcador
3.  Detección táctil de tallo, fruto, hojas, flor
4.  Highlight visual
5.  Solicitudes a API Strapi
6.  Visualización de información en pantalla
7.  Estabilidad del modelo.

1.  Compatibilidad con Android 7+
2.  Interacción intuitiva fluidez
3.  Estabilidad visual
4.  Sin cierres inesperados.

1.  Dispositivo ARCore
2.  Computador de desarrollo
3.  Unity 6

82

Entregable de la Fase

Configuraciones Previas necesarias

4.  Strapi configurado
5.  Marcador impreso o digital.

6.  Documento de requerimientos
7.  Entorno Unity configurado
8.  Strapi instalado
9.  Marcador definido
10.  Librería de imágenes configurada.

1.  Creación del proyecto Unity URP
2.  Configuración de Android Build Settings

(IL2CPP, ARM64)

3.  Instalación de paquetes AR Foundation + ARCore
4.  Configuración de XR Plug-in Management.

Tabla 1 Ciclo de Comunicación

83

Tabla II. Ciclo de Planificación Rápida

Estructura de Fases

Ciclo 1

Ciclo 2

Ciclo 3

Agenda de Evaluación

Criterios de Éxito

Ciclo 1: Prototipo básico (tracking y despliegue 3D).
Ciclo 2: Interacción por partes + highlight + API
Strapi.
Ciclo 3: UI final + despliegue de información +
estabilidad.

Día 1: Configuración AR, instalación de paquetes,
Build Settings, creación de librería de imágenes.
Día 2: Integración modelo 3D, configuración de
colliders, creación de prefab.
Día 3: Build & Run, pruebas en dispositivo,
debugging.

1.  Creación de scripts de partes
2.  Configuración de colliders por tipo
3.  Ajustes de jerarquía del modelo
4.  Pruebas de selección táctil.

1.  Construcción de UI
2.  Conexión con Strapi
3.  Despliegue de contenido dinámico
4.  Pruebas de lectura API.

1.  Revisión del tracking
2.  Estabilidad del modelo
3.  Tiempo de detección
4.  Interacción táctil
5.  Highlight
6.  Rendimiento

1.  Modelo estable.
2.  Colliders precisos.
3.  Interacción fluida.
4.  Correcta respuesta del API.
5.  Sin fallos críticos.

Entregables

Ciclo 1: Configuración de entorno de trabajo.

Ciclo 2: Interacción funcionales, componentes UI
iniciales.

Ciclo 3: Documentación, APP final, métricas finales.

Tabla 2 Ciclo de Planificación Rápida

84

Tabla III. Ciclo de Modelado

Diseño del Marcador

Modelado de la escena AR

1.  Imagen con alto contraste
2.  Sin simetría
3.  Tamaño físico 0.20 m
4.  Creación de Reference Image Library
5.  Asignación al ARTrackedImageManager
6.
limitación de imágenes móviles: 1.

1.  Eliminación de Main Camera
2.  Creación de XR Origin (Mobile AR)
3.  Adición de AR Session
4.  Adición de AR Tracked Image Manager.

Diseño de jerarquías del modelo 3D

1.  Importación del modelo
2.  Organización en

•  Tallo
•  Hojas
•  Fruto
•  Flor

3.  Ajustes de escala (0.3–0.8)
4.  Habilitación Read/Write
5.  Generación de colliders
6.  Estructura limpia y modular.

Diseño de Script

ImageTrackingController

instancia y oculta modelo
sincroniza tracking

•
•
•  posicionamiento.

SimplePlantPart

•
tipo de parte
•  highlight color
•  gestión de colisiones
•

comportamiento táctil.

Configuración de Colliders

1.  Colliders mesh/box para cada parte

Gestión de Capas

•  Tallo
•  Hojas
•  Frutos
•  Flor

2.  Ajustes en tamaño y centrado.

3.  Creación Layer: “PlantParts”
4.  Asignación a cada parte interactiva
5.  Separación lógica del resto del entorno.

85

Validación del Diseño

1.  Confirmar visibilidad de colisiones
2.  Verificar nombres de partsType (“tallo”,

“fruto”, “hojas”, “flor”)

3.  Verificar que todas las partes respondan
adecuadamente sin solapamientos.

Tabla 3 Ciclo de Modelado

86

Tabla IV. Ciclo de Construcción del Prototipo

Construcción del Proyecto Unity

Importación del Modelo 3D

Creación del Prefab

Implementación de Scripts

Compilación Android

Validaciones Durante Construcción

1.  Crear proyecto URP.
2.  Instalar AR Foundation, ARCore XR Plugin.
3.  Cambiar plataforma a Android.
4.  Configurar IL2CPP + ARM64.
5.  Requerir acceso a Internet.
6.  Ajustar Player Settings.

7.  Importar modelo.
8.  Ajustar escala.
9.  Generar colliders.
10.  Separar partes si el modelo no viene

segmentado.

11.  Crear carpeta “Models”.

1.  Configurar transformaciones.
2.  Verificar jerarquía.
3.  Arrastrar a carpeta Prefabs.
4.  Eliminar del escenario tras convertir.

5.  Crear carpeta Scripts.
6.  Insertar ImageTrackingController en XR Origin.
7.  Asignar prefab.
8.  Crear e implementar SimplePlantPart en cada

GameObject de la planta.

1.  Configurar versión 0.1.0.
2.  Establecer Package Name.
3.  Añadir escena única.
4.  Build & Run.
5.  Instalación en dispositivo mediante ADB si

falla.

1.  Console sin errores.
2.  Detection estable.
3.  Modelo aparece centrado y a escala.
4.  Colliders responden.

Tabla 4 Ciclo de Construcción del Prototipo

87

Tabla V. Ciclo de Desarrollo – Entrega – Retroalimentación

Testing Funcional

Matriz de Pruebas

Métricas Esperadas

Debugging

Problemas Comunes

Soluciones Aplicadas

1.  Prueba de permisos.
2.  Detección del marcador.
3.  Estabilidad del modelo.
4.  Tiempo de aparición.
5.  Respuesta a interacción táctil.
6.  Pruebas de highlight.

1.  Ángulos: 0°, 30°, 45°.
2.  Distancias: 20, 40, 60 cm.
3.  Iluminación: natural, artificial, tenue.
4.  Estabilidad: 30 s observación continua.
5.  Tracking: desaparición / reaparición.

1.  Tiempo promedio de detección: ~1 s.
2.  Estabilidad: 8/10.
3.  Experiencia general: 8/10.
4.  Tiempo de respuesta táctil: inmediato.
5.  Highlight visible sin retraso.

6.  Ajuste de escala en prefab.
7.  Cambio de Physical Size del marcador.
8.  Mejorar iluminación.
9.  Corregir colisiones superpuestas.
10.  Revisar permisos de cámara.

1.  Modelo muy grande/pequeño.
2.  Tracking inestable.
3.  Marcador no detectado.
4.  App crashea.
5.  Highlight no responde.
6.  Colisión incorrecta.

1.  Ajuste de Scale Factor.
2.  Reorganización de colliders.
3.  Impresión de marcador más grande.
4.  Mejora de iluminación.
5.  Revisión de consola y logs ADB.

Evaluación Final

Revisión de criterios

Entregables de Cierre

•  Estabilidad.
•
sin crashes.
•
interacción precisa.

1.  APK funcional
2.  Video demostrativo
3.  Resultado
4.  Screenshots del modelo en AR.

Tabla 5 Ciclo de Desarrollo - Entrega – Retroalimentación

88

Nota: Para mayor información sobre el proceso de desarrollo  de la aplicación AR, consultar guía completa

presente en los anexos.

Video Aplicación CafeAR

•  Enlace: https://youtu.be/E15-wwrk7X8?si=wz4TN4ANHeFTmVr6

89

VIII. DISCUSIONES

Durante  el  desarrollo  del  proyecto  se  generaron  diversas  discusiones  técnicas  y

metodológicas que fueron determinantes para la construcción del prototipo de realidad aumentada.

Estas discusiones permitieron orientar el proceso hacia soluciones eficientes, coherentes con los

objetivos del estudio y ajustadas a las limitaciones técnicas y de tiempo del equipo.

1. Elección de la Metodología de Prototipado Rápido

Una  de  las  discusiones  iniciales  más  relevantes  fue  la  selección  de  la  metodología  de

trabajo.  El  equipo  evaluó  diferentes  enfoques,  entre  ellos  metodologías  tradicionales  como  el

modelo en cascada y metodologías ágiles como Scrum. Sin embargo, se identificó que la naturaleza

del proyecto —centrado en la creación de un prototipo funcional de una aplicación AR— requería

un proceso flexible, iterativo y que permitiera validar avances de manera temprana.

En este contexto, se discutió ampliamente el uso de la metodología de prototipado rápido,

destacando sus ventajas para proyectos donde el producto final es altamente visual e interactivo.

La posibilidad de generar versiones preliminares, recibir retroalimentación inmediata y ajustar los

componentes en ciclos cortos resultó especialmente adecuada para el desarrollo en Unity y para la

integración del modelo 3D.

Finalmente,  se  concluyó  que  el  prototipado  rápido  ofrecía  una  estructura  clara  pero

adaptable,  con  fases  concisas  (comunicación,  planificación  rápida,  modelado,  construcción  y

retroalimentación), garantizando eficiencia y reduciendo la probabilidad de errores acumulados.

La discusión permitió determinar que esta metodología respondía mejor a las características del

proyecto,  al  tiempo  limitado  y  al  equipo  de  trabajo  reducido,  lo  cual  justificó  plenamente  su

adopción.

2. Decisión de Modelar Cada Parte de la Planta de Café por Separado

Otra discusión significativa giró en torno a la estrategia de modelado 3D de la planta de

café. Inicialmente se consideró la posibilidad de crear un único modelo unificado que integrara

tallo,  hojas,  frutos  y  flores  en  una  sola  estructura.  Sin  embargo,  durante  la  fase  exploratoria
90

surgieron preocupaciones sobre la eficiencia del proceso, el nivel de detalle requerido y la posterior

interacción dentro del entorno AR.

El equipo analizó las implicaciones técnicas de cada enfoque. Modelar toda la planta como

un solo objeto ofrecía simplicidad inicial, pero dificultaba:

•

•

•

la aplicación diferenciada de texturas,

la optimización de polígonos por componente,

la generación de colisiones específicas en Unity,

•  y la interacción táctil independiente de cada elemento.

Además,  el  objetivo  del  aplicativo  requería  que  el  usuario  pudiera  seleccionar  partes

específicas de la planta (hojas, frutos, flor o tallo) para visualizar información contextualizada. Esto

implicaba que un modelo unificado limitaría significativamente la precisión de los colliders y el

comportamiento individualizado de cada sección.

Después de evaluar estas condiciones, se tomó la decisión de modelar cada parte de la planta

por separado utilizando Blender. Esta elección facilitó:

•  un mayor control sobre el nivel de detalle de cada componente,

•

•

la optimización de polígonos para mejorar el rendimiento en dispositivos móviles,

la aplicación de sistemas de partículas para generar hojas y frutos de manera realista,

•  y  la  implementación  en  Unity  de  scripts  independientes  para  gestionar  interacciones

táctiles.

La discusión concluyó que este enfoque modular no solo favorecía la calidad del modelo

3D,  sino  que  también  hacía  más  robusto  el  funcionamiento  del  prototipo  AR,  permitiendo  una

experiencia más educativa, interactiva y eficiente.

91

IX. CONCLUSIONES

I.  A partir de la revisión documental y el análisis del estado del arte, se cumplió con la

identificación de una tendencia creciente en la integración de realidad aumentada con

herramientas como Unity y Blender para la educación agrícola. Este estudio permitió

determinar que, aunque la tecnología presenta un nivel de madurez avanzado en otros

países, en el contexto colombiano y específicamente en el sector cafetero, persiste una

brecha significativa que este prototipo ayuda a cerrar mediante el uso de interfaces

interactivas y visualización 3D.

II.  Mediante la ejecución de la fase de diseño basada en la metodología de prototipado

rápido, se logró estructurar de manera coherente los casos de uso y diagramas de

secuencia necesarios para la interacción usuario-aplicación. La arquitectura resultante

priorizó un enfoque modular, separando técnicamente los componentes de la planta (tallo,

hojas, frutos y flores) para garantizar que la estructura lógica del aplicativo permitiera una

navegación intuitiva y una visualización técnica precisa de la anatomía del café.

III.  Como resultado de la integración técnica final y la consolidación de la funcionalidad

operativa, se alcanzó la incorporación completa de modelos tridimensionales de alta

fidelidad desarrollados en Blender dentro del motor Unity. Esto permitió obtener una

aplicación operativa para Android que utiliza ARCore para el anclaje en superficies

físicas, fortaleciendo el sistema con la vinculación al CMS Strapi, lo cual garantiza que la

información educativa sea gestionada de forma dinámica sin necesidad de recompilar el

código fuente del aplicativo.

92

X. RECOMENDACIONES

I.  Realizar  en  una  fase  posterior  pruebas  de  usabilidad  formal  con  la  población  objetivo

(estudiantes  y  docentes  del  ISER),  ya  que  el  presente  trabajo  se  centró  en  la  validación

técnica y el desarrollo del prototipo funcional. Esto permitirá medir el impacto pedagógico

real y la retención de conocimientos tras el uso de la herramienta.

II.  Ampliar la aplicación a otros componentes del ecosistema cafetero, como plagas,

enfermedades, técnicas de poda y etapas fenológicas, aprovechando la capacidad de Strapi

para actualizar el contenido sin modificar el código de la aplicación.

III.  Aunque se logró el seguimiento mediante marcadores, se recomienda evolucionar hacia el

uso de ARCore markerless. Esto eliminaría la necesidad de una imagen física de

referencia, permitiendo al usuario proyectar la planta de café en tamaño real directamente

sobre el terreno agrícola, mejorando la inmersión y practicidad.

IV.

Implementar técnicas avanzadas de Niveles de Detalle (LOD) y optimización de mallas

para asegurar que el aplicativo funcione con fluidez en dispositivos de gama media y baja,

comunes en las zonas rurales de Norte de Santander, garantizando así la inclusión

tecnológica.

93

XI. REFERENCIAS

[1] J. C. Ovalle Másmela, “Tecnologías emergentes para el agro y su aplicación en Colombia,”

Jan. 2023. [Online]. Disponible en:

https://repository.agrosavia.co/bitstream/20.500.12324/38661/4/Ver_Documento_38661.pdf

[2] J. W. Sánchez-Obando and N. Duque, “Augmented reality strategy as a didactic alternative in

rural public schools in Colombia,” Computer Applications in Engineering Education, vol. 31, no.

3, pp. 552–573, Dec. 2022, doi: 10.1002/cae.22598.

[3]  J.  Cabero-Almenara,  R.  Valencia-Ortiz,  y  C.  Llorente-Cejudo,  «Ecosistema  de  tecnologías

emergentes: realidad aumentada, virtual y mixta», TCE, n.º 23, pp. 7–22, sep. 2022.

[4] M. E. de Oliveira and C. G. Corrêa, “Virtual Reality and Augmented reality applications in

agriculture: a literature review,” pp. 1–9, Nov. 2020, doi: 10.1109/SVR51698.2020.00017.

[5] Y. Madarriaga Acevedo, "Prototipo para visualización de objetos de aprendizaje basados en

realidad aumentada (OARA)," propuesta de grado, Facultad de Ingenierías e Informática, Instituto

Superior de Educación Rural, Pamplona, Norte de Santander, Colombia, 2024.

 [7]

Unity Technologies, "Unity - The World’s Leading Real-Time Development Platform," Unity, 2025.

[Online]. Available: https://unity.com/. [Accessed: 16-Mar-2025].

[8]

Blender Foundation, "About Blender," Blender Documentation, 2025. [Online]. Available:

https://docs.blender.org/manual/en/latest/getting_started/about/index.html. [Accessed: 16-Mar-2025].

[9]

Unity Technologies, "Descripción general del SDK de Vuforia," Unity Documentation, 2018.

[Online]. Available: https://docs.unity3d.com/es/2018.4/Manual/vuforia-sdk-overview.html. [Accessed:

16-Mar-2025].

[10]

Blender Foundation, "Introduction to Modeling," Blender Documentation, 2025. [Online].

Available: https://docs.blender.org/manual/en/latest/modeling/introduction.html#modes. [Accessed:

16-Mar-2025].

[11]

Blender Foundation, "Glossary - Texture," Blender Documentation, 2025. [Online]. Available:

https://docs.blender.org/manual/en/latest/glossary/index.html. [Accessed: 16-Mar-2025].

94

[12]

J. L. Ordóñez, "Realidad virtual y realidad aumentada," Revista Digital de ACTA, no. 6,

2020.

[En

línea].

Disponible

en:

https://www.acta.es/medios/articulos/ciencias_y_tecnologia/063001.pdf

[13]  Unity,  AR

Foundation  Documentation.

[En

línea].  Disponible

en:

https://docs.unity3d.com/Packages/com.unity.xr.arfoundation

[14]  Unity,  XR

Interaction  Toolkit  Documentation.

[En

línea].  Disponible  en:

https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit

[15]  Blender  Foundation,  Blender  Manual  -  Modelado  Orgánico.  [En  línea].  Disponible  en:

https://docs.blender.org/manual/es/latest/modeling/introduction.html

[16]  S.  M.  LaValle,  Virtual  Reality,  Cambridge  University  Press,  2017.  Disponible  en:

https://lavalle.pl/vr/.

[17] M. Ulagammai, “An Augmented Reality based Intelligent Precision Agriculture using

Cascade Advancement Technique,” pp. 303–307, Apr. 2023, doi: 10.110

[18] Yulianto, R., Musantono, A. y Maulana, R. (2024). Realización de un diseño de folleto de

aprendizaje para el proceso de siembra y procesamiento de café basado en realidad aumentada en

Gombengsari. Jikom: Revista de informática y computadoras .

https://doi.org/10.55794/jikom.v14i1.138 .9/ICOEI56765.2023.10125750.

[19] Katsaros, A., Keramopoulos, E., y Salampasis, M. (2017). Optimización del cultivo

mediante realidad aumentada., 805-811.

[20] Bolaños, J., Corrales, J., y Campo, L. (2023). Viabilidad de la predicción temprana del

rendimiento por árbol de café basada en imágenes aéreas multiespectrales: Caso de los cultivos

de café arábico en el Cauca, Colombia. Remote. Sens. , 15, 282.

https://doi.org/10.3390/rs15010282 .

[21] R. L. Calderón Zambrano, M. E. Yánez Romero, K. E. Dávila Dávila y C. E. Beltrán Balarezo, "Realidad

virtual y aumentada en la educación superior: experiencias inmersivas para el aprendizaje profundo,"

Revista Religación, vol. 8, no. 37, pp. 1-15, 2023. Disponible en: http://doi.org/10.46652/rgn.v8i37.1088.

[22] M. J. Pimentel Elbert, B. M. Zambrano Mendoza, K. A. Mazzini Aguirre y M. A. Villamar Cárdenas,

"Realidad virtual, realidad aumentada y realidad extendida en la educación," Revista RECIMUNDO, vol. 7,

no. 2, pp. 74-88, 2023. Disponible en: https://recimundo.com/index.php/es/article/view/2027.

95

[23] Miro, “¿Qué es el prototipado rápido?” [En línea]. Disponible en:

https://miro.com/es/prototipos/prototipado-rapido/ [Accedido: 30-may-2025].

96