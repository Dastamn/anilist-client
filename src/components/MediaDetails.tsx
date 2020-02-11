import React from "react";
import "../styles/media.scss";

interface Props {
  data: { [key: string]: string | number | JSX.Element | null };
}

export default ({ data }: Props) => {
  const filtereddata = Object.entries(data).reduce(
    (a, [k, v]) => (v == null ? a : { ...a, [k]: v }),
    {}
  );
  return (
    <div className="media-details">
      {Object.keys(filtereddata).map(
        key =>
          data[key] && (
            <div key={key} className="media-details elem">
              <span style={{ fontWeight: "bold" }}>{key}</span>
              <span>{data[key]}</span>
            </div>
          )
      )}
    </div>
  );
};
