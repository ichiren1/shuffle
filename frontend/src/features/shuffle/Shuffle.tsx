import { useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { currentCandidateValue } from "./shuffleSlice";
import { ShuffleResultWrapper } from "./ShuffleResultWrapper";
import { ShuffleCandidate } from "./ShuffleCandidate";
import "./Shuffle.css";
import "./Shuffle-mobile.css";
import {
  FlowerFortuneTellingResult,
  flowerFortuneTellingRequest,
} from "./requests/flowerFortuneTelling";
import { RpsResult, rpsRequest } from "./requests/rockPaperScissor";
import { RouletteResult, rouletteRequest } from "./requests/roulette";
import { ShuffleResult, shuffleRequest } from "./requests/shuffle";
import { ChooseOneResult, chooseOneRequest } from "./requests/chooseOne";
import {
  EenyMeenyMinyMoeResult,
  eenyMeenyMinyMoeRequest,
} from "./requests/eenyMeenyMinyMoe";

export function Shuffle() {
  const candidates = useAppSelector(currentCandidateValue);
  const [result, setResult] = useState<
    | ShuffleResult
    | ChooseOneResult
    | RpsResult
    | RouletteResult
    | FlowerFortuneTellingResult
    | EenyMeenyMinyMoeResult
    | null
  >(null);

  const handleShuffle_ = async () => {
    const response = await shuffleRequest(candidates.map((c) => c.name));
    setResult(response);
  };

  const handleChooseOne_ = async () => {
    const response = await chooseOneRequest(candidates.map((c) => c.name));
    setResult(response);
  };

  const handleRps_ = async () => {
    const response = await rpsRequest(candidates.map((c) => c.name));
    setResult(response);
  };

  const handleRoulette_ = async () => {
    const response = await rouletteRequest(candidates.map((c) => c.name));
    setResult(response);
  };

  const handleFlowerFortuneTelling_ = async () => {
    const response = await flowerFortuneTellingRequest(
      candidates.map((c) => c.name)
    );
    setResult(response);
  };

  const handleEenyMeenyMinyMoe_ = async () => {
    const response = await eenyMeenyMinyMoeRequest(
      candidates.map((c) => c.name)
    );
    setResult(response);
  };

  return (
    <div className="Shuffle">
      <ShuffleCandidate />
      <div className="Shuffle-actions-wrapper">
        <div className="Shuffle-actions">
          <button className="Shuffle-action" onClick={handleShuffle_}>
            シャッフル
          </button>
          <button className="Shuffle-action" onClick={handleChooseOne_}>
            1人選ぶ
          </button>
          <button className="Shuffle-action" onClick={handleRps_}>
            じゃんけん
          </button>
          <button className="Shuffle-action" onClick={handleRoulette_}>
            ルーレット
          </button>
          <button
            className="Shuffle-action"
            onClick={handleFlowerFortuneTelling_}
          >
            花占い
          </button>
          <button className="Shuffle-action" onClick={handleEenyMeenyMinyMoe_}>
            どちらにしようかな
            <span className="Shuffle-action-warning">※音が出ます</span>
          </button>
        </div>
      </div>
      <ShuffleResultWrapper
        candidates={candidates.map((c) => c.name)}
        results={result}
      />
    </div>
  );
}
