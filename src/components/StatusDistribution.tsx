import React, { CSSProperties } from "react";
import { prettyString } from "../util";
import { DistributionStatus, MediaType } from "../types";
import "../styles/status.scss";

interface Props {
  data: {
    status: DistributionStatus;
    amount: number;
  }[];
  type: MediaType;
  style?: CSSProperties;
}

export default ({ data, type, style }: Props) => {
  const getColor = (status: DistributionStatus) => {
    switch (status) {
      case "CURRENT":
        return "green";
      case "PLANNING":
        return "#0278cc";
      case "COMPLETED":
        return "#630b96";
      case "DROPPED":
        return "#b80b0b";
      case "PAUSED":
        return "#cc7802";
      case "REPEATING":
        return "#420aa3";
    }
  };
  const total = data
    .map(({ amount }) => amount)
    .reduce((acc, curr) => acc + curr, 0);
  const colors: string[] = [];
  const percentages: number[] = [];
  data.forEach(({ status, amount }) => {
    colors.push(getColor(status));
    percentages.push(Math.round((amount * 100) / total));
  });
  return (
    <div style={{ marginBottom: "30px", ...style }}>
      <h1 style={{ marginBottom: "15px", fontSize: "28px" }}>
        Status Distribution
      </h1>
      <div className="status-container">
        <div className="status-list">
          {data.map(({ status, amount }, index) => (
            <div key={status} className="status">
              <span
                id="status-name"
                key={"name" + status + index}
                style={{ backgroundColor: colors[index] }}
              >
                {status === "CURRENT"
                  ? type === "ANIME"
                    ? "Watching"
                    : "Reading"
                  : prettyString(status)}
              </span>
              <span
                id="status-value"
                key={"value" + status + index}
                style={{ color: colors[index] }}
              >
                {`${percentages[index]}%`}
              </span>
            </div>
          ))}
        </div>
        <div className="status-colors">
          {percentages.map((value, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors[index],
                width: `${value}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
