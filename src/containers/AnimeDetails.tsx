import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import MediaRank from "../components/MediaRank";
import "../styles/anime.scss";
import youtube from "../assets/youtube.svg";
import MediaDetails from "../components/MediaDetails";
import MediaList from "../components/MediaList";
import { secondsToTime, prettyString } from "../util";
import CharacterList from "../components/CharacterList";
import Genres from "../components/Genres";
import Loading from "../components/Loading";
import Tabs from "../components/Tabs";
import StatusDistribution from "../components/StatusDistribution";
import { getAnimeById } from "../api/queries/anime";

export default withRouter<RouteComponentProps<any>, any>(
  (props: RouteComponentProps<any>) => {
    const { match } = props;
    const id = match.params.id;
    const { loading, data, error } = useQuery(getAnimeById(id));

    useEffect(() => {
      const banner = document.getElementById("banner");
      if (banner != null) {
        const callback = () => {
          let offset = window.pageYOffset;
          banner.style.backgroundPositionY = offset * 0.7 + "px";
        };
        window.addEventListener("scroll", callback);
        return () => window.removeEventListener("scroll", callback);
      }
    }, [data]);

    if (loading || error) {
      return (
        <div style={{ height: "100vh" }}>
          <Loading error={error?.message} />
        </div>
      );
    }

    const { Media } = data;

    const { startDate } = Media;

    const rating =
      Media.rankings.find(
        ({ type, allTime }: { type: string; allTime: boolean }) =>
          type === "RATED" && allTime
      ) ||
      Media.rankings.find(
        ({ type }: { type: string; allTime: boolean }) => type === "RATED"
      );
    const popularity =
      Media.rankings.find(
        ({ type, allTime }: { type: string; allTime: boolean }) =>
          type === "POPULAR" && allTime
      ) ||
      Media.rankings.find(
        ({ type }: { type: string; allTime: boolean }) => type === "POPULAR"
      );

    const studios = Media.studios.nodes.map((studio: any, index: number) => (
      <a key={index} href={`/studio/${id}`}>
        {studio.name}{" "}
      </a>
      // TODO: change URL
    ));

    const details = {
      Status: prettyString(Media.status),
      Airing: Media.nextAiringEpisode
        ? `Ep. ${Media.nextAiringEpisode.episode}: ${secondsToTime(
            Media.nextAiringEpisode.timeUntilAiring,
            true
          )}`
        : startDate.year
        ? new Date(
            startDate.year,
            startDate.month,
            startDate.day
          ).toLocaleDateString()
        : null,
      English: Media.title.english,
      Native: Media.title.native,
      Score: Media.averageScore ? Media.averageScore + "%" : null,
      Format: prettyString(Media.format),
      Episodes: Media.episodes,
      "Episode duration": Media.duration
        ? secondsToTime(Number(Media.duration) * 60, false)
        : null,
      Source: prettyString(Media.source),
      Studios: <span>{[...studios]}</span>
    };

    const relationObject: { [key: string]: any[] } = {};

    const relations = Media.relations.edges;

    relations.forEach((relation: any) => {
      if (!relationObject[relation.relationType]) {
        relationObject[relation.relationType] = [];
      }
      relationObject[relation.relationType] = [
        ...relationObject[relation.relationType],
        relation.node
      ];
    });

    const relationKeys = Object.keys(relationObject);

    const characters = Media.characters.edges;

    const recommendations = Media.recommendations.nodes.filter(
      (node: any) => node.mediaRecommendation != null
    );

    return (
      <div>
        <div
          id="banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${Media.bannerImage})`
          }}
        />
        <div className="anime">
          <div className="data">
            <div
              className="data cover"
              style={{
                backgroundImage: `url(${Media.coverImage.extraLarge})`
              }}
            />
            {Media.trailer != null && Media.trailer.site === "youtube" && (
              <div
                className="data trailer"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, .8) 100%), 
                  url(${Media.trailer.thumbnail})`
                }}
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/watch?v=${Media.trailer.id}`,
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
                <h1 id="title">{Media.title.romaji}</h1>
                <MediaRank rating={rating} popularity={popularity} />
                <p dangerouslySetInnerHTML={{ __html: Media.description }} />
              </section>

              {Media.genres && (
                <section>
                  <Genres data={Media.genres} />
                </section>
              )}

              <Tabs
                data={{
                  Overview: (
                    <div>
                      {characters.length > 0 && (
                        <section>
                          <CharacterList
                            data={characters.map(({ id, role, node }: any) => ({
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
                          type="anime"
                          data={Media.stats.statusDistribution}
                        />
                      </section>
                    </div>
                  ),
                  Related: (
                    <div>
                      {relationKeys.map((relation, index) => (
                        <section key={index}>
                          <MediaList
                            title={prettyString(relation)}
                            data={relationObject[relation].map((node: any) => ({
                              id: node.id,
                              title: node.title.romaji,
                              genres: node.genres,
                              type: prettyString(node.type),
                              format: prettyString(node.format),
                              cover: node.coverImage.extraLarge,
                              score: node.averageScore
                            }))}
                          />
                        </section>
                      ))}
                    </div>
                  )
                }}
              />

              {recommendations.length > 0 && (
                <section style={{ marginBottom: "50px" }}>
                  <MediaList
                    title="Recommendations"
                    data={recommendations.map(
                      ({ mediaRecommendation }: any) => ({
                        id: mediaRecommendation.id,
                        title: mediaRecommendation.title.romaji,
                        type: prettyString(mediaRecommendation.type),
                        format: prettyString(mediaRecommendation.format),
                        cover: mediaRecommendation.coverImage.extraLarge,
                        genres: mediaRecommendation.genres,
                        score: mediaRecommendation.averageScore
                      })
                    )}
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
