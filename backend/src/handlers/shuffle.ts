import { Request, Response } from "express";

function fisherYatesShuffle_(candidates: string[]): string[] {
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates;
}

/**
 * 空配列はtrue
 * @param arr any[]
 * @returns string[] | false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertStringArray_(arr: any[]): string[] | false {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") {
      return false;
    }
  }

  return arr;
}

/**
 * @param req Request
 * @return string[]
 */
function getCandidates(req: Request): string[] {
  const { query } = req;
  const { candidates = [] } = query;

  if (Array.isArray(candidates)) {
    const assertedCandidates = assertStringArray_(candidates);
    return assertedCandidates || [];
  }

  return typeof candidates === "string" ? candidates.split(",") : [];
}

type ShuffleResult = {
  candidates: string[];
  result: string[];
};

type ChooseOneResult = {
  candidates: string[];
  result: string;
};

const RockPaperScissor = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSOR: "scissor",
} as const;

type RockPaperScissorType =
  typeof RockPaperScissor[keyof typeof RockPaperScissor];

type RpsResult = {
  candidates: string[];
  result: {
    name: string;
    rps: RockPaperScissorType;
  }[];
  state: {
    type: "draw" | "finished";
    winner:
      | {
          name: string;
          rps: RockPaperScissorType;
        }[]
      | null;
  };
};

/**
 *
 * @param result
 * @returns
 */
function judgeRockPagerScissor(result: {
  rock: string[];
  paper: string[];
  scissor: string[];
}):
  | {
      type: "draw";
      winner: null;
    }
  | {
      type: "finished";
      winner: {
        name: string;
        rps: RockPaperScissorType;
      }[];
    } {
  const rockCount = result.rock.length;
  const paperCount = result.paper.length;
  const scissorCount = result.scissor.length;
  const kindCount =
    (rockCount > 0 ? 1 : 0) +
    (paperCount > 0 ? 1 : 0) +
    (scissorCount > 0 ? 1 : 0);
  if (kindCount === 0 || kindCount === 1 || kindCount === 3) {
    return { type: "draw", winner: null };
  }

  if (rockCount >= 1 && paperCount >= 1) {
    return {
      type: "finished",
      winner: result.paper.map((p) => {
        return {
          name: p,
          rps: RockPaperScissor.PAPER,
        };
      }),
    };
  }

  if (rockCount >= 1 && scissorCount >= 1) {
    return {
      type: "finished",
      winner: result.rock.map((r) => {
        return {
          name: r,
          rps: RockPaperScissor.ROCK,
        };
      }),
    };
  }

  if (scissorCount >= 1 && paperCount >= 1) {
    return {
      type: "finished",
      winner: result.scissor.map((s) => {
        return {
          name: s,
          rps: RockPaperScissor.SCISSOR,
        };
      }),
    };
  }

  return { type: "draw", winner: null };
}

/**
 * @param candidates
 * @returns
 */
function rockPaperScissor(candidates: string[]):
  | {
      type: "draw";
      result: {
        name: string;
        rps: RockPaperScissorType;
      }[];
      winner: null;
    }
  | {
      type: "finished";
      result: {
        name: string;
        rps: RockPaperScissorType;
      }[];
      winner: {
        name: string;
        rps: RockPaperScissorType;
      }[];
    } {
  const rpsCount: {
    rock: string[];
    paper: string[];
    scissor: string[];
  } = {
    rock: [],
    paper: [],
    scissor: [],
  };
  const result = candidates.map((c) => {
    const n = Math.floor(Math.random() * 3);
    if (n === 0) {
      rpsCount.rock.push(c);
      return {
        rps: RockPaperScissor.ROCK,
        name: c,
      };
    } else if (n === 1) {
      rpsCount.paper.push(c);
      return {
        rps: RockPaperScissor.PAPER,
        name: c,
      };
    }
    rpsCount.scissor.push(c);
    return {
      rps: RockPaperScissor.SCISSOR,
      name: c,
    };
  });
  return { ...judgeRockPagerScissor(rpsCount), result };
}

export const shuffleHandler = (req: Request, res: Response<ShuffleResult>) => {
  const candidates = getCandidates(req);
  return res.json({
    candidates,
    result: fisherYatesShuffle_([...candidates]),
  });
};

export const chooseOneHandler = (
  req: Request,
  res: Response<ChooseOneResult>
) => {
  const candidates = getCandidates(req);
  return res.send({
    candidates,
    result: candidates[Math.floor(Math.random() * candidates.length)],
  });
};

export const rpsHandler = (req: Request, res: Response<RpsResult>) => {
  const candidates = getCandidates(req);
  const result = rockPaperScissor(candidates);

  return res.send({
    candidates,
    result: result.result,
    state: {
      type: result.type,
      winner: result.winner,
    },
  });
};
