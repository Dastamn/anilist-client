import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import List from "../components/List";
import MediaGroupList from "../components/media/MediaGroupList";
import MediaCard from "../components/media/MediaCard";
import MediaBanner from "../components/media/MediaBanner";
import {
  getSortedMediaByStatus,
  getMediaList,
  getSortedMedia
} from "../api/queries";
import { ApolloCurrentQueryResult } from "apollo-boost";
import { PaginatedMedia } from "../types";
import { genres, tags, selectRandom, getSeason } from "../util";
import "../styles/browse.scss";

export default () => {
  const date = new Date();
  const year = date.getFullYear();
  const season = getSeason(date);

  const [state, setState] = useState({
    genres: [] as string[]
  });

  useEffect(() => {
    setState({ genres: selectRandom(genres, 5) });
  }, []);

  const bannerListData = [
    {
      query: getSortedMedia(
        "ANIME",
        "FAVOURITES_DESC",
        undefined,
        undefined,
        season,
        year
      ),
      comment: "Favourite this season"
    },
    ...state.genres.map(genre => ({
      query: getSortedMediaByStatus("ANIME", "SCORE_DESC", "RELEASING", [
        genre
      ]),
      comment: `Best ${genre}`
    })),
    ...tags.map(tag => ({
      query: getSortedMediaByStatus(
        "ANIME",
        "SCORE_DESC",
        "RELEASING",
        undefined,
        [tag]
      ),
      comment: `Best ${tag}`
    }))
  ];

  const trending: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, "ANIME", "TRENDING_DESC")
  );
  const topRanked: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 20, "ANIME", "SCORE_DESC")
  );
  const popular: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 20, "ANIME", "POPULARITY_DESC")
  );

  const seasonal: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 50, "ANIME", undefined, season, year)
  );
  const upcoming: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(
      1,
      50,
      "ANIME",
      undefined,
      getSeason(new Date(date.setMonth(date.getMonth() + 1))),
      year
    )
  );

  return (
    <div className="browse">
      <section>
        <h1 className="title">Anime</h1>
      </section>
      <section>
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
          title={`Seasonal - ${season ? season.toLowerCase() : ""} ${year}`}
          data={
            seasonal.data
              ? seasonal.data.Page.media.map(media => ({
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
      <section>
        <List title="Upcoming">
          {upcoming.data &&
            upcoming.data.Page.media.map((media, index) => (
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
            ))}
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
