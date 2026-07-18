import { CinematicInterlude } from '../components/CinematicInterlude'
import { SceneFrame } from '../components/SceneFrame'
import { assetUrl } from '../components/assetUrl'
import { Reveal } from '../motion/MotionContext'

const CHANNELS = ['WhatsApp', 'Excel', 'PDFs', 'Planos', 'Modelos BIM', 'Correos', 'Fotos de obra', 'Reuniones']

// ── 01 · Título ──────────────────────────────────────────────────────────────
export function AiFirstCover() {
  return (
    <section className="ai-first-cover">
      <div className="cover-axis" aria-hidden="true"><i /><i /><i /></div>
      <div className="ai-first-cover-copy">
        <Reveal order={0} as="p" className="eyebrow">AI CONSTRUCTION · GEN+ · IMPLEMENTACIÓN</Reveal>
        <Reveal order={1} as="h1">
          AI First, sistemas <em>multiagentes</em><br />y visión computacional.
        </Reveal>
        <Reveal order={2} className="cover-domain">
          <span>APLICADA A LA CONSTRUCCIÓN</span>
        </Reveal>
        <Reveal order={3} as="p" className="cover-subtitle">
          De procesos dispersos a operaciones inteligentes en el sector AEC.
        </Reveal>
        <Reveal order={4} className="cover-contract">
          <span>PROBLEMA</span><i /><span>OPORTUNIDAD</span><i /><span>AI FIRST</span>
        </Reveal>
      </div>
      <div className="cover-seal" aria-hidden="true"><span>AI</span><small>FIRST</small></div>
    </section>
  )
}

// ── Interludio cinematográfico GEN+ ─────────────────────────────────────────
export function GenIntroFilm() {
  return (
    <CinematicInterlude
      code="GEN+ / INTRO"
      title="La IA no compite con tu gente. Compite con tu desorden."
      statement="Empezamos por dentro. Diseñamos para operar."
      src="./media/clips/opening.mp4"
      poster="./media/posters/opening.png"
      accent="decision"
    />
  )
}

// ── 02 · Tres ideas clave ────────────────────────────────────────────────────
export function KeyIdeas() {
  const items = [
    ['PROBLEMA', 'Información dispersa', 'Baja productividad y decisiones que llegan tarde.'],
    ['OPORTUNIDAD', 'Automatizar conocimiento', 'La IA ya no automatiza solo tareas: automatiza criterio operativo.'],
    ['AI FIRST', 'Rediseñar procesos', 'Agentes, visión computacional y flujos pensados para operar con IA.'],
  ]
  return (
    <SceneFrame eyebrow="MAPA DE LA PONENCIA" title="Tres ideas clave. Una sola tesis.">
      <div className="agenda-triptych">
        {items.map(([kicker, title, copy], index) => (
          <Reveal order={index + 1} className={`agenda-item agenda-${index + 1}`} key={kicker}>
            <span>{`0${index + 1} · ${kicker}`}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" />
          </Reveal>
        ))}
      </div>
      <Reveal order={5} as="p" className="agenda-thesis">Las herramientas cambian cada semana. El criterio para elegir el problema correcto permanece.</Reveal>
    </SceneFrame>
  )
}

// ── 03 · El problema central ─────────────────────────────────────────────────
export function InformationDispersed() {
  return (
    <SceneFrame
      eyebrow="ACTO I · EL PROBLEMA CENTRAL"
      title="La información existe, pero no actúa."
      lead="En construcción la verdad del proyecto vive repartida en ocho canales. Cada uno sabe algo; ninguno lo conoce todo."
    >
      <div className="dispersed-system">
        <div className="dispersed-sources is-eight">
          {CHANNELS.map((source, index) => <Reveal order={index + 1} className="source-node" key={source}><i>{String(index + 1).padStart(2, '0')}</i><span>{source}</span></Reveal>)}
        </div>
        <Reveal order={9} className="dispersed-break" aria-hidden="true"><i /><i /><i /></Reveal>
        <Reveal order={10} className="decision-late"><small>EL DIAGNÓSTICO</small><strong>No falta información.</strong><p>Falta inteligencia operativa: contexto conectado, un responsable claro y un sistema que cierre la decisión.</p></Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 04 · El problema en tres niveles ────────────────────────────────────────
export function TripleImpact() {
  const impacts = [
    ['01', 'Persona', 'Tareas repetitivas, reportes manuales y saturación diaria.'],
    ['02', 'Empresa', 'Procesos desconectados y dependencia de personas clave.'],
    ['03', 'Proyecto', 'Retrasos, retrabajos, sobrecostos y baja trazabilidad.'],
  ]
  return (
    <SceneFrame eyebrow="ACTO I · TRES NIVELES" title="El mismo problema golpea tres niveles.">
      <div className="impact-orbit">
        <Reveal order={1} className="impact-core"><small>CAUSA COMÚN</small><strong>Información sin sistema</strong><span>se captura, pero no cierra decisiones</span></Reveal>
        {impacts.map(([number, title, copy], index) => (
          <Reveal order={index + 2} className={`impact-card impact-${index + 1}`} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>
        ))}
      </div>
    </SceneFrame>
  )
}

// ── 05 · Gran mercado, baja productividad ───────────────────────────────────
export function MarketGap() {
  const pains = ['baja adopción tecnológica', 'planificación débil', 'control manual', 'reportes tardíos', 'decisiones reactivas']
  return (
    <SceneFrame
      eyebrow="ACTO I · LA PARADOJA"
      title="Gran mercado. Baja productividad."
      lead="La construcción mueve muchísimo capital, pero opera con fricción estructural."
    >
      <div className="market-gap">
        <Reveal order={1} className="market-stat market-scale"><small>GASTO GLOBAL EN CONSTRUCCIÓN</small><strong>US$13T</strong><p>2023</p><i>→</i><strong>US$22T</strong><p>proyección 2040</p></Reveal>
        <Reveal order={2} className="market-stat market-productivity"><small>PRODUCTIVIDAD ANUAL · 2000–2022</small><div><b>Construcción</b><strong>+0.4%</strong></div><div><b>Economía total</b><strong>+2.0%</strong></div><div><b>Manufactura</b><strong>+3.0%</strong></div></Reveal>
        <Reveal order={3} className="market-pains">{pains.map((pain) => <span key={pain}>{pain}</span>)}</Reveal>
        <Reveal order={4} className="market-conclusion"><span>La obra no falla solo por ejecución: falla por información que llega tarde.</span></Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 06 · La oportunidad actual ──────────────────────────────────────────────
export function AiOpportunity() {
  return (
    <SceneFrame eyebrow="ACTO I · LA OPORTUNIDAD" title="La IA convierte datos dispersos en decisiones accionables.">
      <div className="operating-model opportunity-flow">
        <Reveal order={1} className="operating-before"><small>ANTES</small><h3>La interpretación vive en personas saturadas.</h3><div><span>información</span><span className="flow-arrow">→</span><span>interpretación humana</span><span className="flow-arrow">→</span><span>acción tardía</span></div><p>Cada decisión depende de que alguien encuentre, entienda y escale a tiempo.</p></Reveal>
        <Reveal order={2} className="operating-shift"><span>EL SALTO</span><i>→</i></Reveal>
        <Reveal order={3} className="operating-after"><small>AHORA</small><h3>El sistema interpreta y la persona decide.</h3><div><span>información</span><span className="flow-arrow">→</span><span>IA</span><span className="flow-arrow">→</span><span>alerta</span><span className="flow-arrow">→</span><span>decisión</span><span className="flow-arrow">→</span><span>acción</span></div><p>El conocimiento operativo se automatiza; el criterio queda donde debe: en el humano.</p></Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 07 · Innovación, automatización y adaptabilidad ─────────────────────────
export function InnovationAutomationAdapt() {
  const paths = [
    ['INNOVAR', 'Crear valor nuevo', 'una nueva forma de generar valor: producto, servicio o modelo'],
    ['AUTOMATIZAR', 'Reducir lo repetitivo', 'menos tareas manuales, más consistencia y velocidad'],
    ['ADAPTAR', 'Rediseñar procesos', 'reorganizar el flujo para operar con IA desde el diseño'],
  ]
  return (
    <SceneFrame eyebrow="ACTO I · MARCO" title="Innovar crea valor. Automatizar reduce fricción. Adaptar cambia la curva.">
      <div className="redesign-triad">
        {paths.map(([label, title, copy], index) => <Reveal order={index + 1} className={`redesign-card ${index === 2 ? 'is-key' : ''}`} key={label}><span>0{index + 1}</span><small>{label}</small><h3>{title}</h3><p>{copy}</p></Reveal>)}
      </div>
      <Reveal order={5} as="p" className="redesign-rule">La IA no mejora procesos rotos: obliga a rediseñarlos.</Reveal>
    </SceneFrame>
  )
}

// ── 08 · Panorama actual de IA ──────────────────────────────────────────────
export function AiMomentum() {
  const shifts = ['modelos multimodales', 'asistentes avanzados', 'agentes con herramientas', 'copilotos de código', 'automatización no-code', 'IA en dispositivos locales']
  return (
    <SceneFrame
      eyebrow="ACTO I · PANORAMA"
      title="La IA está pasando de herramienta a infraestructura."
      lead="El capital y la adopción ya se movieron. El impacto operativo se decide en cómo se implementa."
    >
      <div className="ai-momentum">
        <Reveal order={1} className="momentum-card"><small>ADOPCIÓN EMPRESARIAL · 2025</small><strong>88%</strong><p>usa IA regularmente en al menos una función de negocio.</p></Reveal>
        <Reveal order={2} className="momentum-card"><small>OPENAI · MAR 2025</small><strong>US$40B</strong><p>nueva financiación; valoración post-money de US$300B.</p></Reveal>
        <Reveal order={3} className="momentum-card"><small>ANTHROPIC · SEP 2025</small><strong>US$13B</strong><p>Serie F; valoración post-money de US$183B.</p></Reveal>
      </div>
      <Reveal order={4} className="momentum-shifts">{shifts.map((shift) => <span key={shift}>{shift}</span>)}</Reveal>
      <Reveal order={5} as="p" className="momentum-conclusion">La inversión confirma la dirección. El rediseño del trabajo decidirá quién captura el valor.</Reveal>
    </SceneFrame>
  )
}

// ── 09 · ¿Qué cambia para el humano? ────────────────────────────────────────
export function HumanCriterion() {
  return (
    <SceneFrame eyebrow="ACTO I · EL NUEVO ROL" title="El humano no compite en velocidad. Compite en criterio.">
      <div className="human-ai-grid">
        <Reveal order={1} className="capability-field ai-field"><small>IA · VENTAJA DE ESCALA</small><h3>Velocidad, patrones y ciclos sin fatiga</h3><ul><li>clasificar y comparar</li><li>recorrer grandes volúmenes</li><li>generar variaciones</li><li>ejecutar lo repetible</li></ul><span>CAPACIDAD</span></Reveal>
        <Reveal order={2} className="human-ai-spine"><i /><b>CRITERIO PROFESIONAL</b><p>contexto + juicio + responsabilidad</p></Reveal>
        <Reveal order={3} className="capability-field human-field"><small>HUMANO · VENTAJA DE CONTEXTO</small><h3>El nuevo rol profesional</h3><ul><li>entender bien el problema</li><li>definir el contexto</li><li>validar resultados</li><li>diseñar procesos</li><li>decidir con responsabilidad</li></ul><span>CRITERIO</span></Reveal>
      </div>
      <Reveal order={5} as="p" className="benchmark-caveat">Superar un benchmark no equivale a comprender una empresa, una obra o el costo de una mala decisión.</Reveal>
    </SceneFrame>
  )
}

// ── 10 · Escalera de madurez IA ─────────────────────────────────────────────
export function MaturityLadder() {
  const rungs = [
    ['Prompt Engineering', 'instruir con precisión'],
    ['Vibe Coding', 'crear software hablando'],
    ['Asistentes IA', 'responder con contexto'],
    ['Agentes', 'ejecutar con herramientas'],
    ['Multiagentes', 'especialistas coordinados'],
    ['Loop Engineering', 'medir y mejorar el flujo'],
    ['AI First', 'procesos críticos con IA'],
    ['AI Native', 'empresa rediseñada'],
  ]
  return (
    <SceneFrame eyebrow="ACTO II · ESCALERA DE MADUREZ" title="De usar prompts a rediseñar empresas.">
      <div className="maturity-ladder">
        {rungs.map(([title, copy], index) => (
          <Reveal order={index + 1} className={`ladder-rung rung-${index + 1}`} key={title}>
            <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
          </Reveal>
        ))}
      </div>
      <Reveal order={10} as="p" className="runway-rule">Cada peldaño añade autonomía — y exige más contexto, permisos, trazabilidad y evaluación.</Reveal>
    </SceneFrame>
  )
}

// ── 11 · Prompt Engineering ─────────────────────────────────────────────────
export function PromptEngineering() {
  const fields = [
    ['ROL', 'ingeniero de planeamiento de obra'],
    ['CONTEXTO', 'hospital en ejecución · semana 32 · frente estructuras'],
    ['TAREA', 'analiza el reporte semanal y detecta desvíos'],
    ['DATOS', 'reporte.pdf · cronograma.xlsx · lookahead'],
    ['FORMATO', 'tabla de riesgos + 3 acciones priorizadas'],
    ['RESTRICCIONES', 'no inventes cifras · cita la fuente interna'],
    ['VALIDACIÓN', 'todo desvío debe referenciar partida y fecha'],
  ]
  return (
    <SceneFrame
      eyebrow="ACTO II · NIVEL 01"
      title="Prompt Engineering: no es escribir preguntas, es diseñar instrucciones."
      lead="La diferencia entre un juguete y una herramienta de trabajo está en la estructura de la instrucción."
    >
      <div className="prompt-blueprint">
        <Reveal order={1} className="blueprint-panel">
          <div className="blueprint-head"><span /><span /><span /><b>prompt.spec</b></div>
          <div className="blueprint-body">
            {fields.map(([key, value], index) => (
              <Reveal order={index + 2} className="blueprint-line" key={key}><b>{key}</b><span>{value}</span></Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal order={9} className="blueprint-note">
          <small>LA REGLA</small>
          <strong>Siete campos convierten una pregunta en una especificación.</strong>
          <p>Rol, contexto, tarea, datos, formato, restricciones y criterio de validación: si falta uno, el resultado se vuelve lotería.</p>
        </Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 12 · Vibe Coding ────────────────────────────────────────────────────────
export function VibeCoding() {
  const outputs = ['dashboards de control', 'reportes automatizados', 'APIs conectadas', 'prototipos funcionales', 'agentes propios']
  return (
    <SceneFrame
      eyebrow="ACTO II · NIVEL 02"
      title="Vibe Coding: del lenguaje natural al software funcional."
      lead="Con Codex, Claude Code y herramientas similares, programar empieza a parecerse más a dirigir sistemas que a escribir líneas."
    >
      <div className="vibe-coding">
        <Reveal order={1} className="vibe-terminal">
          <div className="blueprint-head"><span /><span /><span /><b>claude-code · codex</b></div>
          <div className="vibe-exchange">
            <p className="vibe-human">&gt; Crea un dashboard de avance semanal que lea el Excel de obra y marque en rojo las partidas con desvío mayor al plan.</p>
            <p className="vibe-machine"><i>●</i> Entendido. Generando: lector de Excel → modelo de partidas → tablero con semáforo de desvíos → despliegue local.</p>
            <p className="vibe-machine is-done"><i>✓</i> Dashboard funcional en 4 archivos. ¿Lo conecto al reporte de los lunes?</p>
          </div>
        </Reveal>
        <Reveal order={4} className="vibe-outputs">
          <small>LO QUE HOY SE CONSTRUYE ASÍ</small>
          <div>{outputs.map((output) => <span key={output}>{output}</span>)}</div>
          <p>El código sigue existiendo. Lo que cambia es quién puede dirigirlo.</p>
        </Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 13 · Qué es un agente ───────────────────────────────────────────────────
export function AgentDefinition() {
  const flow = ['objetivo', 'contexto', 'plan', 'herramientas', 'acción', 'verificación', 'entrega']
  return (
    <SceneFrame eyebrow="ACTO II · AGENTES" title="Un agente no solo responde: ejecuta.">
      <div className="agent-definition">
        <Reveal order={1} className="agent-mission">
          <small>EL ENCARGO</small>
          <blockquote>“Revisa este reporte de obra, detecta riesgos, compáralo con el cronograma y genera alertas.”</blockquote>
          <p>Eso no es una pregunta. Es un objetivo con salida verificable — y un agente puede perseguirlo.</p>
        </Reveal>
        <div className="agent-flow">
          {flow.map((step, index) => (
            <Reveal order={index + 2} className={`agent-flow-step ${index >= 4 ? 'is-action' : ''}`} key={step}>
              <span>0{index + 1}</span><b>{step}</b>{index < flow.length - 1 ? <i aria-hidden="true" /> : null}
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal order={10} as="p" className="agent-rule">Un asistente conversa contigo. Un agente trabaja para ti — con estado, herramientas y verificación.</Reveal>
    </SceneFrame>
  )
}

// ── 14 · Anatomía de un agente ──────────────────────────────────────────────
export function AgentAnatomyNine() {
  const parts = [
    ['Modelo', 'el cerebro que razona', ''],
    ['Instrucciones', 'qué debe lograr y cómo', ''],
    ['Memoria', 'qué ocurrió y qué sigue abierto', ''],
    ['Contexto', 'proyecto, normas y estado real', ''],
    ['Herramientas', 'APIs, documentos, software', ''],
    ['Permisos', 'qué puede hacer y cuándo escala', 'is-guard'],
    ['Reglas', 'límites y protocolos de operación', 'is-guard'],
    ['Verificación', 'criterios y evidencia de calidad', 'is-check'],
    ['Salida accionable', 'un resultado que cierra trabajo', 'is-check'],
  ]
  return (
    <SceneFrame
      eyebrow="ACTO II · ANATOMÍA"
      title="Un agente necesita más que un modelo."
      lead="Nueve piezas. Si falta una, no tienes un sistema confiable: tienes una demo."
    >
      <div className="anatomy-nine">
        {parts.map(([title, copy, flag], index) => (
          <Reveal order={index + 1} className={`anatomy-cell ${flag}`} key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p>
          </Reveal>
        ))}
      </div>
    </SceneFrame>
  )
}

// ── 15 · Sistemas multiagentes ──────────────────────────────────────────────
export function MultiAgentTeam() {
  const agents = [
    ['BIM', 'modelos y coordinación'],
    ['COSTOS', 'presupuesto y desvíos'],
    ['CRONOGRAMA', 'secuencia y ruta crítica'],
    ['NORMATIVO', 'reglamento y compliance'],
    ['VISIÓN', 'cámaras → eventos de obra'],
    ['DOCUMENTAL', 'planos, RFIs y actas'],
    ['REPORTES', 'síntesis y evidencia'],
  ]
  return (
    <SceneFrame eyebrow="ACTO II · MULTIAGENTES" title="Un sistema multiagente es un equipo digital coordinado.">
      <div className="grok-team aec-team">
        <Reveal order={1} className="grok-orchestrator"><span>G+</span><small>ORQUESTADOR</small><strong>Objetivo + estado</strong><p>descompone · enruta · escala al humano · sintetiza</p></Reveal>
        <div className="grok-agent-grid aec-agent-grid">
          {agents.map(([title, copy], index) => <Reveal order={index + 2} className="grok-agent" key={title}><span>0{index + 1}</span><b>{title}</b><p>{copy}</p></Reveal>)}
        </div>
        <Reveal order={10} className="grok-output"><small>SALIDA ÚNICA</small><strong>Una decisión coordinada con evidencia — no siete chats abiertos.</strong></Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 16 · Orquestación ───────────────────────────────────────────────────────
export function OrchestrationStack() {
  const capabilities = ['conectar apps', 'disparar flujos', 'llamar modelos IA', 'leer documentos', 'enviar correos', 'actualizar dashboards', 'registrar trazabilidad']
  return (
    <SceneFrame eyebrow="ACTO II · ORQUESTACIÓN" title="Los agentes necesitan sistema nervioso.">
      <div className="orchestration-stack">
        <Reveal order={1} className="stack-layer stack-models"><small>01 · MODELOS / AGENTES</small><strong>Codex · Claude Code · Grok</strong><p>razonan, investigan, construyen y revisan</p></Reveal>
        <Reveal order={2} className="stack-layer stack-flow"><small>02 · SISTEMA NERVIOSO</small><strong>n8n · AgentFlow · MCP</strong><p>conectan eventos, herramientas, permisos y responsables</p></Reveal>
        <Reveal order={3} className="stack-layer stack-context"><small>03 · CONTEXTO / SISTEMAS</small><strong>CDE · BIM · ERP · correo · datos de obra</strong><p>aportan la verdad operativa sobre la que el agente actúa</p></Reveal>
        <Reveal order={4} className="stack-side"><span>VALOR</span><i /><b>Diseño del flujo</b><i /><span>EVIDENCIA</span></Reveal>
        <Reveal order={5} className="stack-capabilities">{capabilities.map((capability) => <span key={capability}>{capability}</span>)}</Reveal>
      </div>
    </SceneFrame>
  )
}

// ── 19 · Casos GEN+ / AECODE ────────────────────────────────────────────────
export function GenPlusCases() {
  const cases = [
    ['AGENTE', 'Reuniones y acuerdos', 'actas, compromisos y seguimiento automático'],
    ['AGENTE', 'BIM normativo', 'revisión de modelos contra reglamento'],
    ['AGENTE', 'Metrados', 'cuantificación asistida y trazable'],
    ['AGENTE', 'Propuestas', 'ofertas técnicas con contexto de portafolio'],
    ['AGENTE', 'Reportes de obra', 'del dato de campo al informe ejecutivo'],
    ['AGENTE', 'Cobranza', 'valorizaciones y seguimiento de pagos'],
    ['AGENTE', 'Académico', 'contenido y evaluación para formación AEC'],
    ['VISIÓN', 'VisionPRO', 'cámaras + IA: eventos con evidencia'],
    ['EDGE', 'Voz en obra', 'asistente local sin depender de internet'],
  ]
  return (
    <SceneFrame
      eyebrow="ACTO III · CASOS GEN+ / AECODE"
      title="Esto no es teoría: es el backlog."
      lead="Nueve sistemas en distintos grados de implementación interna antes de ofrecerse como servicio."
    >
      <div className="cases-grid">
        {cases.map(([tag, title, copy], index) => (
          <Reveal order={index + 1} className={`case-card tag-${tag.toLowerCase()}`} key={title}>
            <small>{tag}</small><h3>{title}</h3><p>{copy}</p>
          </Reveal>
        ))}
      </div>
    </SceneFrame>
  )
}

// ── 20 · Cierre: AI First → AI Native ───────────────────────────────────────
export function ClosingAiNative() {
  return (
    <section className="proof-closing">
      <div className="proof-data">
        <Reveal order={0} as="p" className="eyebrow">EL DESTINO DEL VIAJE</Reveal>
        <Reveal order={1} className="native-pair">
          <div className="native-step"><small>AI FIRST</small><p>usar IA en los procesos críticos del negocio</p></div>
          <i aria-hidden="true" />
          <div className="native-step is-native"><small>AI NATIVE</small><p>rediseñar la empresa para operar con datos, agentes y automatización desde el núcleo</p></div>
        </Reveal>
        <Reveal order={2} className="proof-number"><strong>68</strong><span>proyectos registrados GEN+</span></Reveal>
        <Reveal order={3} as="p" className="proof-source">Corte interno de portafolio · 28 may 2026 · siete líneas de servicio</Reveal>
      </div>
      <div className="closing-question">
        <Reveal order={1} as="small">LA FRASE FINAL</Reveal>
        <Reveal order={2} as="h2">La ventaja no será usar IA.</Reveal>
        <Reveal order={3} as="p">Será entender mejor el problema — y convertirlo en un sistema inteligente.</Reveal>
        <Reveal order={4} className="closing-formula"><b>1 problema</b><i /> <b>1 dueño</b><i /> <b>1 métrica</b></Reveal>
        <Reveal order={5} className="closing-brand"><img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" /><span>AI CONSTRUCTION · OPERACIÓN · EVIDENCIA</span></Reveal>
      </div>
    </section>
  )
}
