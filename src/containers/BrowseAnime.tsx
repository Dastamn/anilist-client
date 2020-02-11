import React from "react";
import "../styles/display.scss";
import { useQuery } from "@apollo/react-hooks";
import MediaList from "../components/MediaList";
import { getSeason } from "../util";
import { getSeasonalAnime, getSortedAnimes } from "../api/queries/anime";

export default () => {
  const date = new Date();
  const year = date.getFullYear();
  const season = getSeason(date);
  const trending = useQuery(getSortedAnimes(1, 10, "TRENDING_DESC"));
  const seasonal = useQuery(getSeasonalAnime(1, 50, season, year));
  const upcoming = useQuery(
    getSeasonalAnime(
      1,
      50,
      getSeason(new Date(date.setMonth(date.getMonth() + 1))),
      year
    )
  );
  const popular = useQuery(getSortedAnimes(1, 10, "POPULARITY_DESC"));
  const topRanked = useQuery(getSortedAnimes(1, 10, "SCORE_DESC"));

  return (
    <div className="display">
      <h1 style={{ fontSize: "2.5em", marginBottom: "30px" }}>Animes</h1>
      <section id="list">
        <MediaList
          title={`Seasonal - ${season.toLowerCase()} ${year}`}
          data={
            seasonal.data
              ? seasonal.data.Page.media.map(
                  ({
                    id,
                    type,
                    title,
                    coverImage,
                    format,
                    genres,
                    averageScore
                  }: any) => ({
                    title: title.romaji,
                    cover: coverImage.extraLarge,
                    id: id,
                    type: type,
                    format,
                    genres,
                    score: averageScore
                  })
                )
              : undefined
          }
          error={seasonal.error?.message}
        />
      </section>
      <section id="list">
        <MediaList
          title="Trending"
          data={
            trending.data
              ? trending.data.Page.media.map(
                  ({
                    id,
                    type,
                    title,
                    coverImage,
                    format,
                    genres,
                    averageScore
                  }: any) => ({
                    title: title.romaji,
                    cover: coverImage.extraLarge,
                    id: id,
                    type: type,
                    format,
                    genres,
                    score: averageScore
                  })
                )
              : undefined
          }
          error={trending.error?.message}
        />
      </section>
      <section id="list">
        <MediaList
          title="Upcoming"
          data={
            upcoming.data
              ? upcoming.data.Page.media.map(
                  ({
                    id,
                    type,
                    title,
                    coverImage,
                    format,
                    genres,
                    averageScore
                  }: any) => ({
                    title: title.romaji,
                    cover: coverImage.extraLarge,
                    id: id,
                    type: type,
                    format,
                    genres,
                    score: averageScore
                  })
                )
              : undefined
          }
          error={upcoming.error?.message}
        />
      </section>
      <section id="list">
        <MediaList
          title="Top Ranked"
          data={
            topRanked.data
              ? topRanked.data.Page.media.map(
                  ({
                    id,
                    type,
                    title,
                    coverImage,
                    format,
                    genres,
                    averageScore
                  }: any) => ({
                    title: title.romaji,
                    cover: coverImage.extraLarge,
                    id: id,
                    type: type,
                    format,
                    genres,
                    score: averageScore
                  })
                )
              : undefined
          }
          error={topRanked.error?.message}
        />
      </section>
      <section id="last">
        <MediaList
          title="Most Popular"
          data={
            popular.data
              ? popular.data.Page.media.map(
                  ({
                    id,
                    type,
                    title,
                    coverImage,
                    format,
                    genres,
                    averageScore
                  }: any) => ({
                    title: title.romaji,
                    cover: coverImage.extraLarge,
                    id: id,
                    type: type,
                    format,
                    genres,
                    score: averageScore
                  })
                )
              : undefined
          }
          error={popular.error?.message}
        />
      </section>
    </div>
  );
};
