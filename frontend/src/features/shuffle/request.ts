export async function shuffleRequest(
  candidates: string[]
): Promise<ShuffleResult> {
  return shuffleLogic(candidates)
}

export async function chooseOneRequest(
  candidates: string[]
): Promise<ChooseOneResult> {
  return chooseOneLogic(candidates)
}

export async function rpsRequest(candidates: string[]): Promise<RpsResult> {
  return rpsLogic(candidates)
}

function fisherYatesShuffle_(candidates: string[]): string[] {
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }
  return candidates
}

export type ShuffleResult = {
  candidates: string[]
  type: "Shuffle"
  result: string[]
}

export type ChooseOneResult = {
  candidates: string[]
  type: "ChooseOne"
  result: string
}

const RockPaperScissor = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSOR: "scissor",
} as const

export type RockPaperScissorType =
  typeof RockPaperScissor[keyof typeof RockPaperScissor]

export type RpsResult = {
  candidates: string[]
  type: "Rps"
  result: {
    name: string
    rps: RockPaperScissorType
  }[]
  state: {
    type: "draw" | "finished"
    winner:
      | {
          name: string
          rps: RockPaperScissorType
        }[]
      | null
  }
}

/**
 *
 * @param result
 * @returns
 */
function judgeRockPagerScissor(result: {
  rock: string[]
  paper: string[]
  scissor: string[]
}):
  | {
      type: "draw"
      winner: null
    }
  | {
      type: "finished"
      winner: {
        name: string
        rps: RockPaperScissorType
      }[]
    } {
  const rockCount = result.rock.length
  const paperCount = result.paper.length
  const scissorCount = result.scissor.length
  const kindCount =
    (rockCount > 0 ? 1 : 0) +
    (paperCount > 0 ? 1 : 0) +
    (scissorCount > 0 ? 1 : 0)
  if (kindCount === 0 || kindCount === 1 || kindCount === 3) {
    return { type: "draw", winner: null }
  }

  if (rockCount >= 1 && paperCount >= 1) {
    return {
      type: "finished",
      winner: result.paper.map((p) => {
        return {
          name: p,
          rps: RockPaperScissor.PAPER,
        }
      }),
    }
  }

  if (rockCount >= 1 && scissorCount >= 1) {
    return {
      type: "finished",
      winner: result.rock.map((r) => {
        return {
          name: r,
          rps: RockPaperScissor.ROCK,
        }
      }),
    }
  }

  if (scissorCount >= 1 && paperCount >= 1) {
    return {
      type: "finished",
      winner: result.scissor.map((s) => {
        return {
          name: s,
          rps: RockPaperScissor.SCISSOR,
        }
      }),
    }
  }

  return { type: "draw", winner: null }
}

/**
 * @param candidates
 * @returns
 */
function rockPaperScissor(candidates: string[]):
  | {
      type: "draw"
      result: {
        name: string
        rps: RockPaperScissorType
      }[]
      winner: null
    }
  | {
      type: "finished"
      result: {
        name: string
        rps: RockPaperScissorType
      }[]
      winner: {
        name: string
        rps: RockPaperScissorType
      }[]
    } {
  const rpsCount: {
    rock: string[]
    paper: string[]
    scissor: string[]
  } = {
    rock: [],
    paper: [],
    scissor: [],
  }
  const result = candidates.map((c) => {
    const n = Math.floor(Math.random() * 3)
    if (n === 0) {
      rpsCount.rock.push(c)
      return {
        rps: RockPaperScissor.ROCK,
        name: c,
      }
    } else if (n === 1) {
      rpsCount.paper.push(c)
      return {
        rps: RockPaperScissor.PAPER,
        name: c,
      }
    }
    rpsCount.scissor.push(c)
    return {
      rps: RockPaperScissor.SCISSOR,
      name: c,
    }
  })
  return { ...judgeRockPagerScissor(rpsCount), result }
}

const shuffleLogic = async (candidates: string[]): Promise<ShuffleResult> => {
  return {
    candidates,
    type: "Shuffle",
    result: fisherYatesShuffle_([...candidates]),
  }
}

const chooseOneLogic = async (
  candidates: string[]
): Promise<ChooseOneResult> => {
  return {
    candidates,
    type: "ChooseOne",
    result: candidates[Math.floor(Math.random() * candidates.length)],
  }
}

const rpsLogic = async (candidates: string[]): Promise<RpsResult> => {
  const result = rockPaperScissor(candidates)

  return {
    candidates,
    type: "Rps",
    result: result.result,
    state: {
      type: result.type,
      winner: result.winner,
    },
  }
}
