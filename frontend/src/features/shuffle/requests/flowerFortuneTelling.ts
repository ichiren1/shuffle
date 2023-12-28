export type FlowerFortuneTellingResult = {
  candidates: string[];
  type: "FlowerFortuneTelling";
  result: string[];
  date: Date;
};

export const flowerFortuneTellingRequest = async (
  candidates: string[]
): Promise<FlowerFortuneTellingResult> => {
  return flowerFortuneTellingLogic(candidates);
};

const flowerFortuneTelling = async (
  candidates: string[]
): Promise<FlowerFortuneTellingResult> => {
  const result = [];
  const baseSize =
    candidates.length + Math.floor(Math.random() * candidates.length * 3);
  for (let i = 0; i < baseSize; i++) {
    result.push(candidates[Math.floor(Math.random() * candidates.length)]);
  }

  return {
    candidates,
    type: "FlowerFortuneTelling",
    result: result,
    date: new Date(),
  };
};

const flowerFortuneTellingLogic = async (
  candidates: string[]
): Promise<FlowerFortuneTellingResult> => {
  const result = flowerFortuneTelling(candidates);

  return result;
};
