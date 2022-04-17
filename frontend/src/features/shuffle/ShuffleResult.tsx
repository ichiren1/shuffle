export function ShuffleResult(props: ShuffleResultPropType) {
  return (
    <div>
    {props.result.map((result, index) => {
      return (
        <div key={index}>
          <span>{ index+1 }</span>
          <span>{ result }</span>
        </div>
      )
    })}
    </div>
  )
}

// APIと同じ型になっているが、あまり依存を張りたくないのでオブジェクトを再定義する
export type ShuffleResultPropType = {
  type: 'Shuffle',
  candidates: string[],
  result: string[]
}