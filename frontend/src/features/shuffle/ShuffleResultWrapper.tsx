import { ShuffleResult as ShuffleResultComponent } from "./ShuffleResult";
import { ChooseOneResult as ChooseOneResultComponent } from "./ChooseOneResult";
import { RpsResult as RpsResultComponent } from "./RpsResult";
import { RouletteResult as RouletteResultComponent } from "./RouletteResult";
import { FlowerFortuneTellingResult as FlowerFortuneTellingResultComponent } from "./FlowerFortuneTellingResult";
import "./ShuffleResultWrapper.css";
import "./ShuffleResultWrapper-mobile.css";
import { ChooseOneResult } from "./requests/chooseOne";
import { RpsResult } from "./requests/rockPaperScissor";
import { RouletteResult } from "./requests/roulette";
import { ShuffleResult } from "./requests/shuffle";
import { FlowerFortuneTellingResult } from "./requests/flowerFortuneTelling";
import { useEffect, useRef } from "react";

export function ShuffleResultWrapper(props: ShuffleResultWrapperPropType) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.results]);

  return (
    <div className="ShuffleResultWrapper">
      <h2 className="ShuffleResultWrapper-title" ref={titleRef}>
        結果
      </h2>
      {!props.results && (
        <div id="ShuffleResultWrapper-results-empty-message">
          候補者を追加し、「シャッフル」「1人選ぶ」「じゃんけん」のどれかを選んでください。
        </div>
      )}
      {props.results && (
        <div>
          {props.results.type === "Shuffle" && (
            <ShuffleResultComponent
              candidates={props.candidates}
              result={props.results.result}
              type={"Shuffle"}
            />
          )}
          {props.results.type === "ChooseOne" && (
            <ChooseOneResultComponent
              candidates={props.candidates}
              result={props.results.result}
              type={"ChooseOne"}
            />
          )}
          {props.results.type === "Rps" && (
            <RpsResultComponent
              candidates={props.candidates}
              type={"Rps"}
              result={props.results.result}
              state={props.results.state}
            />
          )}
          {props.results.type === "Roulette" && (
            <RouletteResultComponent
              candidates={props.candidates}
              type={"Roulette"}
              result={{ name: props.results.result, date: props.results.date }}
            />
          )}
          {props.results.type === "FlowerFortuneTelling" && (
            <FlowerFortuneTellingResultComponent
              candidates={props.candidates}
              type={"FlowerFortuneTelling"}
              result={props.results.result}
              date={props.results.date}
            />
          )}
        </div>
      )}
    </div>
  );
}

export type ShuffleResultWrapperPropType = {
  candidates: string[];
  results:
    | ShuffleResult
    | ChooseOneResult
    | RpsResult
    | RouletteResult
    | FlowerFortuneTellingResult
    | null;
};
