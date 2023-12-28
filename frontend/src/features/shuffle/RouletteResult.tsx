import { useEffect, useRef, useState } from "react";
import { TwitterShareButton } from "../share/TwitterShareButton";
import "./RouletteResult.css";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const CANVAS_CENTER = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
};
const ROULETTE_RADIUS = 150;

export const RouletteResult = (props: RouletteResultPropType) => {
  const canvasRef = useRef(null);
  const [result, setResult] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext("2d");
  };

  const drawPie_ = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    start_deg: number,
    end_deg: number,
    radius: number,
    color: { background: string; text: string }
  ) => {
    var _start_deg = ((360 - start_deg) * Math.PI) / 180;
    var _end_deg = ((360 - end_deg) * Math.PI) / 180;

    ctx.beginPath();
    ctx.moveTo(cx, cy);

    ctx.fillStyle = color.background;
    ctx.arc(cx, cy, radius, _start_deg, _end_deg, true);
    ctx.fill();
  };

  const drawArrow_ = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(CANVAS_CENTER.x, 60);
    ctx.lineTo(CANVAS_CENTER.x + 10, CANVAS_CENTER.y - ROULETTE_RADIUS - 15);
    ctx.lineTo(CANVAS_CENTER.x - 10, CANVAS_CENTER.y - ROULETTE_RADIUS - 15);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(40,40,40)";
    ctx.fill();
  };

  const getCircleCoordinates_ = (
    x: number,
    y: number,
    r: number,
    radian: number
  ): { x: number; y: number } => {
    return {
      x: x + r * Math.cos(((360 - radian) * Math.PI) / 180),
      y: y + r * Math.sin(((360 - radian) * Math.PI) / 180),
    };
  };

  const drawRoullet_ = (
    ctx: CanvasRenderingContext2D,
    pieces: roulettePiece[],
    degOffset: number
  ) => {
    pieces.forEach((piece, index) => {
      const color = getColor(index);
      drawPie_(
        ctx,
        CANVAS_CENTER.x,
        CANVAS_CENTER.y,
        degOffset + piece.startDegree,
        degOffset + piece.endDegree,
        ROULETTE_RADIUS,
        color
      );
      ctx.fillStyle = color.text;
      const center_theta =
        ((degOffset + piece.startDegree + degOffset + piece.endDegree) / 2) %
        360;

      const labelHeight = ctx.measureText("Ｗ").width * 1.2;

      const center = (labelHeight * piece.candidate.length) / 2;

      //一文字ずつ縦書き
      for (var i = 0; i < piece.candidate.length; i++) {
        const coordinate = getCircleCoordinates_(
          CANVAS_CENTER.x,
          CANVAS_CENTER.y,
          ROULETTE_RADIUS / 2 - labelHeight * (i + 0.5) + center,
          center_theta
        );

        ctx.fillText(piece.candidate[i], coordinate.x, coordinate.y);
      }
    });
    drawArrow_(ctx);
  };

  const getColor = (index: number) => {
    switch (index % 10) {
      case 0:
        return { background: "#FFF07C", text: "#000" };
      case 1:
        return { background: "#80FF72", text: "#000" };
      case 2:
        return { background: "#7EE8FA", text: "#000" };
      case 3:
        return { background: "#EEC0C6", text: "#000" };
      case 4:
        return { background: "#E58C8A", text: "#000" };
      case 5:
        return { background: "#C9C19F", text: "#000" };
      case 6:
        return { background: "#EDF7B5", text: "#000" };
      case 7:
        return { background: "#E980FC", text: "#000" };
      case 8:
        return { background: "#F18F01", text: "#000" };
      case 9:
        return { background: "#99C24D", text: "#000" };
      default:
        return { background: "#fff", text: "#000" };
    }
  };

  useEffect(() => {
    if (isRotating) {
      return;
    }
    setResult(null);
    setIsRotating(true);
    const ctx = getContext();

    const pieces: roulettePiece[] = props.candidates.map((candidate, index) => {
      return {
        ratio: 100 / props.candidates.length,
        candidate,
        startDegree: (360 / props.candidates.length) * index,
        endDegree: (360 / props.candidates.length) * (index + 1),
      };
    });

    let degOffset = 0;
    const startInterval = setInterval(() => {
      if (degOffset < 10000) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawRoullet_(ctx, pieces, degOffset);
        degOffset += 100;
      } else {
        clearInterval(startInterval);
        const targetPiece = pieces.find(
          (piece) => piece.candidate === props.result.name
        );
        if (!targetPiece) {
          return;
        }
        // 最終的に90°のところにtargetの真ん中が来て欲しいので頑張って色々計算する
        let finalDeg =
          Math.floor(
            360 + 90 - (targetPiece.startDegree + targetPiece.endDegree) / 2
          ) % 360;
        degOffset = finalDeg + 360 * 5; // 見栄え的に余分に5周分回したい
        const endInterval = setInterval(() => {
          if (degOffset !== finalDeg) {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            drawRoullet_(ctx, pieces, degOffset);
            const remainDeg = degOffset - finalDeg;
            degOffset -= Math.max(Math.floor(remainDeg / 360), 1);
          } else {
            clearInterval(endInterval);
            setResult(props.result.name);
            setIsRotating(false);
          }
        }, 1);
      }
    }, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.result.date, props.result.name]);
  return (
    <>
      <div>
        <h3 className="RouletteResult-title">ルーレットの結果</h3>
        <TwitterShareButton
          result={props.result.name}
          candidates={props.candidates}
          type={props.type}
          date={props.result.date}
        />
        <div className="RouletteResult-result">{result}</div>
      </div>
      <canvas
        id="RouletteResult-canvas"
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
    </>
  );
};

type roulettePiece = {
  ratio: number;
  candidate: string;
  startDegree: number;
  endDegree: number;
};

type RouletteResultPropType = {
  candidates: string[];
  type: "Roulette";
  result: {
    name: string;
    date: Date;
  };
};
