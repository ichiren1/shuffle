import { useState } from "react";

import { useAppSelector } from '../../app/hooks';
import {
  currentCandidateValue
} from './shuffleSlice';
import { ShuffleResultWrapper } from './ShuffleResultWrapper';
import { ShuffleCandidate } from './ShuffleCandidate';
import { chooseOneRequest, ChooseOneResult, rpsRequest, RpsResult, shuffleRequest, ShuffleResult } from './request';
import "./Shuffle.css";
import "./Shuffle-mobile.css";

export function Shuffle() {
  const candidates = useAppSelector(currentCandidateValue)
  const [result, setResult] = useState<ShuffleResult | ChooseOneResult | RpsResult | null>(null);

  const handleShuffle_ = async () => {
    const response = await shuffleRequest(candidates.map(c => c.name));
    setResult(response);
  }

  const handleChooseOne_ = async () => {
    const response = await chooseOneRequest(candidates.map(c => c.name));
    setResult(response);
  }

  const handleRps_ = async () => {
    const response = await rpsRequest(candidates.map(c => c.name));
    setResult(response);
  }

  return (
    <div className="Shuffle">
      <ShuffleCandidate />
      <div className="Shuffle-actions-wrapper">
        <div className="Shuffle-actions">
          <button className="Shuffle-action" onClick={handleShuffle_}>シャッフル</button>
          <button className="Shuffle-action" onClick={handleChooseOne_}>1人選ぶ</button>
          <button className="Shuffle-action" onClick={handleRps_}>じゃんけん</button>
        </div>
      </div>
      <ShuffleResultWrapper candidates={candidates.map(c => c.name)} results={result} />
    </div>
  )
}