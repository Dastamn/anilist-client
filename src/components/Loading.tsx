import React from "react";
import fusion from "../assets/gifs/fusion.gif";
import vegeta from "../assets/gifs/vegeta.gif";
import luffyFight from "../assets/gifs/luffy_fight.gif";
import luffyFocus from "../assets/gifs/luffy_focus.gif";
import narutoAttack from "../assets/gifs/naruto_attack.gif";
import narutoFoxAttack from "../assets/gifs/naruto_fox_attack.gif";
import sakura from "../assets/gifs/sakura.gif";
import "../styles/loading.scss";

interface Props {
  error?: string;
}

const array = [
  fusion,
  vegeta,
  luffyFight,
  luffyFocus,
  narutoAttack,
  narutoFoxAttack
];

export default ({ error }: Props) => {
  const loading = array[Math.floor(Math.random() * array.length)];
  return (
    <div className="loading">
      {error ? (
        <div className="loading error">
          <img alt="error" src={sakura} />
          <span>{error || "Something happened..."}</span>
        </div>
      ) : (
        <img src={loading} alt="Loading..." />
      )}
    </div>
  );
};
