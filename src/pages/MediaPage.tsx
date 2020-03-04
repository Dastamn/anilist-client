import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link, useParams } from "react-router-dom";
import Tabs from "../ui/Tabs";
import MediaCard from "../components/media/MediaCard";
import StatusDistribution from "../components/StatusDistribution";
import LoadingScreen from "../components/LoadingScreen";
import MediaData from "../components/media/MediaData";
import ListView from "../ui/ListView";
import MediaDescription from "../components/media/MediaDescription";
import MediaScore from "../components/media/MediaScore";
import lookup from "country-code-lookup";
import { getMediaById } from "../apollo/queries/remote";
import { prettyString, secondsToTime, formatDate } from "../util";
import { isEqual } from "lodash";
import { MediaType, ShortMedia, IMedia, RelationType } from "../types";
import "../styles/mediaPage.scss";
import "../styles/genre.scss";

interface Props {
  type: MediaType;
}

export default ({ type }: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const updateState = () =>
    setIsMobile(window.innerWidth <= 768 || window.orientation === 0);

  useEffect(() => {
    window.addEventListener("resize", updateState);
    window.addEventListener("orientationchange", updateState);
    return () => {
      window.removeEventListener("resize", updateState);
      window.removeEventListener("orientationchange", updateState);
    };
  }, []);

  const { id } = useParams();

  const { loading, data, error, startPolling, stopPolling } = useQuery(
    getMediaById(Number(id), type)
  );

  useEffect(() => {
    const banner = document.getElementById("banner");
    if (banner) {
      const callback = () => {
        let offset = window.pageYOffset;
        banner.style.backgroundPositionY = `${offset * 0.7}px`;
      };
      window.addEventListener("scroll", callback);
      return () => window.removeEventListener("scroll", callback);
    }
  }, [data]);

  if (loading) {
    return <LoadingScreen style={{ height: "80vh" }} />;
  }
  if (error) {
    startPolling(1500);
    return <LoadingScreen error={error} style={{ height: "80vh" }} />;
  }
  stopPolling();
  const media: IMedia = data.Media;

  const studioNodes = media.studios.nodes;
  const studios = studioNodes.map((node, index) => (
    <Link key={index} to={`/studio/${id}`}>
      {node.name + (index !== studioNodes.length - 1 ? ", " : "")}
    </Link>
    // TODO: change URL
  ));

  const relations: {
    [key in RelationType]: ShortMedia[];
  } = media.relations.edges.reduce((acc: any, { relationType, node }) => {
    acc[relationType] = acc[relationType]
      ? [...acc[relationType], node]
      : [node];
    return acc;
  }, {});

  const mediaData = {
    status: prettyString(media.status),
    airing: media.nextAiringEpisode
      ? `Ep. ${media.nextAiringEpisode.episode}: ${secondsToTime(
          media.nextAiringEpisode.timeUntilAiring,
          true
        )}`
      : null,
    "start date": formatDate(media.startDate),
    "end date": isEqual(media.startDate, media.endDate)
      ? null
      : formatDate(media.endDate),
    english: media.title.english,
    native: media.title.native,
    chapters: media.chapters,
    volumes: media.volumes,
    episodes: media.episodes,
    "episode duration": media.duration,
    studios: studios.length > 0 ? <span>{studios}</span> : null,
    format: prettyString(media.format),
    source: prettyString(media.source),
    country: lookup.byIso(media.countryOfOrigin).country
  };

  return isMobile ? (
    <div className="media-page">
      <div
        id="banner"
        className="banner"
        style={{
          backgroundImage: `url(${media.coverImage.extraLarge})`,
          height: "70vh"
        }}
      >
        <h1>{media.title.romaji}</h1>
      </div>
      <div className="content">
        <MediaDescription description={media.description} />
        <MediaScore
          score={media.averageScore}
          rankings={media.rankings.slice(0, 2)}
        />
        <ListView style={{ marginBottom: "25px", padding: 0 }}>
          {media.genres.map((genre, index) => (
            <Link className="genre" key={index} to="/">
              {genre}
            </Link>
          ))}
        </ListView>
        <Tabs
          data={{
            Details: <MediaData data={mediaData} />,
            Characters: media.characters.edges.length && (
              <div style={{ paddingBottom: "20px" }}>Coming soon!</div>
            ),
            Related: media.relations.edges.length && (
              <div>
                {Object.entries(relations).map((entry, index) => (
                  <ListView title={prettyString(entry[0])} key={index}>
                    {entry[1].map((node, index) => (
                      <MediaCard
                        key={index}
                        data={{
                          id: node.id,
                          title: node.title.romaji,
                          genres: node.genres,
                          type: node.type,
                          format: node.format,
                          coverImage: node.coverImage.large,
                          averageScore: node.averageScore,
                          source: media.source
                        }}
                      />
                    ))}
                  </ListView>
                ))}
              </div>
            ),
            Reviews: media.reviews.nodes.length && (
              <div style={{ paddingBottom: "20px" }}>Coming soon!</div>
            )
          }}
        />
        <StatusDistribution
          type={media.type}
          data={media.stats.statusDistribution}
        />
        <ListView title="You might also like">
          {media.recommendations.nodes
            ? media.recommendations.nodes
                .filter(node => node.mediaRecommendation != null)
                .map(node => node.mediaRecommendation)
                .map((recommendation, index) => (
                  <MediaCard
                    key={index}
                    data={{
                      id: recommendation.id,
                      title: recommendation.title.romaji,
                      type: recommendation.type,
                      format: recommendation.format,
                      coverImage: recommendation.coverImage.large,
                      genres: recommendation.genres,
                      averageScore: recommendation.averageScore,
                      source: media.source
                    }}
                  />
                ))
            : undefined}
        </ListView>
      </div>
    </div>
  ) : (
    <div className="media-page">
      <div
        id="banner"
        className="banner"
        style={
          media.bannerImage
            ? {
                backgroundImage: `url(${media.bannerImage})`
              }
            : {}
        }
      />
      <div className="page-info">
        <div className="page-data">
          <img
            alt={media.title.romaji}
            src={media.coverImage.large}
            style={{ marginBottom: "15px" }}
          />
          <MediaScore
            score={media.averageScore}
            rankings={media.rankings.slice(0, 2)}
          />
          <MediaData data={mediaData} />
        </div>
        <div className="content">
          <h1 style={{ marginBottom: "15px" }}>{media.title.romaji}</h1>
          <MediaDescription description={media.description} length={1024} />
          <ListView style={{ padding: 0 }}>
            {media.genres.map((genre, index) => (
              <a className="genre" key={index} href="/">
                {genre}
              </a>
            ))}
          </ListView>
          <Tabs
            data={{
              Characters: media.characters.edges.length && (
                <div style={{ paddingBottom: "20px" }}>Coming soon!</div>
              ),
              Related: media.relations.edges.length && (
                <div>
                  {Object.entries(relations).map((entry, index) => (
                    <ListView title={prettyString(entry[0])} key={index}>
                      {entry[1].map((node, index) => (
                        <MediaCard
                          key={index}
                          data={{
                            id: node.id,
                            title: node.title.romaji,
                            genres: node.genres,
                            type: node.type,
                            format: node.format,
                            coverImage: node.coverImage.large,
                            averageScore: node.averageScore,
                            source: media.source
                          }}
                        />
                      ))}
                    </ListView>
                  ))}
                </div>
              ),
              Reviews: media.reviews.nodes.length && (
                <div style={{ paddingBottom: "20px" }}>Coming soon!</div>
              )
            }}
          />
          <StatusDistribution
            type={media.type}
            data={media.stats.statusDistribution}
          />
          <ListView title="You might also like">
            {media.recommendations.nodes
              ? media.recommendations.nodes
                  .filter(node => node.mediaRecommendation != null)
                  .map(node => node.mediaRecommendation)
                  .map((recommendation, index) => (
                    <MediaCard
                      key={index}
                      data={{
                        id: recommendation.id,
                        title: recommendation.title.romaji,
                        type: recommendation.type,
                        format: recommendation.format,
                        coverImage: recommendation.coverImage.large,
                        genres: recommendation.genres,
                        averageScore: recommendation.averageScore,
                        source: media.source
                      }}
                    />
                  ))
              : undefined}
          </ListView>
        </div>
      </div>
    </div>
  );
};
