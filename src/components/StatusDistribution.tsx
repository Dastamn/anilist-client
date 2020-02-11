import React from "react";
import "../styles/status.scss";
import { prettyString } from "../util";

type Status =
  | "CURRENT"
  | "PLANNING"
  | "COMPLETED"
  | "DROPPED"
  | "PAUSED"
  | "REPEATING";

interface Props {
  data: {
    status: Status;
    amount: number;
  }[];
  type: "anime" | "manga";
}

export default ({ data, type }: Props) => {
  const getColor = (status: Status) => {
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
    <div>
      <h1>Status Distribution</h1>
      <div className="status-container">
        <div className="status-list">
          {data.map(({ status, amount }, index) => (
            <div className="status">
              <span
                id="status-name"
                key={index}
                style={{ backgroundColor: colors[index] }}
              >
                {status === "CURRENT"
                  ? type === "anime"
                    ? "Watching"
                    : "Reading"
                  : prettyString(status)}
              </span>
              <span
                id="status-value"
                key={amount}
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
              style={{
                backgroundColor: colors[index],
                width: `${percentages[index]}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
