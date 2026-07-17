# Auditoría ultra premium — Fase 0

Fecha: 2026-07-17 · Auditor: Claude Code (equipo senior integrado) · Base: commit `4717d79`

Método: lectura completa del código (`slides.tsx`, `Deck.tsx`, `styles.css`, `types.ts`, scripts), ejecución real de `npm run check`, inspección visual de las 15 escenas a 1440×810 + móvil 390, y contraste con las fuentes autorizadas del vault (S1–S7).

---

## 1. Estado del gate al iniciar

| Paso | Resultado |
|---|---|
| `npm run typecheck` | PASS |
| `npm run build` | PASS (720 ms) |
| `npm run verify` | PASS (15 escenas, 7 fuentes) |
| `npm run qa` | **FAIL — overflow horizontal de 8 px en `cover` a 1440×810** |

El deck que existe hoy **no pasa su propio gate**. Todo lo demás (consola, axe, teclado, reduced motion) pasa.

## 2. Diagnóstico compacto

**Qué funciona:** tesis correcta y presente; 15 escenas con una afirmación por escena; navegación/overview/notas/fullscreen sólidos; demo de cámara con fallback y sin biometría; funcionamiento offline; manifiesto de fuentes honesto (S7 excluido por requerir validación); cero errores de consola y cero violaciones axe.

**Qué es débil:** a partir de la escena 6 el deck se vuelve una plantilla de sí mismo (la misma silueta hub-and-spoke se repite 4 veces); el motion es un stagger de entrada uniforme más órbitas infinitas sin significado; la "demostración" central no demuestra causalidad (no se ve el evento, ni el payload, ni la evidencia final); el cierre —la escena más importante— es la más débil visualmente; no existe Remotion, ni clips, ni media, ni render.

**Top 5 hallazgos:**
1. (P0) El gate falla por overflow en cover.
2. (P1) Repetición estructural: 4 escenas comparten composición radial idéntica, 2 comparten 3-cards, 2 comparten 2-paneles+eje → el deck pierde originalidad y memoria visual justo en su tramo técnico.
3. (P1) La cadena causal señal→evento→agente→decisión→evidencia nunca se ve como dato: la cámara no produce un evento visible, el incidente no muestra payload ni cierre con evidencia. La tesis se afirma pero no se demuestra.
4. (P1) Notas de producción visibles al público: pills "S1 S2" en cada escena y en el footer (metadatos internos del manifiesto).
5. (P1) Escena 14 (Venn): la tarjeta CRITERIO tapa el texto de ambos óvalos ("obra · seguridad · BIM · calida…" queda cortado). Copy esencial ilegible.

**Riesgos ocultos detectados:** `verify.mjs` exige exactamente 15 escenas (frágil ante rediseño); componente `ThreeQuestions` definido y nunca montado (dead code que confunde); qa.mjs solo valida 1440×810 (no 1920×1080, el canvas maestro declarado); el contact sheet existente no lo genera ningún script (irreproducible).

## 3. Hallazgos clasificados

### P0 — rompe el deck o el gate
- **P0-1** Overflow horizontal 8 px en `cover` a 1440×810. Causa: `.cover-scene` usa `minmax(420px, 0.9fr)` + `.signal-core` `min(39vw, 520px)` + gaps; la suma supera el ancho útil. El QA falla y bloquea todo el pipeline.

### P1 — debilita tesis, credibilidad o comprensión
- **P1-1** Repetición de composición radial (loop 04, visión 06, orquestación 10, métricas 13): mismo círculo central + 4–6 tarjetas satélite. La audiencia deja de leer novedad; el prompt maestro lo prohíbe explícitamente ("evitar repetición de cards", "siluetas variadas").
- **P1-2** La demo no demuestra: en `camera-lab` la cámara nunca produce un evento estructurado (el claim "la cámara no es el producto, el producto es el evento" queda sin evidencia visual); en `incident` los pasos se encienden pero no se ve el payload del evento, ni la consulta de contexto, ni la evidencia final registrada. Es una lista animada, no un sistema.
- **P1-3** Tags de fuentes (S1, S2…) visibles ante la audiencia en cada escena y en el footer. Son notas de producción; deben vivir en las notas del presentador y el manifiesto, no en el escenario.
- **P1-4** Venn (escena 14): solapamiento real de copy — la tarjeta central cubre las palabras de los dos conjuntos. Además "calidad" se corta ("calida"). Ilegible a distancia.
- **P1-5** Cierre (escena 15): jerarquía rota — logo pegado al eyebrow, `<br/>` forzados que producen viudas ("obra" sola en su línea), caja naranja con ~50 % de aire muerto encima del texto. El momento de mayor impacto es el más flojo.
- **P1-6** Métricas (escena 13): el rombo decorativo cruza el layout como tachones diagonales detrás de las tarjetas; ruido sin significado operativo.
- **P1-7** No existen Remotion, clips, media, posters ni renders: los entregables 9–16 del mandato no tienen base técnica alguna.
- **P1-8** El motion no explica causalidad: todas las escenas entran con el mismo stagger vertical; las órbitas y pulsos son loops infinitos ("nada debe flotar eternamente"). No hay motion-match señal→evento, ni light sweep de activación, ni cambio de estado visible.

### P2 — reduce calidad visual, ritmo o mantenibilidad
- **P2-1** `agent-stack aside` (escena 05): ~50 % de vacío entre "PRINCIPIO" y el texto; el aside parece un error de render.
- **P2-2** `threshold` (escena 03): dos tarjetas con enorme vacío superior; centro con "CRUZA EL UMBRAL" que no se percibe como umbral (solo texto pequeño).
- **P2-3** Tags S1 en `incident` quedan parcialmente cubiertos por el panel (z-index) — se resuelve solo al aplicar P1-3.
- **P2-4** Doble numeración: eyebrow "01 · LA FRACTURA" vs contador "02/15". Ambiguo para el presentador y para la audiencia.
- **P2-5** `slides.tsx` monolito (670 líneas, contenido + layout + interacción mezclados); `ThreeQuestions` es dead code; `verify.mjs` hardcodea 15.
- **P2-6** QA no cubre 1920×1080 (canvas maestro), ni estados temporales, ni cámara denegada, ni offline real; el contact sheet no es reproducible.
- **P2-7** Tipografía display Space Grotesk: la marca define Plus Jakarta Sans (principal) y Ruberoid (display). Ruberoid no está disponible como webfont del repo; Space Grotesk actúa como sustituto no documentado. Debe documentarse la decisión (o sustituirse) — no romper offline por una fuente.

### P3 — refinamiento
- **P3-1** Paleta funcional incompleta: existe un solo acento (azul 250) + CTA naranja; el mandato pide roles semánticos signal/perception/decision/evidence/risk.
- **P3-2** El título del deck en el header ("AGENTES IA × VISIÓN COMPUTACIONAL") compite con el eyebrow de cada escena.
- **P3-3** Focus ring correcto pero botones del footer pequeños para uso táctil en escenario (44 px, aceptable pero mejorable).

## 4. Evaluación por escena y decisión

| # | id | Afirmación | Tensión | Claridad 5 s | Originalidad | Problema principal | Decisión |
|---|----|-----------|---------|--------------|--------------|--------------------|----------|
| 01 | cover | ✔ tesis | media | ✔ | media | overflow (P0-1); visual orbital genérico-tech | **Reconstruir** (cold open cinematográfico + fix) |
| 02 | signals | ✔ | alta | ✔ | alta | la "fractura" (rayas rojas) se lee débil | **Conservar y elevar** |
| 03 | threshold | ✔ | media | ✔ | media | vacío interno; umbral sin fuerza visual | **Reescribir composición** |
| 04 | loop | ✔ | media | ✔ | media | radial #1; sin estados vivos | **Reconstruir** (loop con trazas y estados; base del clip 3) |
| 05 | agent-anatomy | ✔ | baja | ✔ | media | aside vacío (P2-1) | **Conservar y corregir** |
| 06 | vision-vocabulary | ✔ | baja | ✔ | baja | radial #2; las 4 operaciones no se ven sobre una imagen | **Reconstruir** (las 4 preguntas sobre el mismo frame de obra) |
| 07 | edge-pipeline | ✔ | media | ✔ | media | única fila secuencial; le falta el payload del evento | **Conservar y elevar** |
| 08 | camera-lab | ✔ | alta | ✔ | alta | no produce evento visible (P1-2) | **Elevar** (emitir evento estructurado en vivo) |
| 09 | incident | ✔ | alta | ✔ | alta | pasos sin datos; sin evidencia final | **Reconstruir** (demo central con payload y cierre; base del clip 3) |
| 10 | multiagent | ✔ | baja | ✔ | baja | radial #3, indistinguible de 04/06/13 | **Reescribir** (formación de especialistas con contratos de salida) |
| 11 | human-gate | ✔ | media | ✔ | media | composición correcta, refuerzo menor | **Conservar y pulir** |
| 12 | pilot | ✔ | media | ✔ | media | 3-cards estándar; funciona | **Conservar y pulir** |
| 13 | metrics | ✔ | media | ✔ | baja | radial #4 + diagonales decorativas (P1-6) | **Reconstruir** (métricas como panel de decisión) |
| 14 | aec-advantage | ✔ | media | ✖ (solape) | baja | Venn roto (P1-4) | **Reescribir composición** |
| 15 | closing | ✔ | alta | ✔ | media | jerarquía rota (P1-5) | **Reconstruir** (cierre convergente; base del clip 4) |

Ninguna escena se elimina: cada una cumple una función narrativa distinta y el arco de 15 está dentro del rango 12–18. Se reordena una transición (ver narrativa) y se reescriben todos los eyebrows para unificar la numeración (P2-4).

## 5. Contraste con fuentes (verificación de honestidad)

- El copy actual **no inventa cifras** — correcto. Los documentos S1–S4 no contienen ninguna cifra citable (verificado por lectura completa): el deck debe seguir sin números de precisión/latencia/mercado.
- Material real disponible y aún no aprovechado (S3/S4): payload de evento con `hora, cámara, zona, tipo, confianza` (PRD); alertas críticas **por WhatsApp** con evidencia (PRD); estados de salud del edge (`Online / Feed Lost / Upload Delay / Inference Error / Storage Buffering / Offline`); los 5 NO-objetivos del PRD (incluido "no identificar personas individualmente"); la regla de S1 "más autonomía = más logs + más permisos granulares + más aprobación humana"; el antipatrón "un agente que hace todo suele fallar"; la escalera de niveles 0–5. Estos datos reales harán que las escenas demostrativas dejen de ser abstractas.
- Branding (S5): paleta oficial = Deep Navy `#0E2A6B`, Primary Blue `#2165FF`, Light Blue `#4D84FF`, Ice Blue `#E9F0FF`, Deep Black `#040F20`, Slate Blue `#3B5070`, Storm Gray `#5B6C87`, Cloud White `#E7E9ED`. Tipografías: Plus Jakarta Sans (principal) y Ruberoid (display de marca). El naranja CTA actual **no pertenece a la paleta documentada**: se conserva como color operativo de "decisión/acción" (rol funcional, no de marca) y se documenta como tal. Ruberoid no existe como asset del repo → Space Grotesk queda declarada como sustituto de display para material de escenario (decisión documentada, P2-7).

## 6. Qué se arregla ahora vs. qué se posterga

**Ahora (esta iteración):** P0-1; todos los P1; P2-1…P2-6; P3-1; P3-2. Incluye la reconstrucción de escenas, la capa Remotion (validación con 4 escenas → extensión), los 4 clips conceptuales, media manifest, QA ampliado (1920×1080 + 1440×810 + temporal vía Remotion stills + contact sheet reproducible) y renders MP4.

**Se posterga (documentado en "siguiente iteración"):** footage real de obra (no existe material verificable en las carpetas permitidas → los clips se declaran "representación conceptual"); diseño sonoro (opcional, requiere decisión de derechos); speaker view en segunda ventana (el modo notas actual cubre el ensayo); incorporación de Ruberoid si la marca entrega el archivo de fuente licenciado.

## 7. Plan de implementación aprobado por estos criterios

1. **Contenido como contrato** (`src/content/`): SceneContract con claim, rol narrativo, evidencia (fuentes), intención del presentador, transiciones, duración en frames y frame estable por escena. Notas del presentador ampliadas (intención/apertura/explicación/transición/advertencia/cue de demo).
2. **Escenas** (`src/scenes/`): un archivo por escena; siluetas diferenciadas por acto (ver narrative.md).
3. **Motion** (`src/motion/`): tokens temporales compartidos + primitives que renderizan igual en CSS (interactivo) y Remotion (determinista).
4. **Remotion** (`src/remotion/`): Root + KeynoteFull + 4 clips; validación primero con portada/loop/cámara-evento/cierre.
5. **QA** (`scripts/`): verify data-driven (lee el contrato), qa a 2 resoluciones + móvil + cámara denegada + reduced motion + axe + contact sheet generado + captura temporal determinista vía Remotion stills.
6. **Media** (`public/media/`): manifest con procedencia; posters generados desde las composiciones; clips MP4 renderizados localmente.

Este documento se complementa con `docs/narrative.md` (arco final) y el reporte de cierre.
