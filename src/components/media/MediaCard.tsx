import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IMediaCard, MediaCardSize } from "../../types";
import { prettyString, styleScore } from "../../util";
import "../../styles/media.scss";

interface Props extends RouteComponentProps<any> {
  data: IMediaCard;
  open?: boolean;
  size?: MediaCardSize;
}

const Media = (props: Props) => {
  const {
    data: {
      id,
      type,
      title,
      coverImage,
      bannerImage,
      format,
      genres,
      averageScore,
      source,
      comment
    },
    size,
    history,
    open
  } = props;
  const genreString = genres.reduce(
    (acc, curr) => (acc ? acc + ", " + curr : curr),
    ""
  );
  return size === "SMALL" ? (
    <div
      className="small-media"
      onClick={() => history.push(`/${type.toLowerCase()}/${id}`)}
    >
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
    </div>
  ) : (
    <div
      className="media"
      onClick={() => history.push(`/${type.toLowerCase()}/${id}`)}
    >
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
    </div>
  );
};

export default withRouter<Props, any>(Media);
