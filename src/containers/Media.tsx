import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getMediaById } from "../api/queries";
import lookup from "country-code-lookup";
import Loading from "../components/Loading";
import { IMedia, RelationType, ShortMedia } from "../types";
import { prettyString, secondsToTime } from "../util";
import youtube from "../assets/youtube.svg";
import MediaDetails from "../components/MediaDetails";
import MediaRank from "../components/MediaRank";
import Genres from "../components/Genres";
import Tabs from "../components/Tabs";
import CharacterList from "../components/CharacterList";
import StatusDistribution from "../components/StatusDistribution";
import MediaList from "../components/MediaList";
import "../styles/anime.scss";

export default withRouter<RouteComponentProps, any>(
  (props: RouteComponentProps<any>) => {
    const {
      match: {
        params: { id }
      }
    } = props;
    const { loading, data, error } = useQuery(getMediaById(id));
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
    console.log(media);

    const rating =
      media.rankings.find(({ type, allTime }) => type === "RATED" && allTime) ||
      media.rankings.find(({ type }) => type === "RATED");
    const popularity =
      media.rankings.find(
        ({ type, allTime }) => type === "POPULAR" && allTime
      ) || media.rankings.find(({ type }) => type === "POPULAR");

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
      "Start Date": null,
      "End Date": null,
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

    console.log(details);

    return (
      <div>
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
            <MediaDetails data={details} />
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
                          <CharacterList
                            data={characters.map(({ id, role, node }) => ({
                              id,
                              name: node.name.full,
                              role: prettyString(role),
                              image: node.image.large
                            }))}
                          />
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
                          <MediaList
                            title={prettyString(entry[0])}
                            data={entry[1].map(node => ({
                              id: node.id,
                              title: node.title.romaji,
                              genres: node.genres,
                              type: node.type,
                              format: node.format,
                              cover: node.coverImage.extraLarge,
                              averageScore: node.averageScore,
                              source: media.source
                            }))}
                          />
                        </section>
                      ))}
                    </div>
                  )
                }}
              />

              {recommendations.length > 0 && (
                <section style={{ marginBottom: "60px" }}>
                  <MediaList
                    title="Recommendations"
                    data={recommendations.map(recommendation => ({
                      id: recommendation.id,
                      title: recommendation.title.romaji,
                      type: recommendation.type,
                      format: recommendation.format,
                      cover: recommendation.coverImage.extraLarge,
                      genres: recommendation.genres,
                      averageScore: recommendation.averageScore,
                      source: media.source
                    }))}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);