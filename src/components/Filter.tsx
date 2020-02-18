import React, { useState } from "react";
import { ReactComponent as Next } from "../assets/next.svg";
import "../styles/filter.scss";

interface Props {
  title: string;
  filters: {
    active?: boolean;
    name: string;
    callback?: () => void;
  }[];
}

export default ({ title, filters }: Props) => {
  const [state, setState] = useState({
    open: false,
    selected: filters[0].name
  });
  return (
    <div className={`filter${state.open ? " open" : ""}`}>
      <div
        className="header"
        onClick={() => setState({ ...state, open: !state.open })}
      >
        <div className="header text">
          <h3>{title}</h3>
          <span>{state.selected}</span>
        </div>
        <Next width="30px" />
      </div>
      <div className={`toggles${!state.open ? " hidden" : ""}`}>
        {filters.map((filter, index) => (
          <span
            key={index}
            className={`toggle${
              filter.name === state.selected ? " active" : ""
            }`}
            onClick={() => setState({ ...state, selected: filter.name })}
          >
            {filter.name}
          </span>
        ))}
      </div>
    </div>
  );
};
