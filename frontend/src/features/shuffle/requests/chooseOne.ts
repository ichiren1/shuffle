export type ChooseOneResult = {
  candidates: string[];
  type: "ChooseOne";
  result: string;
};

export async function chooseOneRequest(
  candidates: string[]
): Promise<ChooseOneResult> {
  return chooseOneLogic(candidates);
}

const chooseOneLogic = async (
  candidates: string[]
): Promise<ChooseOneResult> => {
  return {
    candidates,
    type: "ChooseOne",
    result: candidates[Math.floor(Math.random() * candidates.length)],
  };
};
