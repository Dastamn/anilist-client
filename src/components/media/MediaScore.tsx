import React from "react";
import star from "../../assets/star.svg";
import heart from "../../assets/heart.svg";
import { Ranking } from "../../types";
import "../../styles/mediaPage.scss";

interface Props {
  score: number | null;
  rankings: Ranking[];
}

export default ({ score, rankings }: Props) => {
  console.log(rankings);

  return (
    <div>
      <div className="score-rank">
        {score && (
          <div className="score">
            <h3>Score</h3>
            <span>{`${score}%`}</span>
          </div>
        )}
        <div className="rank-container">
          {rankings.map((ranking, index) => (
            <a className="rank" key={index} href="/anime">
              <img
                alt={ranking.type}
                src={ranking.type === "RATED" ? star : heart}
              />
              <span>
                {`#${ranking.rank} ${
                  ranking.type === "RATED" ? "Highest rated" : "Most popular"
                }  of ${
                  ranking.allTime
                    ? "all time"
                    : (ranking.season ? ranking.season.toLowerCase() : "") +
                      ` ${ranking.year}`
                }`}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
