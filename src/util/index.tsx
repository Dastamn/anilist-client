import React from "react";
import moment from "moment";

export const genres = [
  // "Comedy",
  // "Fantasy",
  // "Ecchi",
  // "Romance",
  // "Sports",
  // "Psychological",
  // "Supernatural",

  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  // "Hentai",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller"
];

export const tags = ["Seinen", "Shounen", "Shoujo", "Harem", "Isekai"];

export const secondsToTime = (seconds: number, minimise: boolean) => {
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let dString, hString, mString;
  if (minimise) {
    dString = d > 0 ? d + "d " : "";
    hString = h > 0 ? h + "h " : "";
    mString = m > 0 ? m + (m === 1 ? "m" : "m") : "";
  } else {
    dString = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
    hString = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    mString = m > 0 ? m + (m === 1 ? " minute" : " minutes") : "";
  }
  return dString + hString + mString;
};

export const prettyString = (input: string | null): string => {
  if (input) {
    const output = input.replace(/_+/g, " ");
    return output.length > 3 ? output.toLowerCase() : output;
  }
  return "";
};

export const getSeason = (date: Date) => {
  const month = date.getMonth() + 1;
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "WINTER";
    case 3:
    case 4:
    case 5:
      return "SPRING";
    case 6:
    case 7:
    case 8:
      return "SUMMER";
    case 9:
    case 10:
    case 11:
      return "FALL";
  }
};

export const styleScore = (score: number | null, fontSize?: number) => {
  if (score) {
    const style = {
      color: "green",
      fontSize: fontSize ? `${fontSize}px` : "13px"
    };
    if (score > 50) {
      if (score < 70) {
        style.color = "orange";
      }
    } else {
      style.color = "red";
    }
    return <span style={style}>{`${score}%`}</span>;
  }
  return null;
};

export const formatDate = ({
  year,
  month,
  day
}: {
  year: number | null;
  month: number | null;
  day: number | null;
}) =>
  year
    ? month
      ? day
        ? moment(new Date(year, month, day)).format("LL")
        : moment(new Date(year, month)).format("LL")
      : year.toString()
    : null;

export const selectRandom = (array: string[], count: number) => {
  const set = new Set<string>();
  while (set.size < count) {
    set.add(array[Math.floor(Math.random() * array.length)]);
  }
  return Array.from(set);
};
