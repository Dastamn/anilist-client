import React, { ReactNode, CSSProperties } from "react";
import "../styles/list.scss";
import LoadingScreen from "../components/LoadingScreen";

interface Props {
  title?: string;
  children: ReactNode[] | undefined;
  style?: React.CSSProperties;
  listStyle?: CSSProperties;
}

export default ({ title, children, style, listStyle }: Props) =>
  children ? (
    <div className="list-container" style={style}>
      {title && <h1>{title}</h1>}
      {children.length ? (
        <div className="list" style={listStyle}>
          {children}
        </div>
      ) : (
        <LoadingScreen style={{ height: "265px" }} />
      )}
    </div>
  ) : null;
