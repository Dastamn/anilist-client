import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IMediaCard, MediaCardSize } from "../../types";
import { prettyString, styleScore } from "../../util";
import "../../styles/media.scss";

interface Props {
  data: IMediaCard;
  open?: boolean;
  size?: MediaCardSize;
}

export default (props: Props) => {
  const {
    data: { id, type, title, coverImage, format, genres, averageScore, source },
    size
  } = props;
  const location = useLocation();
  const genreString = genres.reduce(
    (acc, curr) => (acc ? acc + ", " + curr : curr),
    ""
  );
  return size === "SMALL" ? (
    <Link className="small-media" to={`${location.pathname}/${id}`}>
      <div className="img" style={{ backgroundImage: `url(${coverImage})` }} />
      <div className="text">
        <span className="header">
          {prettyString(type === "ANIME" ? format : source)}
        </span>
        <div style={{ maxHeight: "50px" }}>
          <h1>{title}</h1>
        </div>
        {genres && <span>{genreString}</span>}
        {styleScore(averageScore)}
      </div>
    </Link>
  ) : (
    <Link className="media" to={`${location.pathname}/${id}`}>
      <div className="img" style={{ backgroundImage: `url(${coverImage})` }} />
      <div className="info">
        <div className="text">
          <span className="header">
            {prettyString(type === "ANIME" ? format : source)}
          </span>
          <h1>{title}</h1>
          {genres && <span>{genreString}</span>}
          {styleScore(averageScore)}
        </div>
      </div>
    </Link>
  );
};
