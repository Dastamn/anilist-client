import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import MediaList from "../components/MediaList";
import { getSeason, selectRandom } from "../util";
import {
  MediaType,
  ShortMedia,
  PaginatedMedia,
  Season,
  SortedMedia
} from "../types";
import {
  getMediaList,
  getSortedMediaByStatus,
  getSortedMedia
} from "../api/queries";
import "../styles/browse.scss";
import { ApolloCurrentQueryResult } from "apollo-boost";
import BannerList from "../components/media/BannerList";
import GroupList from "../components/media/GroupList";

interface Props {
  type: MediaType;
}

const genres = [
  "Comedy",
  "Fantasy",
  "Ecchi",
  "Romance",
  "Sports",
  "Psychological",
  "Supernatural"
];

const tags = ["Seinen", "Shounen", "Shoujo", "Harem", "Isekai"];

export default ({ type }: Props) => {
  const date = new Date();
  const year = date.getFullYear();
  const season = getSeason(date);

  const [state, setState] = useState({
    genres: [] as string[],
    tags: [] as string[]
  });

  useEffect(() => {
    setState({ genres: selectRandom(genres, 5), tags });
  }, []);

  const bannerListDate = [
    type === "ANIME"
      ? {
          query: getSortedMedia(
            type,
            "FAVOURITES_DESC",
            undefined,
            undefined,
            season,
            year
          ),
          comment: "Favourite this season"
        }
      : {
          query: getSortedMediaByStatus(type, "FAVOURITES_DESC", "RELEASING"),
          comment: "Current Favourite"
        },
    ...state.genres.map(genre => ({
      query: getSortedMediaByStatus(type, "SCORE_DESC", "RELEASING", [genre]),
      comment: `Best ${genre}`
    })),
    ...state.tags.map(tag => ({
      query: getSortedMediaByStatus(
        type,
        "SCORE_DESC",
        "RELEASING",
        undefined,
        [tag]
      ),
      comment: `Best ${tag}`
    }))
  ];

  const trending: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, type, "TRENDING_DESC")
  );
  const topRanked: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, type, "SCORE_DESC")
  );
  const popular: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, type, "POPULARITY_DESC")
  );

  const seasonal: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 50, type, undefined, season, year)
  );
  const upcoming: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(
      1,
      50,
      type,
      undefined,
      getSeason(new Date(date.setMonth(date.getMonth() + 1))),
      year
    )
  );

  return (
    <div className="browse">
      <h1
        style={{
          fontSize: "2.5em",
          marginBottom: "30px",
          textTransform: "capitalize"
        }}
      >
        {type.toLowerCase()}
      </h1>
      <BannerList data={bannerListDate} />
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
      {type === "ANIME" && (
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
      )}
      {type === "ANIME" && (
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
      )}
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
      <section>
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
