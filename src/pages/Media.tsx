import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getMediaById } from "../apollo/queries/remote";
import lookup from "country-code-lookup";
import Loading from "../components/Loading";
import { IMedia, RelationType, ShortMedia, MediaType } from "../types";
import { prettyString, secondsToTime, formatDate } from "../util";
import youtube from "../assets/youtube.svg";
import MediaData from "../components/media/MediaData";
import MediaRank from "../components/media/MediaRank";
import Genres from "../components/Genres";
import Tabs from "../components/Tabs";
import StatusDistribution from "../components/StatusDistribution";
import List from "../components/List";
import MediaCard from "../components/media/MediaCard";
import "../styles/anime.scss";
import "../styles/browse.scss";
import CharacterCard from "../components/CharacterCard";

interface Props extends RouteComponentProps<any> {
  type: MediaType;
}

export default withRouter<Props, any>((props: Props) => {
  const {
    type,
    match: {
      params: { id }
    }
  } = props;

  const { loading, data, error } = useQuery(getMediaById(id, type));

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

  if (loading || error) {
    return (
      <div style={{ height: "85vh" }}>
        <Loading error={error?.message} />
      </div>
    );
  }
  const media: IMedia = data.Media;

  const rating =
    media.rankings.find(({ type, allTime }) => type === "RATED" && allTime) ||
    media.rankings.find(({ type }) => type === "RATED");
  const popularity =
    media.rankings.find(({ type, allTime }) => type === "POPULAR" && allTime) ||
    media.rankings.find(({ type }) => type === "POPULAR");

  const studioNodes = media.studios.nodes;
  const studios = studioNodes.map((node, index) => (
    <a key={index} href={`/studio/${id}`}>
      {node.name + (index !== studioNodes.length - 1 ? ", " : "")}
    </a>
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

  const characters = media.characters.edges;

  const recommendations = media.recommendations.nodes
    .filter(node => node.mediaRecommendation != null)
    .map(node => node.mediaRecommendation);

  let details = {
    Format: prettyString(media.format),
    Status: prettyString(media.status),
    Airing: media.nextAiringEpisode
      ? `Ep. ${media.nextAiringEpisode.episode}: ${secondsToTime(
          media.nextAiringEpisode.timeUntilAiring,
          true
        )}`
      : null,
    "Start Date": formatDate(media.startDate),
    "End Date": formatDate(media.endDate),
    English: media.title.english,
    Native: media.title.native,
    Chapters: media.chapters,
    Volumes: media.volumes,
    Episodes: media.episodes,
    "Episode Duration": media.duration,
    Studios: studios.length > 0 ? <span>{studios}</span> : null,
    Source: prettyString(media.source),
    Country: lookup.byIso(media.countryOfOrigin).country
  };

  return (
    <div className="browse" style={{ padding: 0 }}>
      <div
        id="banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${media.bannerImage})`
        }}
      />
      <div className="anime">
        <div className="data">
          <div
            className="data cover"
            style={{
              backgroundImage: `url(${media.coverImage.extraLarge})`
            }}
          />
          {media.trailer != null && media.trailer.site === "youtube" && (
            <div
              className="data trailer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, .8) 100%), 
              url(${media.trailer.thumbnail})`
              }}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${media.trailer.id}`,
                  "_blank"
                )
              }
            >
              <img src={youtube} alt="" />
              <span>Trailer</span>
            </div>
          )}
          <MediaData data={details} />
        </div>

        <div className="related">
          <div>
            <section>
              <h1 id="title">{media.title.romaji}</h1>
              <MediaRank rating={rating} popularity={popularity} />
              <p dangerouslySetInnerHTML={{ __html: media.description }} />
            </section>

            {media.genres && (
              <section>
                <Genres data={media.genres} />
              </section>
            )}

            <Tabs
              data={{
                Overview: (
                  <div>
                    {characters.length > 0 && (
                      <section>
                        <List title="Characters">
                          {characters.map(({ id, role, node }, index) => (
                            <CharacterCard
                              key={index}
                              data={{
                                id,
                                name: node.name.full,
                                role: prettyString(role),
                                image: node.image.large
                              }}
                            />
                          ))}
                        </List>
                      </section>
                    )}
                    <section>
                      <StatusDistribution
                        type={media.type}
                        data={media.stats.statusDistribution}
                      />
                    </section>
                  </div>
                ),
                Related: (
                  <div>
                    {Object.entries(relations).map((entry, index) => (
                      <section key={index}>
                        <List title={prettyString(entry[0])}>
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
                        </List>
                      </section>
                    ))}
                  </div>
                )
              }}
            />

            {recommendations.length > 0 && (
              <section style={{ marginBottom: "60px" }}>
                <List title="Recommendations">
                  {recommendations.map((recommendation, index) => (
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
                  ))}
                </List>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
