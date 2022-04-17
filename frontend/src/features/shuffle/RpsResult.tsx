export function RpsResult(props: RpsResultPropType) {
  return (
    <div>
      <div>
      {props.result.map((result, index) => {
        return (
          <div key={index}>
            <span>{ result.rps }</span>
            <span>{ result.name }</span>
          </div>
        )
      })}
      </div>
      <div>
        {props.state.type === 'draw' && <div>{ props.state.type }</div>}
        {props.state.type === 'finished' && props.state.winner && (
          <div>
            <div>{props.state.type}</div>
            {props.state.winner.map((winner, index) => {
              return (
                <div key={ index }>{winner.name}</div>
              )
            })}
          </div>
        )}
      </div>
    </div>
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