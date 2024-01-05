import { useEffect, useState } from "react";
import "./EenyMeenyMinyMoeResult.css";
import { speak } from "../share/Speech";

export function EenyMeenyMinyMoeResult(props: EenyMeenyMinyMoeResultPropType) {
  const [result, setResult] = useState("");
  const [count, setCount] = useState(-1);
  const [maxCount, setMaxCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [flavor, setFlavor] = useState<eenyMeenyMinyMoePhraseKeys>("HOKKAIDO1");
  const [phrase, setPhrase] = useState<string[]>(
    eenyMeenyMinyMoePhrases.HOKKAIDO1.phrase
  );

  useEffect(() => {
    setCount(-1);
    setIsPlaying(false);
    if (flavor === null) {
      return;
    }
    setPhrase(eenyMeenyMinyMoePhrases[flavor].phrase);
    setMaxCount(eenyMeenyMinyMoePhrases[flavor].phrase.length - 1);
  }, [flavor]);

  useEffect(() => {
    setSelectedItem(count % props.candidates.length);
    if (count === maxCount) {
      setResult(props.candidates[count % props.candidates.length]);
    }
  }, [count, maxCount, props.candidates]);

  useEffect(() => {
    if (count === maxCount) {
      setIsPlaying(false);
      return;
    }

    if (isPlaying) {
      setTimeout(
        () => {
          const speakText = phrase[(count + 1) % phrase.length];
          speak(speakText);
          setCount(count + 1);
        },
        phrase[count % phrase.length]?.length > 2 ? 1500 : 500
      );
    }
  }, [count, isPlaying, maxCount, phrase, props.candidates]);

  function onSelectFlavor(evt: React.ChangeEvent<HTMLSelectElement>) {
    setFlavor(evt.target.value as eenyMeenyMinyMoePhraseKeys);
  }

  return (
    <>
      <h3 className="EenyMeenyMinyMoeResult-title">どちらにしようかなの結果</h3>
      <div
        className={
          "EenyMeenyMinyMoeResult-result" + (count < maxCount ? " __hide" : "")
        }
      >
        {result}
      </div>
      <div className="EenyMeenyMinyMoeResult-flavor">
        <select
          className="EenyMeenyMinyMoeResult-flavor-select"
          onChange={onSelectFlavor}
        >
          <option value="HOKKAIDO1">北海道1</option>
          <option value="AOMORI">青森</option>
        </select>
        <div className="EenyMeenyMinyMoeResult-flavor-wrapper">
          <button
            className="EenyMeenyMinyMoeResult-flavor-phrase-play"
            onClick={() => {
              if (count === maxCount) {
                setMaxCount(maxCount + phrase.length);
              }
              setIsPlaying(true);
            }}
          >
            ▶︎
          </button>
          <div className="EenyMeenyMinyMoeResult-flavor-phrase">
            {phrase.map((p, index) => (
              <span
                className={index === count % phrase.length ? " __selected" : ""}
                key={p + index}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <ul className="EenyMeenyMinyMoeResult-list">
        {props.candidates.map((c, index) => (
          <li
            key={c + index}
            className={
              "EenyMeenyMinyMoeResult-item" +
              (selectedItem === index ? " __selected" : "")
            }
          >
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export type EenyMeenyMinyMoeResultPropType = {
  type: "EenyMeenyMinyMoe";
  candidates: string[];
  date: Date;
};

const eenyMeenyMinyMoePhrases = {
  HOKKAIDO1: {
    phrase: [
      "ど",
      "ち",
      "ら",
      "に",
      "し",
      "よ",
      "う",
      "か",
      "な",
      "か",
      "み",
      "さ",
      "ま",
      "の",
      "い",
      "う",
      "と",
      "お",
      "り",
      "鉄砲撃ってばん",
      "ばん",
      "ばん",
      "もうひとつ撃ってばん",
      "ばん",
      "ばん",
    ],
  },
  AOMORI: {
    phrase: [
      "ど",
      "ち",
      "ら",
      "に",
      "し",
      "よ",
      "う",
      "か",
      "な",
      "か",
      "み",
      "さ",
      "ま",
      "の",
      "い",
      "う",
      "と",
      "お",
      "り",
      "へ",
      "の",
      "へ",
      "の",
      "も",
      "へ",
      "じ",
      "か",
      "き",
      "の",
      "た",
      "ね",
    ],
  },
};

type eenyMeenyMinyMoePhraseKeys = keyof typeof eenyMeenyMinyMoePhrases;
