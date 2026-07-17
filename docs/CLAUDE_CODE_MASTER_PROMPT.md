# Prompt maestro para Claude Code

Copiar desde `INICIO DEL PROMPT` hasta `FIN DEL PROMPT` en una sesión de Claude Code iniciada en `D:\AP`.

---

## INICIO DEL PROMPT

Actúa como director creativo de presentaciones, estratega de storytelling, senior product designer, motion director con Remotion y frontend engineer especializado en experiencias web para escenario.

Tu misión no es hacer una revisión superficial ni aplicar un tema visual. Debes **auditar, criticar, rediseñar e implementar** una evolución ultra premium de una ponencia existente sobre agentes IA y visión computacional aplicada a construcción.

Trabaja directamente sobre el repositorio real y deja una versión funcional, verificable, presentable en vivo y reutilizable. No te detengas en recomendaciones si puedes implementar y probar la mejora.

## 1. Resultado buscado

Elevar la presentación de una buena primera versión a una keynote original y memorable que:

- se entienda en menos de cinco segundos por escena;
- tenga una tesis clara y acumulativa, no una colección de slides;
- conecte agentes IA, visión computacional y decisiones de obra sin hype;
- combine explicación, tensión, demostración y aplicación;
- se sienta diseñada específicamente para GEN+ y AI Construction;
- use motion, Remotion y clips solo cuando aumenten comprensión, evidencia o impacto;
- funcione de forma impecable en escenario, offline y con controles simples;
- pueda evolucionar después hacia MP4, clips sociales y nuevas ponencias.

Trabajo comunicacional:

> Al terminar, líderes y profesionales AEC deben poder reconocer y diseñar un primer loop operativo entre cámara, evento, agente, decisión humana y evidencia, porque entenderán que el valor no está en “poner IA”, sino en cerrar una decisión real de obra.

Tesis central que debe preservarse o fortalecerse:

> Cuando la obra puede ver, el agente puede actuar.

Idea de cierre:

> No necesitamos una obra llena de IA. Necesitamos una obra que vea, decida y aprenda.

## 2. Rutas y límites

Repositorio que debes mejorar:

`D:\AP\agentes-ia-vision-computacional-ponencia`

Archivos principales:

- `D:\AP\agentes-ia-vision-computacional-ponencia\src\slides.tsx`
- `D:\AP\agentes-ia-vision-computacional-ponencia\src\Deck.tsx`
- `D:\AP\agentes-ia-vision-computacional-ponencia\src\styles.css`
- `D:\AP\agentes-ia-vision-computacional-ponencia\src\types.ts`
- `D:\AP\agentes-ia-vision-computacional-ponencia\docs\narrative.md`
- `D:\AP\agentes-ia-vision-computacional-ponencia\public\source-manifest.json`
- `D:\AP\agentes-ia-vision-computacional-ponencia\scripts\verify.mjs`
- `D:\AP\agentes-ia-vision-computacional-ponencia\scripts\qa.mjs`

Referencias de solo lectura permitidas en el vault:

- `D:\AP\AP_Knowledge_OS\05_KNOWLEDGE\07_Agentes_IA_MCP_Tool_Use.md`
- `D:\AP\AP_Knowledge_OS\05_KNOWLEDGE\11_Computer_Vision_VisionPro.md`
- `D:\AP\AP_Knowledge_OS\03_PROYECTOS\VisionPro\03_Producto_VisionPro\PRD_VisionPro.md`
- `D:\AP\AP_Knowledge_OS\03_PROYECTOS\VisionPro\04_Tecnologia_Arquitectura\VisionPro_Edge_Node.md`
- `D:\AP\AP_Knowledge_OS\02_EMPRESAS\GEN+\03_GEN+-Marca\GENplus-Branding-Design-System.md`
- `D:\AP\AP_Knowledge_OS\AI Summit GEN+\presentacion-agentes-ia-construccion.html`

Carpetas permitidas para descubrir material visual existente, siempre en lectura:

- `D:\AP\AP_Knowledge_OS\03_PROYECTOS\VisionPro`
- `D:\AP\AP_Knowledge_OS\AI Summit GEN+`
- `D:\AP\AP_Knowledge_OS\02_EMPRESAS\GEN+\03_GEN+-Marca`

Reglas de seguridad y escritura:

- El vault es fuente de lectura. No modifiques, muevas, renombres ni crees archivos dentro de `D:\AP\AP_Knowledge_OS`.
- No hagas una exploración masiva de todo el disco o todo el vault.
- Busca progresivamente y solo dentro de las rutas permitidas.
- Excluye `.env`, credenciales, tokens, bases de datos, historiales y carpetas de secretos.
- Escribe únicamente dentro del repositorio de la presentación.
- Preserva cambios ajenos si el árbol de trabajo no está limpio.
- No publiques, despliegues, hagas push ni abras PR sin autorización explícita.
- No inventes cifras, precisión, clientes, resultados, casos desplegados, testimonios o benchmarks.
- Usa `No se tiene claro` y `Requiere validación` cuando una afirmación no pueda sostenerse con las fuentes.

## 3. Estado actual que debes respetar

La versión actual ya incluye:

- React + TypeScript + Vite;
- 15 escenas HTML 16:9;
- identidad visual GEN+ en azul profundo;
- navegación por teclado y táctil;
- overview, fullscreen y notas del presentador;
- demo opcional de cámara local sin biometría;
- simulación conceptual de un incidente;
- fuentes locales y funcionamiento offline después del build;
- manifiesto de fuentes;
- QA de screenshots, layout, consola, teclado, responsive, reduced motion y accesibilidad.

No destruyas estas capacidades. Antes de rediseñar, verifica el estado real con:

```powershell
cd D:\AP\agentes-ia-vision-computacional-ponencia
git status --short
npm install
npm run check
```

Lee todos los archivos principales antes de emitir un juicio. Inspecciona la presentación completa en ejecución y revisa:

`D:\AP\agentes-ia-vision-computacional-ponencia\qa\contact-sheet.png`

## 4. Método obligatorio

Trabaja en cinco fases. Cada fase debe dejar evidencia concreta. Usa agentes auxiliares solo para investigaciones o verificaciones independientes. Nunca uses dos agentes para escribir simultáneamente los mismos archivos.

### Fase 0 — Diagnóstico observable

Antes de editar:

1. Ejecuta el deck y recorre todas las escenas.
2. Revisa narrativa, copy, composición, ritmo, motion, legibilidad, demos y cierre.
3. Clasifica hallazgos: P0 rompe; P1 debilita tesis o credibilidad; P2 reduce UX/calidad; P3 es refinamiento.
4. Evalúa cada escena por afirmación, función narrativa, evidencia, tensión, visual dominante, interacción, frase del presentador, transición y decisión: conservar, fusionar, reescribir, rediseñar o eliminar.
5. Guarda el diagnóstico en `D:\AP\agentes-ia-vision-computacional-ponencia\docs\audit-ultra-premium.md`.

No conviertas el diagnóstico en una excusa para no implementar.

### Fase 1 — Storytelling y contenido

Reformula el arco para una ponencia presencial de aproximadamente 18 minutos dirigida a profesionales y líderes AEC con distintos niveles de conocimiento de IA.

La progresión debe sentirse inevitable:

1. tensión real de obra;
2. límite de la información fragmentada;
3. cambio de asistente a agente;
4. visión: de imagen a evento;
5. loop operativo conjunto;
6. demostración concreta;
7. límites humanos y gobernanza;
8. piloto mínimo;
9. métricas de decisión;
10. invitación final accionable.

No estás obligado a conservar exactamente 15 escenas. Elige la cantidad que maximice claridad y ritmo, idealmente entre 12 y 18. Cada escena debe tener una sola función narrativa y una afirmación dominante.

Reglas de copy:

- títulos que expresen una conclusión;
- poco texto visible y alto valor semántico;
- lenguaje que Alejandro pueda decir en voz alta;
- términos técnicos explicados mediante causalidad o ejemplo;
- ninguna instrucción interna visible;
- ninguna cifra sin fuente primaria;
- ninguna metáfora genérica de robots, cerebros luminosos o magia IA;
- notas, transiciones y frases puente fuera de la vista del público.

Actualiza `docs\narrative.md` y la estructura de contenido.

## 5. Dirección UX/UI ultra premium

La experiencia debe sentirse como una keynote cinematográfica de tecnología aplicada a infraestructura, no como un dashboard, una plantilla SaaS o un carrusel de tarjetas.

Principios:

- composición editorial y escénica;
- un gesto visual dominante por escena;
- siluetas variadas;
- ritmo entre oscuridad, luz, escala, vacío y densidad;
- azul profundo GEN+ como base;
- azul eléctrico para señal, actividad y datos;
- naranja solo para llamadas a la acción reales;
- tipografía grande y legible a distancia;
- grilla y HUD sutiles;
- diagramas con significado operacional;
- profundidad mediante capas, luz y contraste, no card soup;
- detalles de construcción, cámaras, zonas, flujos, coordenadas y evidencia como lenguaje visual propio;
- evitar stock corporativo, exceso de glassmorphism y neón gratuito.

Requisitos de escenario:

- canvas 16:9;
- diseñar para 1920×1080 y validar 1440×810;
- zona segura mínima de 5 %;
- títulos sin cortes ni saltos accidentales;
- contraste AA mínimo;
- foco visible y controles táctiles;
- nada crítico dependiente de hover;
- estado final estable en cada escena.

## 6. Motion y Remotion

No agregues movimiento a todo. Diseña una gramática temporal coherente.

El motion debe dirigir atención, revelar causalidad, mostrar cambio de estado, explicar señal → evento → agente → decisión → evidencia, construir tensión y cerrar cada escena.

Define tokens compartidos de duración rápida/media/narrativa, curvas, stagger, blur, desplazamiento, transición y reduced motion.

Remotion será el motor temporal cuando exista una secuencia reproducible o una salida de video. No dupliques manualmente el contenido entre HTML y video.

Arquitectura recomendada, solo si la inspección la valida:

- contenido y metadatos en un contrato compartido;
- deck interactivo como experiencia principal;
- composiciones Remotion que reutilicen escenas o una capa visual compartida;
- estado final estable por escena;
- captura en momentos temporales conocidos;
- separación entre componentes interactivos y versiones deterministas para render.

Primero valida Remotion con cuatro escenas:

1. portada;
2. loop operativo;
3. cámara/evento;
4. cierre.

Solo expande al deck completo si las cuatro cumplen calidad, rendimiento y mantenibilidad. No hagas una migración ciega.

Si incorporas Remotion, agrega scripts reales y comprobados para Studio, render del deck y clips. No dejes comandos ficticios.

## 7. Clips integrados

Los clips deben cumplir una función narrativa. No uses video como fondo decorativo permanente.

Busca primero material existente dentro de las carpetas permitidas. Si encuentras medios:

1. verifica relevancia;
2. no asumas derechos;
3. copia al repositorio el archivo seleccionado;
4. registra procedencia, licencia y uso previsto;
5. optimiza para reproducción local;
6. incluye poster y fallback.

Destinos:

- `public\media\clips`
- `public\media\stills`
- `public\media\posters`
- `public\media\media-manifest.json`

Si no existe material verificable, no inventes footage ni finjas un caso real. Crea una secuencia abstracta explícitamente conceptual con Remotion o deja un slot documentado como `Requiere validación`.

Clips deseables:

- apertura atmosférica: 5–8 s;
- cámara → evento: 6–10 s;
- escalamiento agéntico: 8–12 s;
- cierre reutilizable: 5–8 s.

Condiciones:

- reproducción local y offline;
- carga diferida;
- poster antes del play;
- sin autoplay con audio;
- audio apagado por defecto;
- disparo del presentador cuando corresponda;
- fallback estático;
- medios comprimidos;
- navegación nunca bloqueada.

## 8. Interacción y modo presentador

Conserva y mejora flechas, Space, PageUp/PageDown, Home/End, overview con O, notas con N, fullscreen con F, Esc, swipe, URL directa, temporizador y recuperación ante cámara o asset faltante.

Evalúa añadir únicamente si mejora el escenario: autoplay controlado, progreso temporal, speaker view separada, cue de avance, modo ensayo y versión sin demos.

No introduzcas controles que compitan con la presentación.

## 9. Arquitectura

Evita que `slides.tsx` crezca como monolito. Si aporta valor, separa contenido, escenas, componentes, navegación, temporalidad, media, tokens y QA.

Una estructura posible, no obligatoria:

```text
src/
  content/
  deck/
  scenes/
  components/
  motion/
  remotion/
  styles/
public/
  assets/
  media/
docs/
qa/
scripts/
```

Usa la mínima estructura que reduzca duplicación y permita iterar escenas independientemente.

Dependencias:

- justifica cada nueva dependencia;
- conserva React, TypeScript y Vite;
- usa Remotion para temporalidad, video y render determinista;
- evita Three.js salvo que una relación esencial sea imposible de explicar mejor en 2D;
- no introduzcas backend;
- evita librerías enormes para una sola escena.

## 10. QA obligatorio

La tarea no termina cuando compila.

Verifica:

### Funcional

- navegación completa;
- overview, fullscreen, notas y temporizador;
- enlaces directos;
- teclado y touch;
- cámara denegada;
- assets faltantes;
- clips sin carga;
- offline;
- reduced motion.

### Visual

- todas las escenas a 1920×1080 y 1440×810;
- escenas críticas a 390×844;
- cada escena temporal al 0 %, 25 %, 50 %, 75 % y 100 %;
- cero overflow, clipping, títulos partidos, frames vacíos, saltos de layout, fuentes rotas u overlays sobre copy esencial;
- estado final estable y legible.

### Técnico

- typecheck y build;
- cero errores de consola;
- rutas relativas correctas;
- carga offline;
- cero violaciones serias/críticas de axe;
- assets con procedencia;
- media con poster y fallback;
- render determinista si hay Remotion;
- cero datos inválidos o `NaN`.

Gate mínimo:

```powershell
npm run typecheck
npm run build
npm run verify
npm run qa
```

Si cambias la arquitectura, actualiza `npm run check` para que siga siendo el gate único.

Genera o actualiza escenas PNG, `qa\contact-sheet.png`, `qa\qa-report.json`, `public\source-manifest.json`, el manifiesto de medios y la documentación de ejecución/render. Inspecciona cada escena a tamaño completo; el contact sheet no sustituye esa revisión.

## 11. Entregables

Debe quedar:

1. presentación HTML interactiva y offline;
2. código organizado;
3. narrativa y notas actualizadas;
4. escenas PNG;
5. contact sheet;
6. manifiesto de fuentes y activos;
7. reporte QA;
8. README de ejecución, controles y arquitectura;
9. prototipo Remotion de cuatro escenas o evidencia técnica de por qué aún no conviene;
10. clips con procedencia o slots conceptuales marcados, nunca casos falsos.

Si Remotion queda validado, entrega además composición completa, MP4 de la ponencia, tres clips cortos —apertura, loop y cierre— y comandos reproducibles.

## 12. Aceptación

La versión se acepta solo si:

- la tesis se resume en una frase;
- cada escena tiene afirmación y función narrativa;
- el arco aumenta comprensión y tensión;
- la demo explica un loop, no solo una animación;
- la estética es propia de GEN+ y AI Construction;
- no hay plantillas genéricas ni card grids repetitivos;
- motion y clips aportan significado;
- no hay afirmaciones inventadas;
- fuentes y medios tienen procedencia;
- funciona offline;
- teclado, touch, fullscreen, notas y reduced motion funcionan;
- build, QA y renders pasan;
- no hay overflow, clipping, errores, frames vacíos o assets rotos;
- el vault permanece intacto;
- otra persona puede ejecutar y renderizar el proyecto.

Evalúa de 0 a 10: tesis, storytelling, copy, originalidad, identidad GEN+, composición, motion, clips, modo presentador, accesibilidad, mantenibilidad y valor comercial. Vincula la puntuación a evidencia observable; no uses autoevaluación subjetiva como prueba.

## 13. Reporte final

Antes de editar, entrega un diagnóstico compacto: qué funciona, qué es débil, top cinco hallazgos, qué arreglarás ahora, qué postergarás y riesgos ocultos. Luego implementa sin esperar confirmación para decisiones reversibles dentro del alcance.

Al terminar informa:

1. tesis y arco resultante;
2. decisiones de diseño;
3. escenas creadas, eliminadas o transformadas;
4. arquitectura Remotion;
5. clips y procedencia;
6. archivos modificados;
7. comandos de ejecución/render;
8. pruebas y resultados;
9. riesgos pendientes;
10. siguiente iteración;
11. rutas absolutas de todos los entregables.

No declares completado si solo preparaste un plan, no inspeccionaste la experiencia o las pruebas no pasaron.

## FIN DEL PROMPT
