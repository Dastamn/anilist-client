import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "../styles/character.scss";
import { ICharacter } from "../types";

interface Props extends RouteComponentProps<any> {
  data: ICharacter;
}

const Character = ({ data: { id, name, role, image }, history }: Props) => {
  return (
    <div
      className="character"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .8) 90%, rgba(0, 0, 0, .8) 100%), 
    url(${image})`
      }}
      onClick={() => history.push(`/character/${id}`)}
    >
      <span>{name}</span>
      <span style={{ color: "lightgray", fontSize: "13px" }}>{role}</span>
    </div>
  );
};

export default withRouter<Props, any>(Character);
