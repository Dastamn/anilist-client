import React from "react";
import Character from "./Character";
import { ICharacter } from "../types";
import "../styles/media.scss";

interface Props {
  data: ICharacter[];
}

export default ({ data }: Props) => {
  return (
    <div className="media-list-container">
      <h1>Characters</h1>
      <div className="media-list">
        {data.map((character, index) => (
          <Character key={index} data={character} />
        ))}
      </div>
    </div>
  );
};
