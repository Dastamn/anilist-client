import React from "react";
import "../../styles/media.scss";
import MediaBanner from "./MediaBanner";
import { DocumentNode } from "graphql";
import Loading from "../Loading";

interface Props {
  data: { query: DocumentNode; comment: string }[];
}

export default ({ data }: Props) => (
  <div className="media-list-container">
    {data ? (
      <div className="media-list">
        {data.map((elem, index) => (
          <MediaBanner key={index} query={elem.query} comment={elem.comment} />
        ))}
      </div>
    ) : (
      <Loading error={"Error"} />
    )}
  </div>
);
