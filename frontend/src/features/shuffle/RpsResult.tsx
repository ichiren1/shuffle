import './RpsResult.css';
import { TwitterShareButton } from "../share/TwitterShareButton";

export function RpsResult(props: RpsResultPropType) {
  const getRpsIcon = (rps: RockPaperScissorType): string => {
    switch (rps) {
      case RockPaperScissor.PAPER:
        return "๐";
      case RockPaperScissor.SCISSOR:
        return "โ๏ธ";
      case RockPaperScissor.ROCK:
        return "โ";
    }
  }

  const getRpsTitle = (rps: RockPaperScissorType): string => {
    switch (rps) {
      case RockPaperScissor.PAPER:
        return "ใใผ";
      case RockPaperScissor.SCISSOR:
        return "ใใงใญ";
      case RockPaperScissor.ROCK:
        return "ใฐใผ";
    }
  }

  return (
    <>
      <h3 className='RpsResult-title'>ใใใใใใฎ็ตๆ</h3>
      <TwitterShareButton result={props.result} candidates={props.candidates} state={props.state} type={props.type} />
      <div className='RpsResult-state'>
        {props.state.type === 'draw' && <div>ใใใ</div>}
        {props.state.type === 'finished' && props.state.winner && (
          <>
            <div>๐ Winner ๐</div>
            {props.state.winner.map((winner, index) => {
              return (
                <div key={index}>{winner.name}</div>
              )
            })}
          </>
        )}
      </div>
      <ul className='RpsResult-results'>
        {props.result.map((result, index) => {
          return (
            <li className='RpsResult-results-item' key={index}>
              <span title={getRpsTitle(result.rps)} className='RpsResult-rps-icon'>{getRpsIcon(result.rps)}</span>
              <span>{result.name}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const RockPaperScissor = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSOR: "scissor",
} as const

export type RockPaperScissorType =
  typeof RockPaperScissor[keyof typeof RockPaperScissor]

// APIใจๅใๅใซใชใฃใฆใใใใใใพใไพๅญใๅผตใใใใชใใฎใงใชใใธใงใฏใใๅๅฎ็พฉใใ
export type RpsResultPropType = {
  candidates: string[]
  type: "Rps"
  result: {
    name: string
    rps: RockPaperScissorType
  }[]
  state: {
    type: "draw" | "finished"
    winner:
    | {
      name: string
      rps: RockPaperScissorType
    }[]
    | null
  }
}