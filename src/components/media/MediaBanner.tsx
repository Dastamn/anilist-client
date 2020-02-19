import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { ApolloCurrentQueryResult } from "apollo-boost";
import "../../styles/media.scss";
import { MediaType } from "../../types";

interface IMediaBanner {
  id: number;
  type: MediaType;
  title: { romaji: string };
  bannerImage: string;
  coverImage: { extraLarge: string };
}

interface Props extends RouteComponentProps<any> {
  query: DocumentNode;
  comment: string;
}

export default withRouter<Props, any>(({ query, comment, history }: Props) => {
  const res: ApolloCurrentQueryResult<{ Media: IMediaBanner }> = useQuery(
    query
  );
  const { data } = res;
  if (data) {
    const { Media } = data;
    return (
      <div
        className="banner-media"
        onClick={() => history.push(`/${Media.type.toLowerCase()}/${Media.id}`)}
      >
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
      </div>
    );
  }
  return null;
});
