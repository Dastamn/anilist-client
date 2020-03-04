import React, { ReactNode, CSSProperties } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { chunk } from "lodash";
import "../styles/list.scss";

interface Props {
  title?: string;
  children: ReactNode[];
  group?: number;
  style?: CSSProperties;
}

export default ({ children, group, title, style }: Props) => {
  if (children.length) {
    const groupedChildren = chunk(children, group || 2);
    return (
      <div className="list-container" style={style}>
        {title && <h1 style={{ marginBottom: "5px" }}>{title}</h1>}
        {groupedChildren.length ? (
          <div className="list">
            {groupedChildren.map((chunk, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {chunk.map((child, i) => (
                  <div
                    key={i}
                    style={
                      i === chunk.length - 1
                        ? { margin: "5px 12px 0 0" }
                        : { margin: "5px 12px 5px 0" }
                    }
                  >
                    {child}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <LoadingScreen style={{ height: "297px" }} />
        )}
      </div>
    );
  }
  return <LoadingScreen style={{ height: "297px" }} />;
};
