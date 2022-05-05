import './ShuffleResult.css';
import { TwitterShareButton } from "../share/TwitterShareButton";

export function ShuffleResult(props: ShuffleResultPropType) {
  return (
    <div>
      <h3 className='ShuffleResult-title'>シャッフルの結果</h3>
      <TwitterShareButton result={props.result} candidates={props.candidates} type={props.type} />
      <ul className='ShuffleResult-results'>
        {props.result.map((result, index) => {
          return (
            <li className='ShuffleResult-results-item' key={index}>
              <span>{result}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// APIと同じ型になっているが、あまり依存を張りたくないのでオブジェクトを再定義する
export type ShuffleResultPropType = {
  type: 'Shuffle',
  candidates: string[],
  result: string[]
}