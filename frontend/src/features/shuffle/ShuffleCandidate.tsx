import { useState, KeyboardEvent } from "react";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addCandidate, modifyCandidate, removeCandidate, currentCandidateValue
} from './shuffleSlice';
import './ShuffleCandidate.css'
import './ShuffleCandidate-mobile.css'

export function ShuffleCandidate() {
  const candidates = useAppSelector(currentCandidateValue)
  const dispatch = useAppDispatch();

  const defaultName = "しゃっふる太郎1";
  const [name, setName] = useState(defaultName);

  const handleKeyboardEvent = (event: KeyboardEvent): void => {
    if (event.nativeEvent.isComposing || event.key === "229") {
      // IME入力中は無視する
      return;
    }
    if (event.key === "Enter") {
      dispatch(addCandidate(name));
      // Enterから追加したときは入力しているときなので入力ボックスの中身をclearする
      setName("");
    };
  }

  return (
    <div className="ShuffleCandidate">
      <h2 className="ShuffleCandidate-title">候補</h2>
      <div className="ShuffleCandidate-candidate-name-input-wrapper">
        <input className="ShuffleCandidate-candidate-name-input" placeholder="名前" value={name} onKeyDown={handleKeyboardEvent} onChange={(e) => setName(e.target.value)} size={24} />
        {name !== "" && <button className="ShuffleCandidate-name-clear-button" onClick={() => setName("")}>x</button>}
      </div>
      <button className="ShuffleCandidate-candidate-add-button" onClick={() => {
        dispatch(addCandidate(name));
        const result = name.match(/^(?<n>[^\d]+)(?<i>\d+)$/)
        if (result && result.groups) {
          const { n, i } = result.groups;
          setName(n + (parseInt(i) + 1));
          return;
        }
        setName(name);
      }}>追加</button>
      <div>{'現在の候補者数: ' + candidates.length + '人'}</div>
      {candidates.length === 0 && <div id="ShuffleCandidate-empty-message">候補者がいません。<br />追加ボタンから追加してください。</div>}
      <ul className="ShuffleCandidate-candidates">
        {candidates.map((c, index) => {
          return (
            <li className="ShuffleCandidate-candidate-item" key={c.id}>
              <button className="ShuffleCandidate-candidate-remove-button" onClick={() => dispatch(removeCandidate(c.id))}>x</button>
              <input type="text" className="ShuffleCandidate-candidate-item-name-input" defaultValue={c.name} onChange={(e) => dispatch(modifyCandidate({ index, name: e.target.value }))} size={24}></input>
            </li>
          );
        })}
      </ul>
    </div>
  )
}