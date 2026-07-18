import { Composition } from 'remotion'
import { TransitionSeries, linearTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/space-grotesk'
import '../styles/index.css'
import timing from '../content/timing.json'
import { scenes } from '../content/scenes'
import { SceneRender } from './SceneRender'
import { OpeningClip } from './clips/OpeningClip'
import { VisionToEventClip } from './clips/VisionToEventClip'
import { AgentLoopClip } from './clips/AgentLoopClip'
import { ClosingClip } from './clips/ClosingClip'
import {
  EdgeLocalProtocolClip,
  HumanGateProtocolClip,
  MultiAgentProtocolClip,
  PilotProtocolClip,
  VoiceProtocolClip,
} from './clips/FieldProtocolClips'
import { GPlusBrainClip } from './clips/GPlusBrainClip'
import { AiNativeClip, AiOpportunityClip, DataBottleneckClip } from './clips/AiNativeInterludes'

const { fps, width, height, transitionFrames } = timing

export const keynoteDuration =
  scenes.reduce((total, scene) => total + scene.durationInFrames, 0) -
  transitionFrames * (scenes.length - 1)

function KeynoteFull() {
  const children: React.ReactNode[] = []
  scenes.forEach((scene, index) => {
    children.push(
      <TransitionSeries.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
        <SceneRender scene={scene} index={index} total={scenes.length} />
      </TransitionSeries.Sequence>,
    )
    if (index < scenes.length - 1) {
      children.push(
        <TransitionSeries.Transition
          key={`${scene.id}-t`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionFrames })}
        />,
      )
    }
  })
  return <TransitionSeries>{children}</TransitionSeries>
}

const clipDuration = (id: string) => {
  const clip = timing.clips.find((entry) => entry.id === id)
  if (!clip) throw new Error(`Sin timing para el clip ${id}`)
  return clip.durationInFrames
}

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="KeynoteFull"
        component={KeynoteFull}
        durationInFrames={keynoteDuration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="OpeningClip"
        component={OpeningClip}
        durationInFrames={clipDuration('opening')}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="VisionToEventClip"
        component={VisionToEventClip}
        durationInFrames={clipDuration('vision-to-event')}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="AgentLoopClip"
        component={AgentLoopClip}
        durationInFrames={clipDuration('agent-loop')}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="ClosingClip"
        component={ClosingClip}
        durationInFrames={clipDuration('closing-clip')}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition id="EdgeLocalProtocolClip" component={EdgeLocalProtocolClip} durationInFrames={clipDuration('edge-local')} fps={fps} width={width} height={height} />
      <Composition id="VoiceProtocolClip" component={VoiceProtocolClip} durationInFrames={clipDuration('voice-protocol')} fps={fps} width={width} height={height} />
      <Composition id="MultiAgentProtocolClip" component={MultiAgentProtocolClip} durationInFrames={clipDuration('multi-agent')} fps={fps} width={width} height={height} />
      <Composition id="HumanGateProtocolClip" component={HumanGateProtocolClip} durationInFrames={clipDuration('human-gate')} fps={fps} width={width} height={height} />
      <Composition id="PilotProtocolClip" component={PilotProtocolClip} durationInFrames={clipDuration('pilot-protocol')} fps={fps} width={width} height={height} />
      <Composition id="GPlusBrainClip" component={GPlusBrainClip} durationInFrames={clipDuration('gplus-brain')} fps={fps} width={width} height={height} />
      <Composition id="DataBottleneckClip" component={DataBottleneckClip} durationInFrames={clipDuration('data-bottleneck')} fps={fps} width={width} height={height} />
      <Composition id="AiOpportunityClip" component={AiOpportunityClip} durationInFrames={clipDuration('ai-opportunity')} fps={fps} width={width} height={height} />
      <Composition id="AiNativeClip" component={AiNativeClip} durationInFrames={clipDuration('ai-native')} fps={fps} width={width} height={height} />
    </>
  )
}
