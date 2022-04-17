import { ShuffleResult as ShuffleResultComponent } from './ShuffleResult'
import { ChooseOneResult as ChooseOneResultComponent } from './ChooseOneResult'
import { RpsResult as RpsResultComponent } from './RpsResult'
import { ChooseOneResult, RpsResult, ShuffleResult } from './request'

export function ShuffleResultWrapper(props: ShuffleResultWrapperPropType) {
  
  return (
    <div>
      {(props.results.type === 'Shuffle') && <ShuffleResultComponent candidates={props.candidates} result={props.results.result} type={'Shuffle'} />}
      {(props.results.type === 'ChooseOne') && <ChooseOneResultComponent candidates={props.candidates} result={props.results.result} type={'ChooseOne'} />}
      {(props.results.type === 'Rps') && <RpsResultComponent candidates={props.candidates} type={'Rps'} result={props.results.result} state={props.results.state} /> }
    </div>
  )
}

export type ShuffleResultWrapperPropType = {
  candidates: string[],
  results: ShuffleResult | ChooseOneResult | RpsResult
}