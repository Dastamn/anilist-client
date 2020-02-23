import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import List from "../components/List";
import MediaGroupList from "../components/media/MediaGroupList";
import MediaCard from "../components/media/MediaCard";
import MediaBanner from "../components/media/MediaBanner";
import { getMediaByType, getMediaList } from "../apollo/queries/remote";
import { ApolloCurrentQueryResult } from "apollo-boost";
import { PaginatedMedia } from "../types";
import { genres, selectRandom } from "../util";
import "../styles/browse.scss";

export default () => {
  const [state, setState] = useState({
    genres: [] as string[]
  });

  useEffect(() => {
    setState({ genres: selectRandom(genres, 5) });
  }, []);

  const bannerListData = [
    {
      query: getMediaByType("MANGA", "FAVOURITES_DESC", "RELEASING"),
      comment: "Current Favourite"
    },
    ...state.genres.map(genre => ({
      query: getMediaByType(
        "MANGA",
        "SCORE_DESC",
        "RELEASING",
        undefined,
        undefined,
        [genre]
      ),
      comment: `Best ${genre}`
    }))
  ];

  const trending: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 20, "MANGA", "TRENDING_DESC")
  );
  const topRanked: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 20, "MANGA", "SCORE_DESC")
  );
  const popular: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 20, "MANGA", "POPULARITY_DESC")
  );

  return (
    <div className="browse">
      <section>
        <h1 className="title">Manga</h1>
      </section>
      <section style={{ marginBottom: 0 }}>
        <List>
          {bannerListData.map((media, index) => (
            <MediaBanner
              key={index}
              query={media.query}
              comment={media.comment}
            />
          ))}
        </List>
      </section>
      <section>
        <List title="Trending">
          {trending.data
            ? trending.data.Page.media.map((media, index) => (
                <MediaCard
                  key={index}
                  data={{
                    id: media.id,
                    type: media.type,
                    title: media.title.romaji,
                    coverImage: media.coverImage.large,
                    format: media.format,
                    genres: media.genres,
                    source: media.source,
                    averageScore: media.averageScore
                  }}
                />
              ))
            : undefined}
        </List>
      </section>
      <section>
        <MediaGroupList
          title="Top Ranked"
          data={
            topRanked.data
              ? topRanked.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.medium,
                  format: media.format,
                  genres: media.genres,
                  source: media.source,
                  averageScore: media.averageScore
                }))
              : undefined
          }
        />
      </section>
      <section style={{ marginBottom: 0 }}>
        <MediaGroupList
          title="Most Popular"
          data={
            popular.data
              ? popular.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.medium,
                  format: media.format,
                  genres: media.genres,
                  source: media.source,
                  averageScore: media.averageScore
                }))
              : undefined
          }
        />
      </section>
    </div>
  );
};
