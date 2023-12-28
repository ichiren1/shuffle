export type RouletteResult = {
  candidates: string[];
  type: "Roulette";
  result: string;
  date: Date;
};

export async function rouletteRequest(
  candidates: string[]
): Promise<RouletteResult> {
  return rouletteLogic(candidates);
}

const rouletteLogic = async (candidates: string[]): Promise<RouletteResult> => {
  return {
    candidates,
    type: "Roulette",
    result: candidates[Math.floor(Math.random() * candidates.length)],
    date: new Date(),
  };
};
