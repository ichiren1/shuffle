import { ShuffleResult as ShuffleResultComponent } from './ShuffleResult'
import { ChooseOneResult as ChooseOneResultComponent } from './ChooseOneResult'
import { RpsResult as RpsResultComponent } from './RpsResult'
import { ChooseOneResult, RpsResult, ShuffleResult } from './request'
import './ShuffleResultWrapper.css';

export function ShuffleResultWrapper(props: ShuffleResultWrapperPropType) {

  return (
    <div className='ShuffleResultWrapper'>
      <h2 className='ShuffleResultWrapper-title'>結果</h2>
      {!props.results && <div id="ShuffleResultWrapper-results-empty-message">候補者を追加し、「シャッフル」「1人選ぶ」「じゃんけん」のどれかを選んでください。</div>}
      {props.results && (<div>
        {(props.results.type === 'Shuffle') && <ShuffleResultComponent candidates={props.candidates} result={props.results.result} type={'Shuffle'} />}
        {(props.results.type === 'ChooseOne') && <ChooseOneResultComponent candidates={props.candidates} result={props.results.result} type={'ChooseOne'} />}
        {(props.results.type === 'Rps') && <RpsResultComponent candidates={props.candidates} type={'Rps'} result={props.results.result} state={props.results.state} />}
      </div>)}
    </div>
  )
}

export type ShuffleResultWrapperPropType = {
  candidates: string[],
  results: ShuffleResult | ChooseOneResult | RpsResult | null
}