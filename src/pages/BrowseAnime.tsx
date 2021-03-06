import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_GENRES, GET_FEATURED_MEDIA } from "../apollo/queries/local";
import GroupedListView from "../ui/GroupedListView";
import ListView from "../ui/ListView";
import MediaCard from "../components/media/MediaCard";
import MediaBanner from "../components/media/MediaBanner";
import { getMediaList, getMediaByType } from "../apollo/queries/remote";
import { ShortMedia } from "../types";
import { getSeason, nextSeason } from "../util";
import { client } from "../apollo";
import "../styles/browse.scss";

export default () => {
  const date = new Date();
  const year = date.getFullYear();
  const season = getSeason(date);

  client.writeQuery({
    query: GET_FEATURED_MEDIA,
    data: {
      featuredMedia: []
    }
  });
  const cache = client.readQuery({ query: GET_GENRES });

  const bannerListData = [
    {
      query: getMediaByType(
        "ANIME",
        "FAVOURITES_DESC",
        undefined,
        season,
        year
      ),
      force: true,
      comment: "Favourite this season"
    },
    ...cache.genres.map((genre: string) => ({
      query: getMediaByType(
        "ANIME",
        "POPULARITY_DESC",
        undefined,
        season,
        year,
        [genre]
      ),
      comment: `Best ${genre}`
    }))
  ];

  const trending = useQuery(getMediaList(1, 20, "ANIME", "TRENDING_DESC"));
  const topRanked = useQuery(getMediaList(1, 20, "ANIME", "SCORE_DESC"));
  const popular = useQuery(getMediaList(1, 20, "ANIME", "POPULARITY_DESC"));

  const seasonal = useQuery(
    getMediaList(1, 50, "ANIME", undefined, season, year)
  );
  const upcoming = useQuery(
    getMediaList(1, 50, "ANIME", undefined, nextSeason(season), year)
  );

  if (trending.error) {
    console.log(trending.error);

    trending.startPolling(1500);
  }
  if (topRanked.error) {
    topRanked.startPolling(1500);
  }
  if (popular.error) {
    popular.startPolling(1500);
  }
  if (seasonal.error) {
    seasonal.startPolling(1500);
  }
  if (upcoming.error) {
    upcoming.startPolling(1500);
  }

  if (trending.data && !trending.loading) {
    trending.stopPolling();
  }
  if (topRanked.data && !topRanked.loading) {
    topRanked.stopPolling();
  }
  if (popular.data && !popular.loading) {
    popular.stopPolling();
  }
  if (seasonal.data && !seasonal.loading) {
    seasonal.stopPolling();
  }
  if (upcoming.data && !upcoming.loading) {
    upcoming.stopPolling();
  }

  return (
    <div className="browse">
      <h1 className="title">Anime</h1>
      <ListView>
        {bannerListData.map((banner, index) => (
          <MediaBanner
            key={index}
            query={banner.query}
            comment={banner.comment}
            force={banner.force}
          />
        ))}
      </ListView>
      <ListView title="Trending">
        {trending.data
          ? trending.data.Page.media.map((media: ShortMedia, index: number) => (
              <MediaCard
                key={index}
                data={{
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.large,
                  format: media.format,
                  genres: media.genres,
                  averageScore: media.averageScore
                }}
              />
            ))
          : []}
      </ListView>
      <GroupedListView
        title={`Seasonal - ${season ? season.toLowerCase() : ""} ${year}`}
      >
        {seasonal.data
          ? seasonal.data.Page.media.map((media: ShortMedia, index: number) => (
              <MediaCard
                key={index}
                data={{
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.medium,
                  format: media.format,
                  genres: media.genres,
                  averageScore: media.averageScore
                }}
                size="SMALL"
              />
            ))
          : []}
      </GroupedListView>
      <ListView title="Upcoming">
        {upcoming.data
          ? upcoming.data.Page.media.map((media: ShortMedia, index: number) => (
              <MediaCard
                key={index}
                data={{
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.large,
                  format: media.format,
                  genres: media.genres,
                  averageScore: media.averageScore
                }}
              />
            ))
          : []}
      </ListView>
      <GroupedListView title="Top Ranked">
        {topRanked.data
          ? topRanked.data.Page.media.map(
              (media: ShortMedia, index: number) => (
                <MediaCard
                  key={index}
                  data={{
                    id: media.id,
                    type: media.type,
                    title: media.title.romaji,
                    coverImage: media.coverImage.medium,
                    format: media.format,
                    genres: media.genres,
                    averageScore: media.averageScore
                  }}
                  size="SMALL"
                />
              )
            )
          : []}
      </GroupedListView>
      <GroupedListView title="Most Popular" style={{ marginBottom: 0 }}>
        {popular.data
          ? popular.data.Page.media.map((media: ShortMedia, index: number) => (
              <MediaCard
                key={index}
                data={{
                  id: media.id,
                  type: media.type,
                  title: media.title.romaji,
                  coverImage: media.coverImage.medium,
                  format: media.format,
                  genres: media.genres,
                  averageScore: media.averageScore
                }}
                size="SMALL"
              />
            ))
          : []}
      </GroupedListView>
    </div>
  );
};
