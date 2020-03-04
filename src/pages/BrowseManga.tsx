import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_GENRES } from "../apollo/queries/local";
import MediaCard from "../components/media/MediaCard";
import MediaBanner from "../components/media/MediaBanner";
import ListView from "../ui/ListView";
import GroupedListView from "../ui/GroupedListView";
import { getMediaByType, getMediaList } from "../apollo/queries/remote";
import { ShortMedia } from "../types";
import "../styles/browse.scss";

export default () => {
  const { data } = useQuery(GET_GENRES);

  const bannerListData = [
    {
      query: getMediaByType("MANGA", "FAVOURITES_DESC", "RELEASING"),
      comment: "Current Favourite"
    },
    ...data.genres.map((genre: string) => ({
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

  const trending = useQuery(getMediaList(1, 20, "MANGA", "TRENDING_DESC"));
  const topRanked = useQuery(getMediaList(1, 20, "MANGA", "SCORE_DESC"));
  const popular = useQuery(getMediaList(1, 20, "MANGA", "POPULARITY_DESC"));

  if (trending.error) {
    trending.startPolling(1500);
  }
  if (topRanked.error) {
    topRanked.startPolling(1500);
  }
  if (popular.error) {
    popular.startPolling(1500);
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

  return (
    <div className="browse">
      <h1 className="title">Manga</h1>
      <ListView>
        {bannerListData.map((media, index) => (
          <MediaBanner
            key={index}
            query={media.query}
            comment={media.comment}
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
                  source: media.source,
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
                    source: media.source,
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
                  source: media.source,
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
