import { ChooseOneResultPropType } from "../shuffle/ChooseOneResult";
import { RouletteResult } from "../shuffle/requests/roulette";
import { RpsResultPropType } from "../shuffle/RpsResult";
import { ShuffleResultPropType } from "../shuffle/ShuffleResult";
import "./TwitterShareButton.css";

export function TwitterShareButton(props: TwitterShareButtonPropType) {
  const generateResultText = (props: TwitterShareButtonPropType) => {
    switch (props.type) {
      case "Shuffle":
        return "シャッフルの結果\n" + props.result.join("\n") + "\n";
      case "ChooseOne":
        return "1人選ぶの結果\n『 " + props.result + " 』\n";
      case "Rps":
        return "じゃんけんの結果\n" + props.state.type === "draw"
          ? "あいこ\n"
          : "🏆Winner🏆\n" +
          props.state.winner
            ?.map((w) => {
              return "『 " + w.name + " 』";
            })
            .join("\n") +
          "\n";
      case "Roulette":
        return "ルーレットの結果\n『 " + props.result + " 』\n";
    }
  };

  const generateTwitterUrl = (result: string) => {
    const urlLengthMax = 2000; // パーセントエンコーディングで超えることがあるが、厳密には2000よりちょっと多いくらいなら問題ないはず
    const siteUrl = window.location.origin;
    const hashtag = "いちれんシャッフル";
    const twitterUrlPrefix = "https://twitter.com/intent/tweet";

    return `${twitterUrlPrefix}?url=${encodeURI(
      siteUrl
    )}&hashtags=${hashtag}&text=${encodeURI(
      result.length > urlLengthMax ? result.substring(0, urlLengthMax) : result
    )}`;
  };

  return (
    <a
      className="TwitterShareButton-share-link"
      href={generateTwitterUrl(generateResultText(props))}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="TwitterShareButton-twitter-icon"
        alt="twitter logo"
        src={window.location.origin + "/x-logo-black128.png"}
      ></img>
    </a>
  );
}

export type TwitterShareButtonPropType =
  | ShuffleResultPropType
  | ChooseOneResultPropType
  | RpsResultPropType
  | RouletteResult;
