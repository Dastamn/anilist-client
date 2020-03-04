import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import "../../styles/media.scss";

interface Props {
  query: DocumentNode;
  comment: string;
}

export default ({ query, comment }: Props) => {
  const location = useLocation();
  const { data, loading, startPolling, stopPolling } = useQuery(query);
  if (!loading && data) {
    stopPolling();
    const { Media } = data;
    return (
      <Link className="media-banner" to={`${location.pathname}/${Media.id}`}>
        <div className="title">
          <h1>{Media.title.romaji}</h1>
          <h2>{comment}</h2>
        </div>
        <div
          className="img"
          style={{
            backgroundImage: `url(${
              Media.bannerImage
                ? Media.bannerImage
                : Media.coverImage.extraLarge
            })`
          }}
        />
      </Link>
    );
  }
  startPolling(1500);
  return null;
};
