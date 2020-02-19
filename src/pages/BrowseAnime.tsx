import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import GroupList from "../components/media/GroupList";
import BannerList from "../components/media/BannerList";
import MediaList from "../components/MediaList";
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
        <BannerList data={bannerListData} />
      </section>
      <section>
        <MediaList
          title="Trending"
          data={
            trending.data
              ? trending.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.large,
                  format: media.format,
                  genres: media.genres,
                  source: media.source,
                  averageScore: media.averageScore
                }))
              : undefined
          }
          error={trending.error?.message}
        />
      </section>
      <section>
        <GroupList
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
        <MediaList
          title="Upcoming"
          data={
            upcoming.data
              ? upcoming.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.large,
                  format: media.format,
                  genres: media.genres,
                  source: media.source,
                  averageScore: media.averageScore
                }))
              : undefined
          }
          error={upcoming.error?.message}
        />
      </section>
      <section>
        <GroupList
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
        <GroupList
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
