import React, { useState } from "react";
import "../styles/tabs.scss";

interface Props {
  data: { [key: string]: JSX.Element };
}

export default ({ data }: Props) => {
  const keys = Object.entries(data)
    .filter(entry => entry[1])
    .map(entry => entry[0]);
  if (keys.length === 0) {
    return null;
  }
  const [active, setActive] = useState(keys[0]);
  return (
    <div className="tabs">
      {keys.length > 1 && (
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
      )}
      <div className="tab-pane">{data[active]}</div>
    </div>
  );
};
