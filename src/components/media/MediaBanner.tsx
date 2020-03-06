import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { client } from "../../apollo";
import { GET_FEATURED_MEDIA } from "../../apollo/queries/local";
import { DocumentNode } from "graphql";
import "../../styles/media.scss";

interface Props {
  query: DocumentNode;
  comment: string;
  force?: boolean;
}

export default ({ query, comment, force }: Props) => {
  const location = useLocation();
  const { data, loading, startPolling, stopPolling } = useQuery(query);
  if (!loading && data) {
    stopPolling();
    const media = data.Media;
    const cache = client.readQuery({ query: GET_FEATURED_MEDIA });
    if (cache.featuredMedia.includes(media.id) && !force) {
      return null;
    }

    client.writeQuery({
      query: GET_FEATURED_MEDIA,
      data: {
        featuredMedia: [...cache.featuredMedia, media.id]
      }
    });

    return (
      <Link className="media-banner" to={`${location.pathname}/${media.id}`}>
        <div className="title">
          <h1>{media.title.romaji}</h1>
          <h2>{comment}</h2>
        </div>
        <div
          className="img"
          style={{
            backgroundImage: `url(${
              media.bannerImage
                ? media.bannerImage
                : media.coverImage.extraLarge
            })`
          }}
        />
      </Link>
    );
  }
  startPolling(1500);
  return null;
};
