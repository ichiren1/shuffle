export type ShuffleResult = {
  candidates: string[];
  type: "Shuffle";
  result: string[];
};

export async function shuffleRequest(
  candidates: string[]
): Promise<ShuffleResult> {
  return shuffleLogic(candidates);
}

const shuffleLogic = async (candidates: string[]): Promise<ShuffleResult> => {
  return {
    candidates,
    type: "Shuffle",
    result: fisherYatesShuffle_([...candidates]),
  };
};

function fisherYatesShuffle_(candidates: string[]): string[] {
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates;
}
