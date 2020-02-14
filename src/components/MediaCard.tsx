import React from "react";
import "../styles/media.scss";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IMediaCard } from "../types";
import { prettyString, styleScore } from "../util";

interface Props extends RouteComponentProps<any> {
  data: IMediaCard;
  open?: boolean;
}

const Media = (props: Props) => {
  const {
    data: { id, type, title, cover, format, genres, averageScore, source },
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
          <span id="header">
            {prettyString(type === "ANIME" ? format : source)}
          </span>
          <h1 style={{ margin: 0 }}>{title}</h1>
          {genres && (
            <span>
              {genres.reduce(
                (acc, curr) => (acc ? acc + ", " + curr : curr),
                ""
              )}
            </span>
          )}
          {styleScore(averageScore)}
        </div>
      </div>
    </div>
  );
};

export default withRouter<Props, any>(Media);
