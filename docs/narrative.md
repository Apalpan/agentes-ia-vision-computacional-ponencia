# Narrativa final — Agentes IA + Visión Computacional (GEN+)

Versión: 2.0 (reinvención ultra premium) · 2026-07-17

## Trabajo comunicacional

Al terminar, líderes y profesionales AEC deben poder **reconocer y diseñar un primer loop operativo** entre cámara, evento, agente, decisión humana y evidencia — porque habrán entendido que el valor no está en detectar objetos ni en conversar con un chatbot, sino en que **una señal visual active un sistema capaz de interpretar, decidir, escalar y conservar evidencia**.

## Tesis

> **Cuando la obra puede ver, el agente puede actuar.**

La visión aporta percepción (píxeles → eventos). El agente aporta continuidad (objetivo, contexto, herramientas, verificación). La persona conserva el criterio y la decisión crítica.

## Cierre

> **No necesitamos una obra llena de IA. Necesitamos una obra que vea, decida y aprenda.**

## Tres efectos buscados

1. **Comprensión** — distinguir visión computacional, agentes IA y automatización.
2. **Convicción** — entender por qué juntos forman un sistema operativo de decisiones.
3. **Acción** — salir con un evento crítico, una decisión y una evidencia para iniciar un piloto.

## Arco (15 escenas · 3 actos · ~18 min en vivo)

Cada escena crea la necesidad de la siguiente. La numeración es la del deck (01–15).

### Acto I — La tensión (por qué esto importa)

| # | id | Afirmación dominante | Función narrativa | Necesidad que crea |
|---|----|----------------------|-------------------|--------------------|
| 01 | cover | Cuando la obra puede ver, el agente puede actuar. | Apertura sensorial + tesis | ¿Qué significa "ver" y "actuar"? |
| 02 | signals | La obra ya produce señales. Ninguna cierra una decisión. | Fractura: el problema real | ¿Qué falta para cerrar la decisión? |
| 03 | threshold | Un asistente responde. Un agente persigue un objetivo. | Umbral conceptual | ¿Y cómo percibe ese agente la obra? |

### Acto II — El sistema (cómo funciona de verdad)

| # | id | Afirmación dominante | Función narrativa | Necesidad que crea |
|---|----|----------------------|-------------------|--------------------|
| 04 | vision-grammar | La visión no "entiende la obra": convierte píxeles en eventos. | Percepción — las 4 preguntas de la CV | ¿Dónde nace y viaja ese evento? |
| 05 | edge-pipeline | El evento nace cerca de la cámara. La acción, cerca del contexto. | Arquitectura cámara→edge→evento→agente | ¿Qué hace el agente con el evento? |
| 06 | agent-anatomy | Un agente útil es un sistema con límites. | Anatomía: objetivo/contexto/tools/memoria/verificación/permisos | ¿Cómo se ve todo junto funcionando? |
| 07 | loop | El agente mantiene vivo el loop: de la señal a la evidencia. | El loop operativo (6 estados) | Quiero verlo funcionar. |
| 08 | camera-lab | La cámara no es el producto. El producto es el evento. | Demo de percepción (cámara local opcional) | ¿Y qué pasa después del evento? |
| 09 | incident | Una detección crea ruido. Un loop diseñado cierra una respuesta. | Demo central: evento→contexto→humano→acción→evidencia | ¿Esto escala a más procesos? |

### Acto III — La decisión (qué hacer el lunes)

| # | id | Afirmación dominante | Función narrativa | Necesidad que crea |
|---|----|----------------------|-------------------|--------------------|
| 10 | multiagent | Un agente que hace todo, falla. Especialistas coordinados cierran procesos. | Orquestación | ¿Quién controla a los agentes? |
| 11 | human-gate | Autonomía proporcional al riesgo: lo crítico lo decide una persona. | Gobernanza | ¿Cómo empiezo sin riesgo? |
| 12 | pilot | Empieza con un evento crítico. No con una plataforma. | Piloto mínimo 3 fases | ¿Cómo sabré si funciona? |
| 13 | metrics | No midas alertas. Mide decisiones mejoradas. | Valor y métricas del loop | ¿Cuál es mi rol en esto? |
| 14 | aec-criterion | La IA no reemplaza el criterio de obra: lo necesita. | Rol profesional | Estoy listo para el cierre. |
| 15 | closing | Una obra que vea, decida y aprenda. | Cierre + llamada a la acción | Diseñar su primer loop. |

**Cambio estructural vs v1:** percepción (antes 06) y arquitectura (antes 07) se adelantan a las posiciones 04–05, y anatomía/loop pasan a 06–07. Justificación: el arco original explicaba "el loop" antes de explicar qué es un evento visual; la audiencia recibía la conclusión antes que sus piezas. El nuevo orden hace la progresión inevitable: señal → umbral → percepción → viaje del evento → anatomía del agente → loop completo → demostraciones.

## Reglas de copy aplicadas

- Un título = una conclusión. Máximo dos niveles de lectura (título + lead).
- Sin cifras: ninguna fuente del vault contiene datos citables (verificado). Donde una afirmación necesitaría número se usa vocabulario operativo o `Requiere validación`.
- Los tags de fuente (S1–S7) dejan de ser visibles al público: viven en las notas del presentador y en `public/source-manifest.json`.
- Vocabulario real de las fuentes: payload de evento con `tipo · zona · cámara · hora · confianza` (PRD VisionPro); alertas críticas por WhatsApp con evidencia (PRD); estados de salud del edge (Edge Node); regla "más autonomía = más logs + más permisos granulares + más aprobación humana" (S1); antipatrón "un agente que hace todo suele fallar" (S1); NO-objetivo "no identificar personas individualmente" (PRD).
- Las demos se declaran explícitamente conceptuales: no representan un despliegue real ni un modelo validado.

## Contrato de escena

Cada escena declara en `src/content/scenes.tsx`:

```ts
type SceneContract = {
  id: string
  eyebrow: string            // acto + nombre, sin doble numeración
  claim: string              // afirmación dominante (título)
  narrativeRole: string
  evidence: string[]         // ids del source-manifest
  speakerIntent: string
  transitionIn: string
  transitionOut: string
  durationInFrames: number   // para KeynoteFull (30 fps)
  stableFrame: number        // frame de estado final estable (posters/QA)
  interaction?: { kind: 'camera' | 'simulation' | 'emit-event'; fallback: string }
  notes: PresenterNotes      // intención, apertura, explicación, transición, advertencia, cue
  render: (ctx) => ReactNode
}
```

## Momentos audiovisuales (clips Remotion, todos conceptuales)

| Clip | Dónde | Duración | Secuencia |
|---|---|---|---|
| OpeningClip | apertura (antes/dentro de 01) | 7 s | oscuridad → estructura de obra en línea → una cámara detecta → la señal viaja → tesis |
| VisionToEventClip | escena 04/08 | 9 s | frame → zona → detección → clasificación → contexto → evento estructurado con payload |
| EdgeLocalProtocolClip | escena 05 | 7 s | frame → zona → caja edge → ficha de evento; viaja el evento, no el video completo |
| GPlusBrainClip | escena 06 | 12 s | cerebro en grises → red semántica GEN+ → señal entra → decisión acotada → evidencia cierra el loop |
| VoiceProtocolClip | escena 06 | 7 s | radio de obra → orden operativa → tool call verificable |
| AgentLoopClip | escena 09 | 11 s | evento → contexto → evaluación → herramienta → escalamiento → humano → acción → evidencia → cierre |
| MultiAgentProtocolClip | escena 10 | 7 s | evento único → carriles especialistas → respuesta de proceso integrada |
| HumanGateProtocolClip | escena 11 | 7 s | autonomía → umbral de riesgo → sello humano → acción registrada |
| PilotProtocolClip | escena 12 | 7 s | evento crítico → definir → operar → medir → loop mínimo |
| ClosingClip | escena 15 | 7 s | señales convergen → loop se completa → idea final → GEN+ sobrio |

No existe footage real verificable en las carpetas permitidas (inventario 2026-07-17): los diez clips son **motion graphics abstractos declarados como representación conceptual** en pantalla y en el manifiesto de medios. `GPlusBrainClip` toma como referencia de ritmo y composición la escena “Cerebro / Nexo” del HTML THESIA suministrado por Alejandro, pero reemplaza el video embebido por una red vectorial determinista construida desde cero en Remotion.

## Duración

- En vivo: ~18 min (45–90 s por escena; demos 08–09 pueden extenderse).
- Render KeynoteFull: ~2:20 min (duración por escena definida en el contrato; el video es un artefacto de comunicación/ensayo, no un sustituto de la ponencia hablada).

## Supuestos

- Ponencia presencial, audiencia AEC con conocimiento diverso de IA.
- Marca principal GEN+; VisionPro es caso/producto, no marca visual independiente.
- Cámara e incidente: demostraciones conceptuales locales, sin biometría, sin modelo validado.
