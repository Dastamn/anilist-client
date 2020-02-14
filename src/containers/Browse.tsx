import React from "react";
import { useQuery } from "@apollo/react-hooks";
import MediaList from "../components/MediaList";
import { getSeason } from "../util";
import { MediaType, ShortMedia, PaginatedMedia, Season } from "../types";
import { getMediaList } from "../api/queries";
import "../styles/browse.scss";
import { ApolloCurrentQueryResult } from "apollo-boost";

interface Props {
  type: MediaType;
}

export default ({ type }: Props) => {
  const trending: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, type, "TRENDING_DESC")
  );
  const topRanked: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, type, "SCORE_DESC")
  );
  const popular: ApolloCurrentQueryResult<PaginatedMedia> = useQuery(
    getMediaList(1, 10, type, "POPULARITY_DESC")
  );

  const date = new Date();
  const year = date.getFullYear();
  const season = getSeason(date);

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
      >{`${type.toLowerCase()}s`}</h1>
      {type === "ANIME" && (
        <section>
          <MediaList
            title={`Seasonal - ${season ? season.toLowerCase() : ""} ${year}`}
            data={
              seasonal.data
                ? seasonal.data.Page.media.map(media => ({
                    id: media.id,
                    type: media.type,
                    title: media.title.romaji,
                    cover: media.coverImage.extraLarge,
                    format: media.format,
                    genres: media.genres,
                    source: media.source,
                    averageScore: media.averageScore
                  }))
                : undefined
            }
            error={seasonal.error?.message}
          />
        </section>
      )}
      <section>
        <MediaList
          title="Trending"
          data={
            trending.data
              ? trending.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  cover: media.coverImage.extraLarge,
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
          <MediaList
            title="Upcoming"
            data={
              upcoming.data
                ? upcoming.data.Page.media.map(media => ({
                    id: media.id,
                    type: media.type,
                    title: media.title.romaji,
                    cover: media.coverImage.extraLarge,
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
        <MediaList
          title="Top Ranked"
          data={
            topRanked.data
              ? topRanked.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  cover: media.coverImage.extraLarge,
                  format: media.format,
                  genres: media.genres,
                  source: media.source,
                  averageScore: media.averageScore
                }))
              : undefined
          }
          error={topRanked.error?.message}
        />
      </section>
      <section>
        <MediaList
          title="Most Popular"
          data={
            popular.data
              ? popular.data.Page.media.map(media => ({
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  cover: media.coverImage.extraLarge,
                  format: media.format,
                  genres: media.genres,
                  source: media.source,
                  averageScore: media.averageScore
                }))
              : undefined
          }
          error={popular.error?.message}
        />
      </section>
    </div>
  );
};
