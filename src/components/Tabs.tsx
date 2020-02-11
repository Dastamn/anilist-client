import React, { useState } from "react";
import "../styles/tabs.scss";

interface Props {
  data: { [key: string]: JSX.Element };
}

export default ({ data }: Props) => {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return null;
  }
  const [active, setActive] = useState(keys[0]);
  return (
    <div className="tabs">
      <div className="tab-header">
        {keys.map((key, index) => (
          <span
            id={key === active ? "active" : ""}
            key={index}
            onClick={() => setActive(key)}
          >
            {key}
          </span>
        ))}
      </div>
      <div className="tab-pane">{data[active]}</div>
    </div>
  );
};
