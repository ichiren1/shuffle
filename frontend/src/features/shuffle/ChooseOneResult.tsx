import './ChooseOneResult.css';

export function ChooseOneResult(props: ChooseOneResultPropType) {
  return (
    <>
      <h3>1人選ぶの結果</h3>
      <div className="ChooseOneResult-result">{props.result}</div>
    </>
  )
}

// APIと同じ型になっているが、あまり依存を張りたくないのでオブジェクトを再定義する
export type ChooseOneResultPropType = {
  type: "ChooseOne",
  candidates: string[],
  result: string
}