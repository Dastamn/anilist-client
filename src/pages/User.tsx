import React from "react";
import { useQuery } from "@apollo/react-hooks";
import LoadingScreen from "../components/LoadingScreen";
import { GET_VIEWER } from "../apollo/queries/remote";
import { Viewer } from "../types";
import "../styles/user.scss";

export default () => {
  const { data, loading, error } = useQuery(GET_VIEWER);

  if (loading) {
    return <LoadingScreen error={error} style={{ height: "85vh" }} />;
  }

  if (error) {
    return (
      <div className="no-auth">
        <h1>Not Logged In!</h1>
        <p>
          Login with Anilist to access your anime and manga lists and much more
          !
        </p>
        <button className="primary-btn">
          <a
            href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.REACT_APP_ID}&response_type=token`}
          >
            Login with Anilist
          </a>
        </button>
      </div>
    );
  }

  if (data) {
    const viewer: Viewer = data.Viewer;
    return (
      <div className="profile">
        <div
          className="banner"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url(${viewer.bannerImage})`
          }}
        >
          <div className="avatar-name">
            <img alt={viewer.name} src={viewer.avatar.large} />
            <h1>{viewer.name}</h1>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
