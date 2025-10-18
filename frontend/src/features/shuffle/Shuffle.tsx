import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { currentCandidateValue, setCandidates, excludeCandidate } from "./shuffleSlice";
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
  const dispatch = useAppDispatch();
  const [result, setResult] = useState<
    | ShuffleResult
    | ChooseOneResult
    | RpsResult
    | RouletteResult
    | FlowerFortuneTellingResult
    | EenyMeenyMinyMoeResult
    | null
  >(null);

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const candidates = params.get("candidates");
    if (candidates) {
      const decodedCandidates = decodeURI(candidates);
      dispatch(setCandidates(decodedCandidates.split(",")));
    }
  }, [dispatch]);

  const getAvailableCandidates_ = () => {
    return candidates.filter((c) => c.isAvailable);
  }

  const handleShuffle_ = async () => {
    const response = await shuffleRequest(getAvailableCandidates_().map((c) => c.name));
    setResult(response);
  };

  const handleChooseOne_ = async () => {
    const response = await chooseOneRequest(getAvailableCandidates_().map((c) => c.name));
    setResult(response);
  };

  const handleRps_ = async () => {
    const response = await rpsRequest(getAvailableCandidates_().map((c) => c.name));
    setResult(response);
  };

  const handleRoulette_ = async () => {
    const response = await rouletteRequest(getAvailableCandidates_().map((c) => c.name));
    setResult(response);
  };

  const handleRouletteAgain_ = async (luckyWinner: string) => {
    dispatch(excludeCandidate(luckyWinner));
    const response = await rouletteRequest(getAvailableCandidates_().map((c) => c.name).filter((c) => c !== luckyWinner));
    setResult(response);
  };

  const handleFlowerFortuneTelling_ = async () => {
    const response = await flowerFortuneTellingRequest(
      getAvailableCandidates_().map((c) => c.name)
    );
    setResult(response);
  };

  const handleEenyMeenyMinyMoe_ = async () => {
    const response = await eenyMeenyMinyMoeRequest(
      getAvailableCandidates_().map((c) => c.name)
    );
    setResult(response);
  };

  const resultAction = async () => {
    switch (result?.type) {
      case "Roulette":
        return handleRouletteAgain_(result.result);
      default:
        return Promise.resolve();
    }
  }

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
        candidates={getAvailableCandidates_().map((c) => c.name)}
        results={result}
        resultAction={resultAction}
      />
    </div>
  );
}
