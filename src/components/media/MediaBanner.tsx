import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import "../../styles/media.scss";

interface Props extends RouteComponentProps<any> {
  query: DocumentNode;
  comment: string;
}

export default withRouter<Props, any>(({ query, comment, history }: Props) => {
  const { data, loading } = useQuery(query);
  if (!loading && data) {
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
