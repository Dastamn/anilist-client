import React from "react";
import { IMediaCard, MediaCardSize, IMediaBanner } from "../types";
import "../styles/media.scss";
import MediaCard from "./media/MediaCard";
import Loading from "./Loading";

interface Props {
  title?: string;
  data: IMediaCard[] | undefined;
  size?: MediaCardSize;
  error?: string | undefined;
}

export default (props: Props) => {
  const { title, data, size, error } = props;
  return (
    <div className="media-list-container">
      {title && <h1>{title}</h1>}
      {data ? (
        <div className="media-list">
          {data.map((media, index) => (
            <MediaCard key={index} data={media} size={size} />
          ))}
        </div>
      ) : (
        <Loading error={error} />
      )}
    </div>
  );
};
