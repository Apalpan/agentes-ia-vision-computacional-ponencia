# Agentes IA + Visión Computacional

Presentación HTML 16:9 para una ponencia GEN+ sobre agentes IA, visión computacional y el cierre del loop operativo en construcción.

## Promesa

La audiencia debe comprender que detectar objetos no es suficiente: el valor aparece cuando una señal visual activa un agente, una decisión humana y una evidencia trazable.

## Ejecutar

```powershell
npm install
npm run dev
```

Abrir `http://127.0.0.1:5173`.

## Controles

- `←` / `→` o `Space`: navegar.
- `Home` / `End`: primera o última escena.
- `O`: overview.
- `N`: notas y cronómetro.
- `F`: fullscreen.
- `Esc`: cerrar overlays.
- Swipe horizontal: navegación táctil.

## Validar

```powershell
npm run check
```

El control ejecuta typecheck, build, verificación de contenido, screenshots por escena y auditoría automatizada de accesibilidad/layout con Chrome local.

## Alcance de esta versión

- 15 escenas.
- Navegación, overview y modo presentador.
- Demo opcional de cámara, sin reconocimiento biométrico.
- Simulación explícita de un evento de seguridad.
- HTML offline después del build.
- Sin publicación ni escritura en el vault.

## Iterar con Claude Code

El prompt maestro para auditar e implementar mejoras profundas de storytelling, UX/UI, Remotion y clips está en `docs/CLAUDE_CODE_MASTER_PROMPT.md`.

Abrir Claude Code en `D:\AP` y pegar el bloque comprendido entre `INICIO DEL PROMPT` y `FIN DEL PROMPT`.

## Fuente de verdad

Las fuentes consultadas están registradas en `public/source-manifest.json`. No se usan cifras comerciales o de precisión no verificadas.
