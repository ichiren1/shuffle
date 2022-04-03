import { Request, Response } from 'express';

function fisherYatesShuffle_(candidates: string[]): string[] {
  for(var i =candidates.length-1 ; i>0 ;i--){
    var j = Math.floor( Math.random() * (i + 1) );
    [candidates[i],candidates[j]]=[candidates[j],candidates[i]];
  }
  return candidates
}

// 空配列はtrue
function assertStringArray_(arr: any[]): string[]|false {
  for (let i=0; i<arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      return false;
    }
  }

  return arr;
}

function getCandidates(req: Request): string[] {
  const { query } = req;
  const { candidates = [] } = query;

  if (Array.isArray(candidates)) {
    const assertedCandidates = assertStringArray_(candidates);
    return assertedCandidates || [];
  }

  return typeof candidates === 'string' ? candidates.split(",") : [];
}

type ShuffleResult = {
  candidates: string[],
  result: string[]
}

type ChooseOneResult = {
  candidates: string[],
  result: string
}

type RockPaperScissor = "rock" | "paper" | "scissor";

type RpsResult = {
  candidates: string[],
  result: {
    name: string,
    rps: RockPaperScissor
  }[],
  state: {
    type: "draw", 
  } | {
    type: "finished",
    winner: {
      name: string,
      rps: RockPaperScissor
    }[]
  }
}

export const shuffleHandler = (req: Request, res: Response<ShuffleResult>) => {
  const candidates = getCandidates(req);
  return res.json({
    candidates,
    result: fisherYatesShuffle_([...candidates])
  });
};

export const chooseOneHandler = (req: Request, res: Response<ChooseOneResult>) => {
  const candidates = getCandidates(req);
  return res.send({
    candidates,
    result: candidates[Math.floor(Math.random() * candidates.length)]
  });
};