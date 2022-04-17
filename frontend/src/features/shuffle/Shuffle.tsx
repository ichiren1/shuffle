import { useState } from "react";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addCandidate, removeCandidate, currentCandidateValue
} from './shuffleSlice';
import { ShuffleResultWrapper } from './ShuffleResultWrapper';
import { chooseOneRequest, ChooseOneResult, rpsRequest, RpsResult, shuffleRequest, ShuffleResult } from './request';

export function Shuffle() {
  const candidates = useAppSelector(currentCandidateValue)
  const dispatch = useAppDispatch();

  const defaultName = "しゃっふる太郎1";
  const [name, setName] = useState(defaultName);
  const [result, setResult] = useState<ShuffleResult|ChooseOneResult|RpsResult|null>(null);

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
    <div>
      <div>candidates</div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => {
        dispatch(addCandidate(name));
        const result = name.match(/^(?<n>.+)(?<i>\d+)$/)
        if (result && result.groups) {
          const { n, i } = result.groups;
          setName(n + (parseInt(i) + 1));
          return;
        }
        setName(name);
      }}>+</button>
      {candidates.map(c => {
        return (
          <div key={c.id}>
            <li>{c.name}</li>
            <button onClick={() => dispatch(removeCandidate(c.id))}>削除</button>
          </div>
        ); 
      })}


      <div>
        <button onClick={ handleShuffle_ }>シャッフル</button>
        <button onClick={ handleChooseOne_ }>1つ選ぶ</button>
        <button onClick={ handleRps_ }>じゃんけん</button>
      </div>
      {result && <ShuffleResultWrapper candidates={candidates.map(c => c.name)} results={result} />}
    </div>
  )
}