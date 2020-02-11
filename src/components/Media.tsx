import React from "react";
import "../styles/media.scss";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IMedia } from "../types";
import { prettyString, styleScore } from "../util";

interface Props extends RouteComponentProps<any> {
  data: IMedia;
  open?: boolean;
}

const Media = (props: Props) => {
  const {
    data: { id, type, title, cover, format, genres, score, header },
    history,
    open
  } = props;
  return (
    <div
      className="media"
      onClick={() => history.push(`/${type.toLowerCase()}/${id}`)}
    >
      <div id="image" style={{ backgroundImage: `url(${cover})` }} />
      <div id={`info${open ? "-not-hidden" : ""}`}>
        <div id="text">
          {header && <span id="header">{header}</span>}
          <span id="header">{prettyString(format)}</span>
          <h1 style={{ margin: 0 }}>{title}</h1>
          {genres && (
            <span>
              {genres.reduce(
                (acc, curr) => (acc ? acc + ", " + curr : curr),
                ""
              )}
            </span>
          )}
          {styleScore(score)}
        </div>
      </div>
    </div>
  );
};

export default withRouter<Props, any>(Media);
