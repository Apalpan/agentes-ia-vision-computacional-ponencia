import { CinematicInterlude } from '../components/CinematicInterlude'
import { SceneFrame } from '../components/SceneFrame'
import { assetUrl } from '../components/assetUrl'
import { Reveal } from '../motion/MotionContext'

const sources = ['WhatsApp', 'Excel', 'PDF', 'Correo', 'BIM / CDE', 'Reuniones']
const conceptRail = [
  ['IA', 'comprende y genera'],
  ['Prompt', 'da una instrucción'],
  ['Asistente', 'responde contigo'],
  ['Agente', 'actúa con herramientas'],
  ['Multiagente', 'coordina especialistas'],
  ['Loop', 'mide y mejora'],
] as const

export function AiFirstCover() {
  return (
    <section className="ai-first-cover">
      <div className="cover-axis" aria-hidden="true"><i /><i /><i /></div>
      <div className="ai-first-cover-copy">
        <Reveal order={0} as="p" className="eyebrow">AI CONSTRUCTION · GEN+</Reveal>
        <Reveal order={1} as="h1">
          La ventaja no es <em>usar IA.</em><br />
          Es entender bien el problema.
        </Reveal>
        <Reveal order={2} as="p" className="cover-subtitle">
          De información dispersa a sistemas agentic y una operación AI First.
        </Reveal>
        <Reveal order={3} className="cover-contract">
          <span>PROBLEMA</span><i /><span>SISTEMA</span><i /><span>EVIDENCIA</span>
        </Reveal>
      </div>
      <div className="cover-seal" aria-hidden="true"><span>AI</span><small>FIRST</small></div>
    </section>
  )
}

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

export function Agenda() {
  const items = [
    ['01', 'Problema + oportunidad', 'Por qué un mercado enorme sigue operando con información fragmentada.'],
    ['02', 'Sistemas agentic', 'Cómo pasamos del prompt a agentes que perciben, usan herramientas y actúan.'],
    ['03', 'AI First', 'Cómo rediseñar un flujo real antes de escalar la tecnología.'],
  ]
  return (
    <SceneFrame eyebrow="MAPA DE LA PONENCIA" title="Tres ideas. Una sola tesis.">
      <div className="agenda-triptych">
        {items.map(([number, title, copy], index) => (
          <Reveal order={index + 1} className={`agenda-item agenda-${index + 1}`} key={number}>
            <span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" />
          </Reveal>
        ))}
      </div>
      <Reveal order={5} as="p" className="agenda-thesis">La tecnología cambia cada semana. El criterio para elegir el problema correcto permanece.</Reveal>
    </SceneFrame>
  )
}

export function MarketGap() {
  return (
    <SceneFrame
      eyebrow="ACTO I · PROBLEMA"
      title="La construcción crece. Su productividad no al mismo ritmo."
      lead="El mercado es gigantesco; la brecha operativa también."
    >
      <div className="market-gap">
        <Reveal order={1} className="market-stat market-scale"><small>GASTO GLOBAL EN CONSTRUCCIÓN</small><strong>US$13T</strong><p>2023</p><i>→</i><strong>US$22T</strong><p>proyección 2040</p></Reveal>
        <Reveal order={2} className="market-stat market-productivity"><small>PRODUCTIVIDAD ANUAL · 2000–2022</small><div><b>Construcción</b><strong>+0.4%</strong></div><div><b>Economía total</b><strong>+2.0%</strong></div><div><b>Manufactura</b><strong>+3.0%</strong></div></Reveal>
        <Reveal order={4} className="market-conclusion"><span>GRAN MERCADO</span><i /><span>BAJA PRODUCTIVIDAD</span><i /><span>SOBRECOSTO RECURRENTE</span></Reveal>
      </div>
    </SceneFrame>
  )
}

export function TripleImpact() {
  const impacts = [
    ['01', 'Profesional', 'Busca datos, recompone contexto y responde tarde.'],
    ['02', 'Empresa', 'Duplica trabajo, pierde trazabilidad y escala el caos.'],
    ['03', 'Proyecto', 'Decide con información incompleta y corrige en campo.'],
  ]
  return (
    <SceneFrame eyebrow="ACTO I · IMPACTO" title="El mismo problema golpea tres niveles.">
      <div className="impact-orbit">
        <Reveal order={1} className="impact-core"><small>CAUSA COMÚN</small><strong>Información sin sistema</strong><span>se captura, pero no cierra decisiones</span></Reveal>
        {impacts.map(([number, title, copy], index) => (
          <Reveal order={index + 2} className={`impact-card impact-${index + 1}`} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>
        ))}
      </div>
    </SceneFrame>
  )
}

export function InformationDispersed() {
  return (
    <SceneFrame
      eyebrow="ACTO I · FRAGMENTACIÓN"
      title="La información existe. El sistema que la convierte en acción, no."
      lead="Cada canal conserva una parte de la verdad del proyecto."
    >
      <div className="dispersed-system">
        <div className="dispersed-sources">
          {sources.map((source, index) => <Reveal order={index + 1} className="source-node" key={source}><i>{String(index + 1).padStart(2, '0')}</i><span>{source}</span></Reveal>)}
        </div>
        <Reveal order={8} className="dispersed-break" aria-hidden="true"><i /><i /><i /></Reveal>
        <Reveal order={9} className="decision-late"><small>DECISIÓN</small><strong>Llega tarde.</strong><p>No falta información. Falta contexto conectado, un responsable y un loop que cierre.</p></Reveal>
      </div>
    </SceneFrame>
  )
}

export function AiMomentum() {
  return (
    <SceneFrame
      eyebrow="ACTO I · OPORTUNIDAD"
      title="El capital y la adopción ya se movieron. El impacto operativo todavía no."
      lead="La oportunidad no está en probar otra app; está en transformar adopción en un flujo que produzca valor."
    >
      <div className="ai-momentum">
        <Reveal order={1} className="momentum-card"><small>ADOPCIÓN EMPRESARIAL · 2025</small><strong>88%</strong><p>usa IA regularmente en al menos una función de negocio.</p></Reveal>
        <Reveal order={2} className="momentum-card"><small>OPENAI · MAR 2025</small><strong>US$40B</strong><p>nueva financiación; valoración post-money de US$300B.</p></Reveal>
        <Reveal order={3} className="momentum-card"><small>ANTHROPIC · SEP 2025</small><strong>US$13B</strong><p>Serie F; valoración post-money de US$183B.</p></Reveal>
      </div>
      <Reveal order={5} as="p" className="momentum-conclusion">La inversión confirma la dirección. El rediseño del trabajo decidirá quién captura el valor.</Reveal>
    </SceneFrame>
  )
}

export function InnovationAutomationRedesign() {
  const paths = [
    ['INNOVAR', 'Crear valor nuevo', 'un producto, servicio o forma distinta de resolver'],
    ['AUTOMATIZAR', 'Reducir fricción', 'hacer más rápido y consistente lo que ya existe'],
    ['REDISEÑAR', 'Cambiar el sistema', 'repartir de nuevo tareas, datos, juicio y responsabilidad'],
  ]
  return (
    <SceneFrame eyebrow="ACTO I · MARCO" title="Innovar crea valor. Automatizar reduce fricción. Rediseñar cambia la curva.">
      <div className="redesign-triad">
        {paths.map(([label, title, copy], index) => <Reveal order={index + 1} className={`redesign-card ${index === 2 ? 'is-key' : ''}`} key={label}><span>0{index + 1}</span><small>{label}</small><h3>{title}</h3><p>{copy}</p></Reveal>)}
      </div>
      <Reveal order={5} as="p" className="redesign-rule">AI First no añade IA al flujo anterior. Diseña el flujo asumiendo inteligencia, herramientas y control humano desde el inicio.</Reveal>
    </SceneFrame>
  )
}

export function HumanAndAi() {
  return (
    <SceneFrame eyebrow="ACTO I · IA + HUMANO" title="La IA ya gana pruebas. El humano debe elegir qué problema merece resolver.">
      <div className="human-ai-grid">
        <Reveal order={1} className="capability-field ai-field"><small>IA · VENTAJA DE ESCALA</small><h3>Patrones, velocidad y benchmarks cerrados</h3><ul><li>clasificar y comparar</li><li>recorrer grandes volúmenes</li><li>generar y ejecutar variaciones</li><li>mantener ciclos sin fatiga</li></ul><span>CAPACIDAD</span></Reveal>
        <Reveal order={2} className="human-ai-spine"><i /><b>PROBLEMA BIEN ENTENDIDO</b><p>contexto + criterio + responsabilidad</p></Reveal>
        <Reveal order={3} className="capability-field human-field"><small>HUMANO · VENTAJA DE CONTEXTO</small><h3>Propósito, trade-offs y consecuencias reales</h3><ul><li>definir qué importa</li><li>leer cultura y restricciones</li><li>decidir bajo ambigüedad</li><li>asumir responsabilidad</li></ul><span>CRITERIO</span></Reveal>
      </div>
      <Reveal order={5} as="p" className="benchmark-caveat">Superar un benchmark no equivale a comprender una empresa, una obra o el costo de una mala decisión.</Reveal>
    </SceneFrame>
  )
}

export function ProblemFocus() {
  return (
    <SceneFrame eyebrow="KEY TAKEAWAY · ACTO I" title="El profesional valioso no memorizará herramientas. Entenderá mejor el problema.">
      <div className="problem-focus">
        <Reveal order={1} className="focus-noise"><small>SE VUELVE COMMODITY</small><div><span>prompts</span><span>modelos</span><span>apps</span><span>interfaces</span><span>tutoriales</span></div><p>Todo cambia. Todo se copia.</p></Reveal>
        <Reveal order={2} className="focus-signal"><small>CREA VENTAJA</small><strong>Entender bien el problema.</strong><p>Quién sufre · dónde se rompe el flujo · qué decisión importa · qué evidencia demuestra valor.</p></Reveal>
      </div>
      <Reveal order={4} as="blockquote" className="focus-quote">Cuando todos pueden crear herramientas, la ventaja vuelve al criterio.</Reveal>
    </SceneFrame>
  )
}

export function InternalFirst() {
  const stages = [
    ['01', 'Ordenar', 'hacer visible el proceso, el dueño y el dato'],
    ['02', 'Operar', 'usar IA dentro del trabajo real, con límites'],
    ['03', 'Escalar', 'convertir evidencia interna en una oferta repetible'],
  ]
  return (
    <SceneFrame eyebrow="PUENTE · GEN+" title="Si no funciona dentro de tu empresa, todavía no es una oferta.">
      <div className="internal-first">
        <Reveal order={1} className="internal-hub"><small>GEN+ · INTERNAL FIRST</small><strong>Implementar → medir → productizar</strong><p>No vendemos IA en abstracto. Diseñamos reducción de tiempo, error, riesgo y falta de trazabilidad.</p></Reveal>
        <div className="internal-stages">
          {stages.map(([number, title, copy], index) => <Reveal order={index + 2} className="internal-stage" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </div>
    </SceneFrame>
  )
}

export function ConceptRunway() {
  return (
    <SceneFrame eyebrow="ACTO II · RECORRIDO FLASH" title="De generar respuestas a cerrar trabajo.">
      <div className="concept-runway">
        {conceptRail.map(([title, copy], index) => (
          <Reveal order={index + 1} className={`concept-stop concept-${index + 1}`} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>{index < conceptRail.length - 1 ? <i aria-hidden="true" /> : null}</Reveal>
        ))}
      </div>
      <Reveal order={8} as="p" className="runway-rule">Cada nivel añade autonomía. También exige más contexto, permisos, trazabilidad y evaluación.</Reveal>
    </SceneFrame>
  )
}

export function AgentAnalogy() {
  const parts = [
    ['Encargo', 'objetivo'], ['Planos', 'contexto'], ['Cuadrilla', 'herramientas'],
    ['Bitácora', 'memoria'], ['ITP / QA', 'verificación'], ['Permiso de trabajo', 'guardrails'],
  ]
  return (
    <SceneFrame eyebrow="ACTO II · ANATOMÍA" title="Un agente se parece más a una brigada con encargo que a un chat inteligente.">
      <div className="agent-analogy">
        <Reveal order={1} className="agent-worker"><div className="worker-mark">A</div><small>AGENTE</small><strong>Objetivo claro</strong><p>observa · decide · usa herramientas · reporta evidencia</p></Reveal>
        <div className="agent-parts">
          {parts.map(([aec, system], index) => <Reveal order={index + 2} className="agent-part" key={aec}><span>{aec}</span><i>→</i><b>{system}</b></Reveal>)}
        </div>
      </div>
      <Reveal order={9} as="p" className="agent-rule">Sin objetivo, contexto, verificación y permisos no tienes un agente confiable. Tienes improvisación automatizada.</Reveal>
    </SceneFrame>
  )
}

export function ChatGptAgentMode() {
  return (
    <SceneFrame eyebrow="ACTO II · YA EXISTE" title="El modo agente ya movió la interfaz: de conversar a ejecutar con supervisión.">
      <Reveal order={1} className="agent-mode-window">
        <div className="agent-mode-top"><span className="openai-glyph">◉</span><b>ChatGPT</b><i>Modo agente</i><small>● En control del usuario</small></div>
        <div className="agent-mode-task"><p>Analiza tres alternativas, contrasta fuentes y crea una presentación ejecutiva.</p><button type="button" tabIndex={-1}>Ejecutar tarea</button></div>
        <div className="agent-mode-timeline">
          <div className="is-done"><span>01</span><b>Planifica</b><p>descompone el objetivo</p></div>
          <div className="is-done"><span>02</span><b>Investiga</b><p>usa navegador y fuentes</p></div>
          <div className="is-active"><span>03</span><b>Actúa</b><p>crea el entregable</p></div>
          <div><span>04</span><b>Pide control</b><p>antes de acciones sensibles</p></div>
        </div>
      </Reveal>
      <Reveal order={4} as="p" className="agent-mode-note">Representación conceptual basada en el producto oficial ChatGPT agent. La diferencia clave es el ciclo razonamiento → acción → checkpoint humano.</Reveal>
    </SceneFrame>
  )
}

export function GrokExpertTeam() {
  const agents = [['EXPLORA', 'busca contexto'], ['DISEÑA', 'propone opciones'], ['CONSTRUYE', 'produce activos'], ['REVISA', 'critica y valida']]
  return (
    <SceneFrame eyebrow="ACTO II · TEAM OF EXPERTS" title="Grok Build demuestra el patrón: dividir trabajo complejo entre subagentes especializados.">
      <div className="grok-team">
        <Reveal order={1} className="grok-orchestrator"><span>𝕏</span><small>GROK BUILD</small><strong>Orquestador</strong><p>descompone · enruta · sintetiza</p></Reveal>
        <div className="grok-agent-grid">
          {agents.map(([title, copy], index) => <Reveal order={index + 2} className="grok-agent" key={title}><span>0{index + 1}</span><b>{title}</b><p>{copy}</p></Reveal>)}
        </div>
        <Reveal order={7} className="grok-output"><small>SALIDA ÚNICA</small><strong>Una respuesta integrada, no cuatro voces sueltas.</strong></Reveal>
      </div>
    </SceneFrame>
  )
}

export function OrchestrationStack() {
  return (
    <SceneFrame eyebrow="ACTO II · ORQUESTACIÓN" title="El stack no es una religión. Cada capa cumple un trabajo.">
      <div className="orchestration-stack">
        <Reveal order={1} className="stack-layer stack-models"><small>01 · MODELOS / AGENTES</small><strong>Codex · Claude Code · Grok</strong><p>razonan, investigan, construyen y revisan</p></Reveal>
        <Reveal order={2} className="stack-layer stack-flow"><small>02 · FLUJO / ORQUESTACIÓN</small><strong>AgentFlow · n8n · MCP</strong><p>conectan eventos, herramientas, permisos y responsables</p></Reveal>
        <Reveal order={3} className="stack-layer stack-context"><small>03 · CONTEXTO / SISTEMAS</small><strong>CDE · BIM · ERP · correo · datos de obra</strong><p>aportan la verdad operativa sobre la que el agente actúa</p></Reveal>
        <Reveal order={5} className="stack-side"><span>VALOR</span><i /><b>Diseño del flujo</b><i /><span>EVIDENCIA</span></Reveal>
      </div>
    </SceneFrame>
  )
}

export function MultiAgentLoop() {
  const roles = [['Perceptor', 'detecta cambio'], ['Analista', 'contrasta contexto'], ['Planificador', 'propone acción'], ['Ejecutor', 'usa herramienta']]
  return (
    <SceneFrame eyebrow="ACTO II · SISTEMA AGENTIC" title="Muchos agentes solo crean valor cuando comparten un objetivo y un criterio de hecho.">
      <div className="multiagent-loop">
        <div className="multiagent-roles">{roles.map(([title, copy], index) => <Reveal order={index + 1} className="role-node" key={title}><span>0{index + 1}</span><b>{title}</b><p>{copy}</p></Reveal>)}</div>
        <Reveal order={6} className="human-checkpoint"><small>CHECKPOINT</small><strong>Humano</strong><p>aprueba lo irreversible</p></Reveal>
        <Reveal order={7} className="evidence-output"><small>CRITERIO DE HECHO</small><strong>Acción + evidencia + trazabilidad</strong></Reveal>
      </div>
    </SceneFrame>
  )
}

export function AiFirstOperatingModel() {
  return (
    <SceneFrame eyebrow="ACTO III · AI FIRST" title="AI First no es añadir un chatbot. Es rediseñar quién hace qué dentro del flujo.">
      <div className="operating-model">
        <Reveal order={1} className="operating-before"><small>ANTES · IA AL COSTADO</small><h3>Persona → herramientas → más tareas</h3><div><span>copiar</span><span>buscar</span><span>conciliar</span><span>recordar</span><span>escalar</span></div><p>El proceso no cambia. Solo acelera partes aisladas.</p></Reveal>
        <Reveal order={2} className="operating-shift"><span>REDISEÑAR</span><i>→</i></Reveal>
        <Reveal order={3} className="operating-after"><small>DESPUÉS · OPERACIÓN AI FIRST</small><h3>Sistema ejecuta. Humano juzga.</h3><div><span>agente percibe</span><span>agente propone</span><span>humano decide</span><span>sistema evidencia</span></div><p>La inteligencia forma parte de la arquitectura del trabajo.</p></Reveal>
      </div>
    </SceneFrame>
  )
}

export function FirstLoop() {
  const loop = [
    ['01', 'Problema', 'una fricción concreta'], ['02', 'Flujo', 'entradas, salida y dueño'],
    ['03', 'Agente', 'herramientas y límites'], ['04', 'Evidencia', 'métrica, log y aprendizaje'],
  ]
  return (
    <SceneFrame eyebrow="ACTO III · PRIMER MOVIMIENTO" title="Empieza con un loop interno: un problema, un dueño y una métrica.">
      <div className="first-loop">
        {loop.map(([number, title, copy], index) => <Reveal order={index + 1} className="loop-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" /></Reveal>)}
        <Reveal order={6} className="loop-gate"><small>GATE HUMANO</small><strong>aprobar · detener · corregir</strong></Reveal>
      </div>
      <Reveal order={8} as="p" className="loop-metrics">Tiempo de ciclo · errores evitados · retrabajo · trazabilidad · adopción real</Reveal>
    </SceneFrame>
  )
}

export function ProofAndClosing() {
  return (
    <section className="proof-closing">
      <div className="proof-data">
        <Reveal order={0} as="p" className="eyebrow">GEN+ · EVIDENCIA OPERATIVA</Reveal>
        <Reveal order={1} className="proof-number"><strong>68</strong><span>proyectos registrados</span></Reveal>
        <Reveal order={2} className="proof-lines"><span>33 · BIM Management</span><span>14 · BIM Automation</span><span>7 · Software</span><span>6 · Ingeniería de detalle</span><span>4 · Implementación IA</span></Reveal>
        <Reveal order={3} as="p" className="proof-source">Corte interno de portafolio GEN+ · 28 may 2026</Reveal>
      </div>
      <div className="closing-question">
        <Reveal order={1} as="small">EL SIGUIENTE PASO NO ES OTRA HERRAMIENTA</Reveal>
        <Reveal order={2} as="h2">¿Quieres ser una más?</Reveal>
        <Reveal order={3} as="p">Empecemos por un problema real de tu empresa y diseñemos su primer flujo AI First.</Reveal>
        <Reveal order={4} className="closing-formula"><b>1 problema</b><i /> <b>1 dueño</b><i /> <b>1 métrica</b></Reveal>
        <Reveal order={5} className="closing-brand"><img src={assetUrl('assets/gen-logo-white.png')} alt="GEN+" /><span>AI CONSTRUCTION · OPERACIÓN · EVIDENCIA</span></Reveal>
      </div>
    </section>
  )
}
