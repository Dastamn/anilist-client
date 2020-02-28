import React, { CSSProperties } from "react";
import fusion from "../assets/gifs/fusion.gif";
import vegeta from "../assets/gifs/vegeta.gif";
import luffyFight from "../assets/gifs/luffy_fight.gif";
import luffyFocus from "../assets/gifs/luffy_focus.gif";
import narutoAttack from "../assets/gifs/naruto_attack.gif";
import narutoFoxAttack from "../assets/gifs/naruto_fox_attack.gif";
import sakura from "../assets/gifs/sakura.gif";
import { ApolloError } from "apollo-boost";
import "../styles/loading.scss";

interface Props {
  error?: ApolloError;
  style?: CSSProperties;
}

const array = [
  fusion,
  vegeta,
  luffyFight,
  luffyFocus,
  narutoAttack,
  narutoFoxAttack
];

export default ({ error, style }: Props) => {
  const image = array[Math.floor(Math.random() * array.length)];
  return (
    <div className="loading" style={style}>
      {error ? (
        <div className="loading error">
          <img alt="ERROR" src={sakura} />
          <span>
            {error.networkError
              ? "Please check your internet connection..."
              : "Somehting happened, I'm trying again..."}
          </span>
        </div>
      ) : (
        <img src={image} alt="Loading..." />
      )}
    </div>
  );
};
