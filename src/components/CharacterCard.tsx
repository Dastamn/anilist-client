import React from "react";
import { Link } from "react-router-dom";
import { ICharacter } from "../types";
import "../styles/character.scss";

interface Props {
  data: ICharacter;
}

export default ({ data: { id, name, role, image } }: Props) => (
  <Link
    to={`/character/${id}`}
    className="character"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .8) 90%, rgba(0, 0, 0, .8) 100%), url(${image})`
    }}
  >
    <span>{name}</span>
    <span style={{ color: "lightgray", fontSize: "13px" }}>{role}</span>
  </Link>
);
