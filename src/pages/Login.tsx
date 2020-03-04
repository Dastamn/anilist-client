import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default () => {
  const location = useLocation();
  const hash = location.hash;
  const token =
    hash.substring(14, hash.length - 38) ||
    localStorage.getItem("kensoku_access");

  if (token) {
    localStorage.setItem("kensoku_access", token);
    return (
      <Redirect
        to={{
          pathname: "/user"
        }}
      />
    );
  }

  return <LoadingScreen message="Access denied" style={{ height: "85vh" }} />;
};
