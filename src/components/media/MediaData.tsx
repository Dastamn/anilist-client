import React, { ReactNode } from "react";
import "../../styles/mediaData.scss";

interface Props {
  data: { [key: string]: string | number | ReactNode | null };
}

export default ({ data }: Props) => {
  const filtereddata = Object.entries(data).reduce(
    (a, [k, v]) => (v == null ? a : { ...a, [k]: v }),
    {}
  );
  return (
    <div className="media-data">
      {Object.keys(filtereddata).map(
        key =>
          data[key] && (
            <div key={key} className="elem">
              <span style={{ fontWeight: "bold" }}>{key}</span>
              <span>{data[key]}</span>
            </div>
          )
      )}
    </div>
  );
};
