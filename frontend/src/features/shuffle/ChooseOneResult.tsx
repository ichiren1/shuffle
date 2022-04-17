export function ChooseOneResult(props: ChooseOneResultPropType) {
  return (
    <div>{ props.result }</div>
  )
}

// APIと同じ型になっているが、あまり依存を張りたくないのでオブジェクトを再定義する
export type ChooseOneResultPropType = {
  type: "ChooseOne",
  candidates: string[],
  result: string
}