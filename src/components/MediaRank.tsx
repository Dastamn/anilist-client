import React from "react";
import "../styles/media.scss";
import star from "../assets/star.svg";
import heart from "../assets/heart.svg";

interface Rating {
  rank: number;
  type: "RATED";
  allTime: boolean;
  season: string | null;
  year: number | null;
}

interface Popularity {
  rank: number;
  type: "POPULAR";
  allTime: boolean;
  season: string | null;
  year: number | null;
}

interface Props {
  rating: Rating | undefined;
  popularity: Popularity | undefined;
}

export default ({ rating, popularity }: Props) => (
  <div className="media-rank">
    {rating && (
      <div>
        <img src={star} alt="" />
        <span>{`#${rating.rank} Highest rated of ${
          rating.allTime
            ? "all time"
            : (rating.season ? rating.season.toLowerCase() : "") +
              ` ${rating.year}`
        }`}</span>
      </div>
    )}
    {popularity && (
      <div>
        <img src={heart} alt="" />
        <span>{`#${popularity.rank} Most popular of ${
          popularity.allTime
            ? "all time"
            : (popularity.season ? popularity.season.toLowerCase() : "") +
              ` ${popularity.year}`
        }`}</span>
      </div>
    )}
  </div>
);
