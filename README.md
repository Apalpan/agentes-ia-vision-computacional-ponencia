# Sistemas Agentic + AI First · GEN+

Keynote interactiva 16:9 (HTML offline) + máster temporal Remotion para una ponencia GEN+ dirigida a profesionales y directivos AEC.

**LIVE:** https://apalpan.github.io/agentes-ia-vision-computacional-ponencia/

Publicación: `main` conserva el producto y `gh-pages` sirve el build estático generado desde `dist/`.

## Tesis

> **La ventaja no es usar IA. Es entender bien el problema.**

El arco se organiza en tres actos:

1. Problema y oportunidad.
2. Sistemas agentic.
3. AI First.

## Ejecutar

```powershell
npm install
npm run dev        # deck interactivo en http://127.0.0.1:5173
npm run studio     # Remotion Studio
```

## Controles en vivo

- `←` / `→` / `Space` · `PageUp` / `PageDown`: navegar. `Home` / `End`: extremos.
- `O`: overview · `N`: notas del presentador · `F`: fullscreen · `R`: reiniciar escena · `Esc`: cerrar.
- Swipe horizontal en táctil. URL directa: `/?slide=14`.
- Existe un solo film visible en el arco: intro GEN+ en la escena 2. Autoplay muted, pausa, fullscreen, poster y fallback para reduced-motion.

## Arquitectura

```text
src/
  content/    contrato de 20 escenas + timing.json
  scenes/     AiFirstKeynote.tsx + biblioteca técnica complementaria
  components/ SceneFrame, CinematicInterlude, assetUrl
  motion/     MotionContext/Reveal: CSS interactivo ↔ Remotion determinista
  deck/       navegación, overview y notas
  remotion/   KeynoteFull + biblioteca de 13 clips conceptuales
  styles/     tokens GEN+ + sistema AI First
public/
  assets/     logos GEN+
  media/      MP4, posters y media-manifest.json
scripts/      verify, QA visual, QA temporal y render de media
qa/           capturas, contact sheet y 100 estados temporales
outputs/      keynote-full.mp4
```

## Render (1920×1080 @ 30 fps)

```powershell
npm run render:deck      # outputs/keynote-full.mp4
node scripts/render-media.mjs opening  # film GEN+ + poster
npm run render:clips     # biblioteca completa de clips complementarios
```

El deck web y el MP4 usan las mismas escenas. El máster actual contiene 4,942 fotogramas, 30 fps y 164.73 s.

## Validar

```powershell
npm run check        # typecheck + build + verify + QA visual/a11y
npm run qa:temporal  # 20 escenas × 5 estados temporales
```

El gate exige:

- 20 escenas y exactamente un film en el arco principal;
- notas completas y manifiestos con procedencia;
- dos resoluciones de escritorio, móvil 390, teclado y overlays;
- autoplay/fallback, reduced motion, axe y cero overflow;
- patrones Agent Mode, Team of Experts y primer loop presentes;
- 100 fotogramas temporales no vacíos.

## Honestidad de contenido

- Fuentes: `public/source-manifest.json` (vault, investigación primaria y páginas oficiales).
- Las cifras de mercado, productividad, adopción, inversión y benchmarks están fechadas y enlazadas a su fuente.
- “Internal-first” se presenta como principio operativo GEN+, no como estadística universal.
- La escena final usa un corte interno verificable de 68 proyectos registrados; no inventa clientes, logos ni resultados.
- El film GEN+ es motion graphics conceptual generado localmente con Remotion; no simula footage ni despliegues reales.
- Ruberoid no está licenciado como asset del repo; Space Grotesk se usa como display y Plus Jakarta Sans como texto.

## Límites

`D:\AP\AP_Knowledge_OS` se consulta como fuente. El repo no publica ni hace push sin autorización explícita.
