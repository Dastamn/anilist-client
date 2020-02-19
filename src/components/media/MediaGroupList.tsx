import React from "react";
import { IMediaCard, MediaCardSize } from "../../types";
import "../../styles/media.scss";
import MediaCard from "./MediaCard";
import Loading from "../Loading";

interface Props {
  title: string;
  data: IMediaCard[] | undefined;
  group?: number;
}

export default ({ data, group, title }: Props) => {
  let groupedData = [];
  if (data) {
    for (let i = 0, end = data.length / (group || 2); i < end; i++) {
      groupedData.push(data.slice(i * (group || 2), (i + 1) * (group || 2)));
    }
  }
  return (
    <div className="media-list-container grouped">
      <h1 style={{ marginBottom: "5px" }}>{title}</h1>
      {groupedData.length > 0 ? (
        <div className="media-list">
          {groupedData.map((chunk, index) => (
            <div key={index} className="media-group">
              {chunk.map((media, i) => (
                <div
                  style={
                    i === chunk.length - 1
                      ? { margin: "5px 12px 0 0" }
                      : { margin: "5px 12px 5px 0" }
                  }
                >
                  <MediaCard key={index + i} data={media} size="SMALL" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
