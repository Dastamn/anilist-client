import React from "react";
import fusion from "../assets/gifs/fusion.gif";
import vegeta from "../assets/gifs/vegeta.gif";
import luffyFight from "../assets/gifs/luffy_fight.gif";
import luffyFocus from "../assets/gifs/luffy_focus.gif";
import narutoAttack from "../assets/gifs/naruto_attack.gif";
import narutoFoxAttack from "../assets/gifs/naruto_fox_attack.gif";
import sakura from "../assets/gifs/sakura.gif";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center"
      }}
    >
      {error ? (
        <>
          <img
            alt="error"
            src={sakura}
            style={{ marginTop: "25px", height: "100px" }}
          />
          <span
            style={{
              margin: "12px 30px 0 30px",
              fontSize: "13px",
              fontWeight: 500
            }}
          >
            {error}
          </span>
        </>
      ) : (
        <img src={loading} alt="Loading..." />
      )}
    </div>
  );
};
