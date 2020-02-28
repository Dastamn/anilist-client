import React, { ReactNode, CSSProperties } from "react";
import "../styles/list.scss";

interface Props {
  title?: string;
  children: ReactNode[];
  style?: React.CSSProperties;
  listStyle?: CSSProperties;
}

export default ({ title, children, style, listStyle }: Props) =>
  children.length ? (
    <div className="list-container" style={style}>
      {title && <h1>{title}</h1>}
      <div className="list" style={listStyle}>
        {children}
      </div>
    </div>
  ) : null;
