import "./FlowerFortuneTellingResult.css";
import { useEffect, useRef, useState } from "react";

export function FlowerFortuneTellingResult(
  props: FlowerFortuneTellingResultPropType
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pickResult, setPickResult] = useState<string | null>(null);
  const [pickedResult, setPickedResult] = useState<
    { label: string; picked: boolean; index: number }[] | null
  >(null);
  const [isPickResultShown, setIsPickResultShown] = useState<boolean>(false);

  const getContext = (): CanvasRenderingContext2D | null => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) {
      throw new Error("canvas is null");
    }

    return canvas.getContext("2d");
  };

  useEffect(() => {
    setPickedResult(
      props.result.map((c, index) => {
        return { label: c, picked: false, index: index };
      })
    );
  }, [props.result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = getContext();
    if (!ctx) {
      return;
    }
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.beginPath();
    ctx.fillStyle = "#52ee00";
    ctx.fillRect(centerX - 5, centerY, 10, 150);
    ctx.strokeStyle = "#ecee00";
    ctx.fillStyle = "#ecee00";
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2, true);
    ctx.fill();
  }, [props.date]);

  return (
    <>
      <h3 className="FlowerFortuneTellingResult-title">花占いの結果</h3>
      <div className="FlowerFortuneTellingResult-result">
        <div
          className={
            "FlowerFortuneTellingResult-result-pick " +
            (isPickResultShown ? "fadeIn" : "fadeOut")
          }
        >
          {pickResult}
        </div>
        <div id="FlowerFortuneTellingResult-flower-area-wrapper">
          <div id="FlowerFortuneTellingResult-flower-area">
            {pickedResult?.map((pr) => (
              <button
                className={"result-item " + (pr.picked ? "fadeOut" : "")}
                style={{
                  rotate: (360 / props.result.length) * pr.index + 45 + "deg",
                }}
                key={pr.index}
                onClick={() => {
                  setIsPickResultShown(false);
                  pickedResult[pr.index].picked = true;
                  setPickedResult(pickedResult);

                  setTimeout(() => {
                    setPickResult(pr.label);
                    setIsPickResultShown(true);
                  }, 500);
                }}
                disabled={pr.picked}
              >
                <span className="result-item-text">{pr.label}</span>
              </button>
            ))}
          </div>
        </div>
        <canvas
          id="FlowerFortuneTellingResult-canvas"
          ref={canvasRef}
          width={300}
          height={300}
        ></canvas>
        <span>花びらをクリックしてね</span>
      </div>
    </>
  );
}

export type FlowerFortuneTellingResultPropType = {
  type: "FlowerFortuneTelling";
  candidates: string[];
  result: string[];
  date: Date;
};
