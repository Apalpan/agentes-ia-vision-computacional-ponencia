# Agentes IA + Visión Computacional · GEN+

Keynote interactiva 16:9 (HTML offline) + motor temporal Remotion (MP4 y clips) para la ponencia GEN+ sobre agentes IA, visión computacional y el loop operativo de decisiones en construcción.

**LIVE:** https://apalpan.github.io/agentes-ia-vision-computacional-ponencia/
Deploy: `npm run build` → push de `dist/` a la rama `gh-pages` (la rama `main` lleva el código).

## Tesis

> **Cuando la obra puede ver, el agente puede actuar.**
> Cierre: *No necesitamos una obra llena de IA. Necesitamos una obra que vea, decida y aprenda.*

## Ejecutar

```powershell
npm install
npm run dev        # deck interactivo en http://127.0.0.1:5173
npm run studio     # Remotion Studio (timeline de la keynote y los clips)
```

## Controles en vivo

- `←` / `→` / `Space` · `PageUp` / `PageDown`: navegar. `Home` / `End`: extremos.
- `O`: overview · `N`: notas del presentador (intención/apertura/explicación/transición/advertencia/cue + cronómetro) · `F`: fullscreen · `R`: reiniciar escena · `Esc`: cerrar.
- Swipe horizontal en táctil. URL directa: `/?slide=9`.
- Botones `▶ Clip` (portada, demo de cámara, incidente, cierre): clips conceptuales locales, silenciados, con poster y fallback; nunca bloquean la navegación.
- Cámara (escena 08): local y opcional, sin biometría; con permiso denegado la escena continúa en modo conceptual.

## Arquitectura

```text
src/
  content/    contrato de escenas (claim, rol narrativo, evidencia, notas, timing.json)
  scenes/     15 escenas (una por archivo, silueta visual propia)
  components/ SceneFrame, ClipPlayer, assetUrl
  motion/     tokens temporales + MotionContext/Reveal (CSS interactivo ↔ Remotion determinista)
  deck/       shell interactivo (navegación, overlays, notas)
  remotion/   Root, SceneRender, KeynoteFull y 10 clips conceptuales
  styles/     tokens OKLCH GEN+ (semánticos: signal/perception/decision/evidence/risk), base, deck, escenas
public/
  assets/     logos GEN+
  media/      clips MP4 + posters + media-manifest.json (procedencia)
scripts/      verify, qa (Playwright+axe+contact sheet), qa-temporal, render-media
docs/         narrative.md (arco final) · audit-ultra-premium.md (auditoría)
qa/           screenshots por resolución, temporal, contact-sheet.png, qa-report.json
outputs/      keynote-full.mp4 + clips renderizados
```

Las mismas escenas alimentan el deck HTML y el video: `MotionContext` decide si el tiempo lo lleva CSS (`@starting-style`, keyframes) o el frame de Remotion (determinista, sin reloj ni azar).

## Render (Remotion, 1920×1080 @ 30 fps)

```powershell
npm run render:deck      # outputs/keynote-full.mp4 (~2:13 min)
npm run render:clips     # 10 clips + posters → outputs/clips + public/media
npm run render:opening   # clips individuales…
npm run render:vision
npm run render:loop
npm run render:closing
```

Usa el Chrome/Edge local (ver `remotion.config.ts`); no descarga navegadores. Render reproducible: sin `Date.now()`, sin aleatorios, audio desactivado.

## Validar (gate)

```powershell
npm run check        # typecheck + build + verify + qa
npm run qa:temporal  # estados 0/25/50/75/100 % por escena desde keynote-full.mp4
```

`verify` valida el contrato (12–18 escenas, notas completas, manifiestos con procedencia, copy esencial). `qa` recorre las 15 escenas a 1920×1080 y 1440×810 con Chrome local: overflow, consola, axe (serio/crítico), teclado, overlays, demo de eventos, cámara denegada, incidente completo, móvil 390, reduced motion y regenera `qa/contact-sheet.png`.

## Honestidad de contenido

- Las fuentes viven en `public/source-manifest.json`; los tags no se muestran al público (están en las notas del presentador).
- Ninguna cifra de precisión/latencia/mercado: las fuentes del vault no las sostienen. Donde haría falta un número se dice explícitamente que se calibra en el piloto (`Requiere validación`).
- No existe footage real verificable en las carpetas autorizadas: los 10 clips son motion graphics **declarados como representación conceptual** en pantalla y en `public/media/media-manifest.json`.
- Demos de cámara e incidente: conceptuales, locales, sin biometría, sin modelo validado.
- Tipografía display: la marca define Plus Jakarta Sans + Ruberoid; Ruberoid no está disponible como asset licenciado en el repo, se usa Space Grotesk como sustituto de escenario (documentado).

## Vault

`D:\AP\AP_Knowledge_OS` es fuente de solo lectura. Este repo no escribe, publica ni hace push.
