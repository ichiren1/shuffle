export type EenyMeenyMinyMoeResult = {
  candidates: string[];
  type: "EenyMeenyMinyMoe";
  date: Date;
};

export const eenyMeenyMinyMoeRequest = async (
  candidates: string[]
): Promise<EenyMeenyMinyMoeResult> => {
  return Promise.resolve({
    candidates,
    type: "EenyMeenyMinyMoe",
    date: new Date(),
  });
};
