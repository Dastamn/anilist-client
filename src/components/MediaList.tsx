import React from "react";
import { IMedia } from "../types";
import "../styles/media.scss";
import Media from "./Media";
import Loading from "./Loading";

interface Props {
  title: String;
  data: IMedia[] | undefined;
  error?: string | undefined;
}

export default (props: Props) => {
  const { title, data, error } = props;
  return (
    <div className="media-list-container">
      <h1>{title}</h1>
      {data ? (
        <div className="media-list">
          {data.map((media, index) => (
            <Media key={index} data={media} />
          ))}
        </div>
      ) : (
        <Loading error={error} />
      )}
    </div>
  );
};
