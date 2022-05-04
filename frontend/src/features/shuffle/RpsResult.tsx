import './RpsResult.css';

export function RpsResult(props: RpsResultPropType) {
  const getRpsIcon = (rps: RockPaperScissorType): string => {
    switch (rps) {
      case RockPaperScissor.PAPER:
        return "🖐";
      case RockPaperScissor.SCISSOR:
        return "✌️";
      case RockPaperScissor.ROCK:
        return "✊";
    }
  }

  const getRpsTitle = (rps: RockPaperScissorType): string => {
    switch (rps) {
      case RockPaperScissor.PAPER:
        return "パー";
      case RockPaperScissor.SCISSOR:
        return "チョキ";
      case RockPaperScissor.ROCK:
        return "グー";
    }
  }

  return (
    <>
      <h3 className='RpsResult-title'>じゃんけんの結果</h3>
      {props.state.type === 'draw' && <div>あいこ</div>}
      {props.state.type === 'finished' && props.state.winner && (
        <>
          <div>🏆 Winner 🏆</div>
          {props.state.winner.map((winner, index) => {
            return (
              <div key={ index }>{winner.name}</div>
            )
          })}
        </>
      )}
      <ul className='RpsResult-results'>
        {props.result.map((result, index) => {
          return (
            <li className='RpsResult-results-item' key={index}>
              <span title={getRpsTitle(result.rps)} className='RpsResult-rps-icon'>{ getRpsIcon(result.rps) }</span>
              <span>{ result.name }</span>
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

// APIと同じ型になっているが、あまり依存を張りたくないのでオブジェクトを再定義する
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