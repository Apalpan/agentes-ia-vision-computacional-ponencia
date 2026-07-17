import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { SlideDef } from './types'

const stagger = (index: number) => ({ '--i': index } as CSSProperties)

function Frame({
  eyebrow,
  title,
  lead,
  sources,
  children,
  className = '',
}: {
  eyebrow: string
  title: string
  lead?: string
  sources: string[]
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`frame ${className}`}>
      <header className="frame-head motion-item" style={stagger(0)}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </header>
      <div className="frame-body">{children}</div>
      <footer className="source-tags" aria-label="Fuentes de la escena">
        {sources.map((source) => <span key={source}>{source}</span>)}
      </footer>
    </div>
  )
}

function SignalCore() {
  return (
    <div className="signal-core" aria-label="Representación del loop entre visión, agente y decisión">
      <div className="signal-orbit orbit-a" />
      <div className="signal-orbit orbit-b" />
      <div className="signal-orbit orbit-c" />
      <div className="signal-eye">
        <span>VISIÓN</span>
        <b>→</b>
        <span>AGENTE</span>
      </div>
      <i className="signal-pulse pulse-a" />
      <i className="signal-pulse pulse-b" />
      <i className="signal-pulse pulse-c" />
    </div>
  )
}

function Cover() {
  return (
    <div className="cover-scene">
      <div className="cover-copy">
        <img className="cover-logo motion-item" style={stagger(0)} src="./assets/gen-logo-white.png" alt="GEN+" />
        <p className="eyebrow motion-item" style={stagger(1)}>AI CONSTRUCTION · PONENCIA</p>
        <h1 className="motion-item" style={stagger(2)}>
          Cuando la obra<br />puede <em>ver</em>,<br />el agente puede actuar.
        </h1>
        <p className="cover-sub motion-item" style={stagger(3)}>
          Agentes IA + visión computacional para convertir señales de campo en decisiones trazables.
        </p>
        <div className="cover-meta motion-item" style={stagger(4)}>
          <span>Alejandro Palpan</span>
          <span>GEN+ · AI Construction</span>
        </div>
      </div>
      <div className="cover-visual motion-item" style={stagger(1)}>
        <SignalCore />
        <p className="visual-caption">PERCEPCIÓN → CONTEXTO → ACCIÓN → EVIDENCIA</p>
      </div>
    </div>
  )
}

function SignalProblem() {
  const signals = ['Cámara', 'Modelo BIM', 'Reporte', 'WhatsApp', 'Sensor', 'Cronograma']
  return (
    <Frame
      eyebrow="01 · LA FRACTURA"
      title="La obra ya produce señales. El problema es que no cierran el loop."
      lead="Vemos actividad, riesgos y desviaciones. Pero la decisión todavía depende de que alguien encuentre, interprete y escale la información a tiempo."
      sources={['S3', 'S6']}
      className="signal-problem"
    >
      <div className="signal-river motion-item" style={stagger(1)}>
        <div className="signal-stream">
          {signals.map((signal, index) => (
            <span key={signal} style={stagger(index)}>{signal}</span>
          ))}
        </div>
        <div className="signal-break" aria-hidden="true"><i /><i /><i /></div>
        <div className="late-decision">
          <small>DECISIÓN</small>
          <strong>Llega tarde.</strong>
          <p>La señal existía. El sistema no actuó.</p>
        </div>
      </div>
    </Frame>
  )
}

function Threshold() {
  return (
    <Frame
      eyebrow="02 · CAMBIO DE MODELO"
      title="Un asistente responde. Un agente sostiene un objetivo."
      lead="El salto no es una conversación más inteligente. Es pasar de generar contenido a observar, usar herramientas, corregir y verificar."
      sources={['S1']}
      className="threshold"
    >
      <div className="threshold-line motion-item" style={stagger(1)}>
        <section>
          <span>ASISTENTE</span>
          <strong>Pregunta → respuesta</strong>
          <p>Reactivo. La salida termina en el chat.</p>
        </section>
        <div className="threshold-gate"><i />CRUZA EL UMBRAL<i /></div>
        <section className="threshold-agent">
          <span>AGENTE</span>
          <strong>Objetivo → acción → verificación</strong>
          <p>Mantiene estado y continúa hasta cerrar el resultado.</p>
        </section>
      </div>
    </Frame>
  )
}

function ClosedLoop() {
  const nodes = [
    ['01', 'Percibe', 'imagen / evento'],
    ['02', 'Interpreta', 'contexto / reglas'],
    ['03', 'Decide', 'plan / prioridad'],
    ['04', 'Actúa', 'tools / workflow'],
    ['05', 'Escala', 'humano crítico'],
    ['06', 'Aprende', 'resultado / evidencia'],
  ]
  return (
    <Frame
      eyebrow="03 · EL LOOP"
      title="El agente convierte señales en decisiones — y decisiones en evidencia."
      lead="La visión abre el loop. El agente lo mantiene vivo. La persona conserva el criterio y el punto de control."
      sources={['S1', 'S2', 'S3']}
      className="loop-frame"
    >
      <div className="loop-ring motion-item" style={stagger(1)}>
        <div className="loop-center"><b>LOOP</b><span>operativo</span></div>
        {nodes.map(([num, title, detail], index) => (
          <article key={title} className={`loop-node loop-node-${index + 1}`} style={stagger(index)}>
            <i>{num}</i><b>{title}</b><span>{detail}</span>
          </article>
        ))}
      </div>
    </Frame>
  )
}

function AgentAnatomy() {
  const layers = [
    ['Objetivo', 'Qué resultado debe producir'],
    ['Contexto', 'Proyecto, normas, estado y restricciones'],
    ['Herramientas', 'APIs, CDE, datos, mensajería y software'],
    ['Memoria', 'Qué ocurrió y qué sigue abierto'],
    ['Verificación', 'Criterios, evals y evidencia'],
    ['Permisos', 'Qué puede hacer y cuándo escala'],
  ]
  return (
    <Frame
      eyebrow="04 · ANATOMÍA"
      title="Un agente útil no es un chatbot con nombre. Es un sistema con límites."
      lead="Cuanto más poder de ejecución recibe, más específicos deben ser sus herramientas, logs y aprobaciones."
      sources={['S1']}
      className="anatomy-frame"
    >
      <div className="agent-stack motion-item" style={stagger(1)}>
        {layers.map(([title, detail], index) => (
          <div key={title} style={stagger(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{detail}</p>
          </div>
        ))}
        <aside>
          <small>PRINCIPIO</small>
          <b>Agente pequeño.<br />Objetivo claro.<br />Salida verificable.</b>
        </aside>
      </div>
    </Frame>
  )
}

function VisionVocabulary() {
  const verbs = [
    ['CLASIFICA', '¿Qué está ocurriendo?'],
    ['DETECTA', '¿Dónde está el objeto?'],
    ['SEGMENTA', '¿Qué área pertenece a cada clase?'],
    ['SIGUE', '¿Cómo cambia en el tiempo?'],
  ]
  return (
    <Frame
      eyebrow="05 · PERCEPCIÓN"
      title="La visión computacional no “entiende la obra”. Convierte píxeles en eventos."
      lead="Clasificar, detectar, segmentar y hacer tracking son capacidades distintas. El caso de uso define cuál necesita el sistema."
      sources={['S2']}
      className="vision-vocabulary"
    >
      <div className="vision-field motion-item" style={stagger(1)}>
        <div className="vision-lens"><i /><span>PIXEL</span><b>→</b><span>EVENTO</span></div>
        {verbs.map(([verb, question], index) => (
          <section key={verb} className={`vision-verb verb-${index + 1}`} style={stagger(index)}>
            <strong>{verb}</strong><p>{question}</p>
          </section>
        ))}
      </div>
    </Frame>
  )
}

function EdgePipeline() {
  const steps = [
    ['CÁMARA', 'captura'],
    ['EDGE', 'filtra / infiere'],
    ['EVENTO', 'estructura'],
    ['AGENTE', 'contextualiza'],
    ['HUMANO', 'decide'],
    ['EVIDENCIA', 'cierra'],
  ]
  return (
    <Frame
      eyebrow="06 · ARQUITECTURA"
      title="Procesar cerca de la obra reduce ruido. Orquestar arriba convierte el evento en acción."
      lead="El edge protege continuidad y ancho de banda. La capa de agentes conecta reglas, responsables, herramientas y trazabilidad."
      sources={['S2', 'S4']}
      className="pipeline-frame"
    >
      <div className="edge-pipeline motion-item" style={stagger(1)}>
        {steps.map(([title, detail], index) => (
          <div key={title} style={stagger(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </div>
        ))}
        <div className="pipeline-beam" aria-hidden="true" />
      </div>
      <p className="pipeline-rule motion-item" style={stagger(3)}>
        No se envía “video a la IA”. Se diseña una cadena de decisiones con estados, fallback y evidencia.
      </p>
    </Frame>
  )
}

function CameraLab() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<'idle' | 'starting' | 'live' | 'denied'>('idle')

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), [])

  const startCamera = async () => {
    if (status === 'starting' || status === 'live') return
    setStatus('starting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setStatus('live')
    } catch {
      setStatus('denied')
    }
  }

  return (
    <Frame
      eyebrow="07 · DEMO DE PERCEPCIÓN"
      title="Primero observa. Después decide qué vale la pena convertir en evento."
      lead="Esta escena usa la cámara solo de forma local. Los overlays son una demostración conceptual: no identifican personas ni representan un modelo validado."
      sources={['S2', 'S3']}
      className="camera-frame"
    >
      <div className={`camera-lab motion-item status-${status}`} style={stagger(1)}>
        <div className="camera-screen">
          <video ref={videoRef} muted playsInline aria-label="Vista local de cámara" />
          <div className="camera-fallback" aria-hidden={status === 'live'}>
            <span>CAMERA FEED</span>
            <i /><i /><i />
          </div>
          <div className="scan-line" aria-hidden="true" />
          <div className="detection detection-a"><b>ZONA</b><span>demo</span></div>
          <div className="detection detection-b"><b>OBJETO</b><span>demo</span></div>
          <div className="camera-hud"><span>LOCAL</span><span>NO BIOMETRÍA</span><span>DEMO CONCEPTUAL</span></div>
        </div>
        <aside className="camera-copy">
          <small>CAPA 01 · PERCEPCIÓN</small>
          <h3>La cámara no es el producto.</h3>
          <p>El producto es el evento útil: con zona, hora, contexto, riesgo y siguiente acción.</p>
          <button className="primary-action" type="button" onClick={startCamera} disabled={status === 'starting' || status === 'live'}>
            {status === 'idle' && 'Activar cámara local'}
            {status === 'starting' && 'Solicitando permiso…'}
            {status === 'live' && 'Cámara activa'}
            {status === 'denied' && 'Reintentar cámara'}
          </button>
          {status === 'denied' ? <p className="camera-error" role="status">Permiso no disponible. La escena continúa en modo demostración.</p> : null}
        </aside>
      </div>
    </Frame>
  )
}

function IncidentSimulation() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const timers = useRef<number[]>([])
  const stages = [
    ['Señal visual', 'Presencia en zona restringida'],
    ['Evento', 'Zona + hora + evidencia'],
    ['Agente', 'Contrasta turno, permiso y criticidad'],
    ['Humano', 'Confirma respuesta operativa'],
    ['Cierre', 'Acción y evidencia quedan registradas'],
  ]

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const simulate = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current = []
    setRunning(true)
    setStep(1)
    for (let index = 2; index <= stages.length; index += 1) {
      timers.current.push(window.setTimeout(() => {
        setStep(index)
        if (index === stages.length) setRunning(false)
      }, (index - 1) * 650))
    }
  }

  return (
    <Frame
      eyebrow="08 · SIMULACIÓN"
      title="Una detección aislada crea ruido. Un loop diseñado crea una respuesta."
      lead="El agente no sustituye al responsable SST: prepara contexto, activa el protocolo y conserva evidencia para que la decisión ocurra antes."
      sources={['S1', 'S2', 'S3']}
      className="incident-frame"
    >
      <div className="incident-sim motion-item" style={stagger(1)}>
        <div className="incident-zone">
          <span className={`worker ${step > 0 ? 'worker-alert' : ''}`}>PERSONA</span>
          <div className="restricted-zone"><i />ZONA RESTRINGIDA</div>
          <p>{step === 0 ? 'Escenario en espera' : 'Evento conceptual detectado'}</p>
        </div>
        <div className="incident-sequence">
          {stages.map(([title, detail], index) => (
            <div key={title} className={step > index ? 'active' : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p><b>{title}</b><small>{detail}</small></p>
            </div>
          ))}
          <button className="primary-action" type="button" onClick={simulate} disabled={running}>
            {running ? 'Ejecutando loop…' : step === stages.length ? 'Repetir simulación' : 'Simular evento'}
          </button>
        </div>
      </div>
    </Frame>
  )
}

function MultiAgent() {
  const agents = [
    ['VISIÓN', 'convierte píxeles en eventos'],
    ['SEGURIDAD', 'evalúa protocolo y criticidad'],
    ['PLANIFICACIÓN', 'contrasta frente, turno y secuencia'],
    ['EVIDENCIA', 'documenta acción y resultado'],
  ]
  return (
    <Frame
      eyebrow="09 · ORQUESTACIÓN"
      title="Un agente que hace todo falla. Un equipo pequeño puede cerrar el proceso."
      lead="La especialización reduce ambigüedad: cada agente tiene un objetivo, herramientas limitadas y una salida verificable."
      sources={['S1']}
      className="multiagent-frame"
    >
      <div className="agent-orchestra motion-item" style={stagger(1)}>
        <div className="orchestrator"><small>ORQUESTADOR</small><b>OBJETIVO + ESTADO</b><span>coordina · escala · audita</span></div>
        {agents.map(([title, detail], index) => (
          <article key={title} className={`agent-role role-${index + 1}`} style={stagger(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span><b>{title}</b><p>{detail}</p>
          </article>
        ))}
      </div>
    </Frame>
  )
}

function HumanGate() {
  return (
    <Frame
      eyebrow="10 · GOBERNANZA"
      title="La visión no decide. El agente no autoriza. El sistema escala."
      lead="Autonomía sin permisos produce riesgo. Supervisión sin contexto produce lentitud. El diseño correcto define el punto humano antes de automatizar."
      sources={['S1', 'S3']}
      className="human-frame"
    >
      <div className="human-gate motion-item" style={stagger(1)}>
        <section>
          <small>AUTOMÁTICO</small>
          <h3>Observar<br />clasificar<br />preparar</h3>
          <p>Acciones reversibles, registradas y de bajo riesgo.</p>
        </section>
        <div className="gate-core"><i /><b>HUMANO</b><span>decisión crítica</span><i /></div>
        <section>
          <small>CONTROLADO</small>
          <h3>Aprobar<br />intervenir<br />cerrar</h3>
          <p>Responsabilidad, excepción y validación final.</p>
        </section>
      </div>
    </Frame>
  )
}

function Pilot() {
  const phases = [
    ['01', 'OBSERVAR', 'Un evento crítico, una zona y una cámara.', '¿La señal existe con calidad suficiente?'],
    ['02', 'VALIDAR', 'Reglas, umbral, responsable y fallback.', '¿El evento cambia una decisión real?'],
    ['03', 'ESCALAR', 'Más turnos, frentes y automatizaciones.', '¿El loop mantiene calidad y trazabilidad?'],
  ]
  return (
    <Frame
      eyebrow="11 · PRIMER PILOTO"
      title="Empieza con un evento crítico. No con una plataforma completa."
      lead="El primer piloto debe demostrar que una señal visual mejora una decisión específica antes de ampliar cámaras, clases o agentes."
      sources={['S2', 'S3', 'S4']}
      className="pilot-frame"
    >
      <div className="pilot-track motion-item" style={stagger(1)}>
        {phases.map(([num, title, action, question], index) => (
          <section key={title} style={stagger(index)}>
            <span>{num}</span>
            <small>FASE</small>
            <h3>{title}</h3>
            <p>{action}</p>
            <b>{question}</b>
          </section>
        ))}
      </div>
    </Frame>
  )
}

function Metrics() {
  const measures = [
    ['TIEMPO DE CICLO', 'Señal → decisión → cierre'],
    ['COBERTURA', 'Eventos con evidencia completa'],
    ['CALIDAD', 'Falsos positivos y falsos negativos'],
    ['INTERVENCIÓN', 'Cuándo y por qué entra una persona'],
  ]
  return (
    <Frame
      eyebrow="12 · EVIDENCIA DE VALOR"
      title="No midas cuántas alertas genera la IA. Mide cuántas decisiones mejora."
      lead="Un sistema puede detectar mucho y aportar poco. La métrica debe conectar operación, calidad y control humano."
      sources={['S1', 'S2', 'S3']}
      className="metrics-frame"
    >
      <div className="decision-compass motion-item" style={stagger(1)}>
        <div className="compass-center"><b>VALOR</b><span>operativo</span></div>
        {measures.map(([title, detail], index) => (
          <section key={title} className={`measure measure-${index + 1}`} style={stagger(index)}>
            <strong>{title}</strong><p>{detail}</p>
          </section>
        ))}
      </div>
    </Frame>
  )
}

function AecAdvantage() {
  return (
    <Frame
      eyebrow="13 · EL ROL PROFESIONAL"
      title="La ventaja no es competir con la IA. Es darle criterio de obra."
      lead="El profesional AEC reconoce la excepción, entiende el impacto y sabe cuándo una recomendación no debe ejecutarse."
      sources={['S1', 'S2']}
      className="advantage-frame"
    >
      <div className="advantage-venn motion-item" style={stagger(1)}>
        <div className="venn-a"><b>DOMINIO AEC</b><span>obra · seguridad · BIM · calidad</span></div>
        <div className="venn-b"><b>CAPA DIGITAL</b><span>datos · agentes · visión · automatización</span></div>
        <div className="venn-core"><strong>CRITERIO</strong><small>decidir qué automatizar, qué verificar y qué detener</small></div>
      </div>
    </Frame>
  )
}

function ThreeQuestions() {
  const questions = [
    ['¿Qué evento?', 'Alto impacto, visible y repetible.'],
    ['¿Qué decisión?', 'Responsable, plazo y acción concreta.'],
    ['¿Qué evidencia?', 'Cómo sabremos que el loop funcionó.'],
  ]
  return (
    <Frame
      eyebrow="14 · DISEÑO DEL SISTEMA"
      title="Antes de elegir el modelo, responde tres preguntas."
      lead="Si el evento, la decisión y la evidencia no están claros, el proyecto todavía no necesita más IA: necesita mejor diseño operativo."
      sources={['S1', 'S2', 'S3']}
      className="questions-frame"
    >
      <div className="question-sequence motion-item" style={stagger(1)}>
        {questions.map(([question, answer], index) => (
          <section key={question} style={stagger(index)}>
            <span>0{index + 1}</span><h3>{question}</h3><p>{answer}</p>
          </section>
        ))}
      </div>
    </Frame>
  )
}

function Closing() {
  return (
    <div className="closing-scene">
      <img className="closing-logo motion-item" style={stagger(0)} src="./assets/gen-logo-white.png" alt="GEN+" />
      <p className="eyebrow motion-item" style={stagger(1)}>CIERRE · AI CONSTRUCTION</p>
      <h2 className="motion-item" style={stagger(2)}>
        No necesitamos una obra<br />llena de IA.
        <em> Necesitamos una obra<br />que vea, decida y aprenda.</em>
      </h2>
      <div className="closing-action motion-item" style={stagger(3)}>
        <span>PRÓXIMO PASO</span>
        <strong>Diseña un loop:</strong>
        <p>un evento crítico · una decisión · una evidencia</p>
      </div>
      <div className="closing-signature motion-item" style={stagger(4)}>
        <span>Alejandro Palpan</span><span>GEN+ · AI Construction</span>
      </div>
    </div>
  )
}

export const slides: SlideDef[] = [
  {
    id: 'cover',
    eyebrow: 'Apertura',
    title: 'Cuando la obra puede ver, el agente puede actuar.',
    sources: ['S1', 'S2', 'S5'],
    notes: 'Abrir con una pregunta: ¿qué ocurriría si una obra no solo registrara lo que pasó, sino que pudiera convertir una señal en una acción verificable? Presentar la tesis: visión aporta percepción; el agente aporta continuidad; la persona conserva la decisión.',
    render: () => <Cover />,
  },
  {
    id: 'signals',
    eyebrow: 'La fractura',
    title: 'La obra produce señales que no cierran el loop.',
    sources: ['S3', 'S6'],
    notes: 'Aterrizar el problema en el trabajo cotidiano. La información existe en cámaras, modelos, reportes y mensajes, pero llega tarde o sin contexto. El problema no es falta de datos; es falta de un sistema que los convierta en decisión.',
    render: () => <SignalProblem />,
  },
  {
    id: 'threshold',
    eyebrow: 'Cambio de modelo',
    title: 'De asistente a agente.',
    sources: ['S1'],
    notes: 'Explicar la diferencia sin hype. Un asistente responde. Un agente mantiene un objetivo, usa herramientas, observa el resultado y corrige. No todo chatbot es agente.',
    render: () => <Threshold />,
  },
  {
    id: 'loop',
    eyebrow: 'El loop',
    title: 'El agente convierte señales en decisiones.',
    sources: ['S1', 'S2', 'S3'],
    notes: 'Recorrer el ciclo completo. La salida no es un texto: es un cambio de estado registrado. Destacar que la persona aparece antes de que el sistema tenga permiso para ejecutar una acción crítica.',
    render: () => <ClosedLoop />,
  },
  {
    id: 'agent-anatomy',
    eyebrow: 'Anatomía',
    title: 'Un agente útil es un sistema con límites.',
    sources: ['S1'],
    notes: 'Explicar las seis capas. El modelo es solo una parte. Si faltan herramientas, memoria, verificación o permisos, no existe un sistema operativo confiable.',
    render: () => <AgentAnatomy />,
  },
  {
    id: 'vision-vocabulary',
    eyebrow: 'Percepción',
    title: 'La visión convierte píxeles en eventos.',
    sources: ['S2'],
    notes: 'Diferenciar clasificación, detección, segmentación y tracking. El caso de uso comienza con una pregunta visual precisa; no con la elección de un modelo.',
    render: () => <VisionVocabulary />,
  },
  {
    id: 'edge-pipeline',
    eyebrow: 'Arquitectura',
    title: 'De la cámara a la evidencia.',
    sources: ['S2', 'S4'],
    notes: 'Explicar la cadena técnica en lenguaje operativo. Edge no es un gadget: reduce ancho de banda, soporta red inestable y permite producir eventos cerca de la fuente.',
    render: () => <EdgePipeline />,
  },
  {
    id: 'camera-lab',
    eyebrow: 'Demo',
    title: 'La cámara no es el producto.',
    sources: ['S2', 'S3'],
    notes: 'Activar la cámara solo si el contexto de la sala lo permite. Dejar claro que los overlays son conceptuales y que no hay identificación ni biometría. El objetivo es visualizar la diferencia entre imagen y evento estructurado.',
    render: () => <CameraLab />,
  },
  {
    id: 'incident',
    eyebrow: 'Simulación',
    title: 'Una detección aislada crea ruido.',
    sources: ['S1', 'S2', 'S3'],
    notes: 'Ejecutar la simulación. Narrar cómo la señal se convierte en evento, el agente consulta contexto, una persona decide y el sistema registra el cierre. Es una demostración conceptual, no un caso desplegado.',
    render: () => <IncidentSimulation />,
  },
  {
    id: 'multiagent',
    eyebrow: 'Orquestación',
    title: 'Un equipo pequeño puede cerrar el proceso.',
    sources: ['S1'],
    notes: 'Evitar la fantasía de docenas de agentes. Mostrar especialistas pequeños con salidas claras, coordinados por un orquestador que mantiene objetivo y estado.',
    render: () => <MultiAgent />,
  },
  {
    id: 'human-gate',
    eyebrow: 'Gobernanza',
    title: 'La visión no decide. El sistema escala.',
    sources: ['S1', 'S3'],
    notes: 'La gobernanza se diseña antes de la autonomía. Precisar qué es automático, qué requiere aprobación y qué debe detener el flujo. Más autonomía implica más logs, permisos y control humano.',
    render: () => <HumanGate />,
  },
  {
    id: 'pilot',
    eyebrow: 'Primer piloto',
    title: 'Empieza con un evento crítico.',
    sources: ['S2', 'S3', 'S4'],
    notes: 'Proponer un piloto progresivo. Primero observar si la señal tiene calidad; luego validar si cambia una decisión; recién después escalar. Evitar prometer tiempos o precisión sin información de la obra.',
    render: () => <Pilot />,
  },
  {
    id: 'metrics',
    eyebrow: 'Evidencia de valor',
    title: 'Mide decisiones, no alertas.',
    sources: ['S1', 'S2', 'S3'],
    notes: 'La cantidad de alertas puede ser una métrica negativa. Medir el tiempo completo del loop, la cobertura de evidencia, la calidad de detección y la intervención humana.',
    render: () => <Metrics />,
  },
  {
    id: 'aec-advantage',
    eyebrow: 'Rol profesional',
    title: 'La IA necesita criterio de obra.',
    sources: ['S1', 'S2'],
    notes: 'Cerrar la objeción laboral. El profesional AEC aporta criterio sobre impacto, excepción, seguridad y secuencia. La capa digital multiplica esa capacidad; no sustituye la responsabilidad.',
    render: () => <AecAdvantage />,
  },
  {
    id: 'closing',
    eyebrow: 'Cierre',
    title: 'Diseña un loop.',
    sources: ['S1', 'S2', 'S3'],
    notes: 'Invitar a la audiencia a elegir un evento crítico, una decisión y una evidencia. El próximo paso no es comprar más software; es diseñar el loop mínimo que pueda probar valor.',
    render: () => <Closing />,
  },
]

