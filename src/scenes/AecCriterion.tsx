import { SceneFrame } from '../components/SceneFrame'
import { Reveal } from '../motion/MotionContext'

export function AecCriterion() {
  return (
    <SceneFrame
      eyebrow="ACTO III · EL ROL PROFESIONAL"
      title="La IA no reemplaza el criterio de obra. Lo necesita."
      lead="El profesional AEC reconoce la excepción, entiende el impacto y sabe cuándo una recomendación no debe ejecutarse."
      className="criterion-scene"
    >
      <div className="criterion-seam">
        <Reveal order={1} as="section" className="seam-field seam-obra">
          <small>DOMINIO DE OBRA</small>
          <ul>
            <li>seguridad y excepción</li>
            <li>secuencia constructiva</li>
            <li>calidad y tolerancias</li>
            <li>contexto del frente</li>
          </ul>
        </Reveal>
        <Reveal order={2} className="seam-spine">
          <b>CRITERIO</b>
          <div>
            <span>qué automatizar</span>
            <span>qué verificar</span>
            <span>qué detener</span>
          </div>
        </Reveal>
        <Reveal order={3} as="section" className="seam-field seam-digital">
          <small>CAPA DIGITAL</small>
          <ul>
            <li>datos y eventos</li>
            <li>agentes y visión</li>
            <li>automatización</li>
            <li>trazabilidad</li>
          </ul>
        </Reveal>
      </div>
    </SceneFrame>
  )
}
