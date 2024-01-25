import { useState, KeyboardEvent } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addCandidate,
  modifyCandidate,
  removeCandidate,
  currentCandidateValue,
} from "./shuffleSlice";
import "./ShuffleCandidate.css";
import "./ShuffleCandidate-mobile.css";
import menuIcon from "../../menu.svg";
import closeIcon from "../../close.svg";
import { saveTemplates, fetchTemplates } from "../../usecase/TemplateUseCase";
import { TemplateDialog } from "./TemplateDialog";
import { TemplateDto } from "../../query/TemplateDto";

export function ShuffleCandidate() {
  const candidates = useAppSelector(currentCandidateValue);
  const dispatch = useAppDispatch();

  const defaultName = "しゃっふる太郎1";
  const [name, setName] = useState(defaultName);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [templates, setTemplates] = useState<TemplateDto[] | null>(null);

  const handleKeyboardEvent = (event: KeyboardEvent): void => {
    if (event.nativeEvent.isComposing || event.key === "229") {
      // IME入力中は無視する
      return;
    }
    if (event.key === "Enter") {
      dispatch(addCandidate(name));
      // Enterから追加したときは入力しているときなので入力ボックスの中身をclearする
      setName("");
    }
  };

  const handleSaveTemplates = async () => {
    const title = window.prompt(
      "テンプレート名を入力",
      new Date().toLocaleString()
    );
    if (title === null) {
      return;
    }
    const templates = await fetchTemplates();
    setTemplates(templates);
    if (templates) {
      saveTemplates([...templates, { candidate: candidates, title }]);
    } else {
      saveTemplates([{ candidate: candidates, title }]);
    }
  };

  const handleLoadTemplates = async () => {
    const templates = await fetchTemplates();
    setTemplates(templates);
    setIsOpenMenu(false);
    setIsOpenDialog(true);
  };

  const handlePermalink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("candidates", candidates.map((c) => c.name).join(","));
    window.prompt("URLをコピーしてください", url.toString());
  };

  return (
    <div className="ShuffleCandidate">
      <div className="ShuffleCandidate-header">
        <div className="ShuffleCandidate-sub-header">
          <h2 className="ShuffleCandidate-title">候補</h2>
          <div className="ShuffleCandidate-menu-wrapper">
            <button
              className="ShuffleCandidate-menu-button"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <img
                className="w-5 h-5"
                src={menuIcon}
                alt="Open candidate menu"
              ></img>
            </button>
            <div
              className={[
                "ShuffleCandidate-menu",
                !isOpenMenu ? "__hide" : "",
              ].join(" ")}
            >
              <button onClick={handleSaveTemplates}>
                現在の候補者をテンプレートとして保存する
              </button>
              <button onClick={handleLoadTemplates}>
                保存したテンプレートから読み込む
              </button>
              <button onClick={handlePermalink}>
                現在の候補者を入力済みのURLを生成する
              </button>
            </div>
          </div>
        </div>
        <div className="ShuffleCandidate-candidate-name-input-wrapper">
          <input
            className="ShuffleCandidate-candidate-name-input"
            placeholder="名前"
            value={name}
            onKeyDown={handleKeyboardEvent}
            onChange={(e) => setName(e.target.value)}
            size={24}
          />
          {name !== "" && (
            <button
              className="ShuffleCandidate-name-clear-button"
              onClick={() => setName("")}
            >
              <img
                className="w-5 h-5"
                src={closeIcon}
                alt="remove candidate button"
              ></img>
            </button>
          )}
        </div>
        <button
          className="ShuffleCandidate-candidate-add-button"
          onClick={() => {
            dispatch(addCandidate(name));
            const result = name.match(/^(?<n>[^\d]+)(?<i>\d+)$/);
            if (result && result.groups) {
              const { n, i } = result.groups;
              setName(n + (parseInt(i) + 1));
              return;
            }
            setName(name);
          }}
        >
          追加
        </button>
      </div>
      <div className="mt-2">
        <div>{"現在の候補者数: " + candidates.length + "人"}</div>
        {candidates.length === 0 && (
          <div id="ShuffleCandidate-empty-message">
            候補者がいません。
            <br />
            追加ボタンから追加してください。
          </div>
        )}
        <ul className="ShuffleCandidate-candidates">
          {candidates.map((c, index) => {
            return (
              <li className="ShuffleCandidate-candidate-item" key={c.id}>
                <input
                  type="text"
                  className="ShuffleCandidate-candidate-item-name-input"
                  defaultValue={c.name}
                  onChange={(e) =>
                    dispatch(modifyCandidate({ index, name: e.target.value }))
                  }
                  size={24}
                ></input>
                <button
                  className="ShuffleCandidate-candidate-remove-button"
                  onClick={() => dispatch(removeCandidate(c.id))}
                >
                  <img src={closeIcon} alt="remove candidate"></img>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {isOpenDialog && (
        <TemplateDialog
          templates={templates}
          onCloseHandler={() => {
            setIsOpenDialog(false);
          }}
        />
      )}
    </div>
  );
}
