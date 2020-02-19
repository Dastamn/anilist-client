import React from "react";
import "../styles/media.scss";
import Loading from "./Loading";
import { ApolloError } from "apollo-boost";

interface Props {
  title?: string;
  children: JSX.Element[] | undefined;
  error?: ApolloError;
}

export default ({ title, children, error }: Props) => (
  <div className="media-list-container">
    {title && <h1>{title}</h1>}
    {children ? (
      <div className="media-list">{children.map(child => child)}</div>
    ) : (
      <Loading
        error={
          error
            ? error.networkError
              ? "Please check your internet connection"
              : "Something happened... Please refresh the page"
            : undefined
        }
      />
    )}
  </div>
);
