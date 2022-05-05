import './ChooseOneResult.css';
import { TwitterShareButton } from "../share/TwitterShareButton";

export function ChooseOneResult(props: ChooseOneResultPropType) {
  return (
    <>
      <h3 className='ChooseOneResult-title' >1人選ぶの結果</h3>
      <TwitterShareButton result={props.result} candidates={props.candidates} type={props.type} />
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