import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Monitor } from "../assets/monitor.svg";
import { ReactComponent as MonitorFilled } from "../assets/monitor_filled.svg";
import { ReactComponent as Book } from "../assets/book.svg";
import { ReactComponent as BookFilled } from "../assets/book_filled.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as SearchFilled } from "../assets/search_filled.svg";
import { ReactComponent as User } from "../assets/user.svg";
import { ReactComponent as UserFilled } from "../assets/user_filled.svg";
import "../styles/navbar.scss";

export default () => {
  const { pathname } = useLocation();
  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="navbar-content">
      <Link to="/anime">
        {pathname.startsWith("/anime") ? (
          <MonitorFilled fill="white" onClick={scrollUp} />
        ) : (
          <Monitor fill="gray" />
        )}
      </Link>

      <Link to="/manga">
        {pathname.startsWith("/manga") ? (
          <BookFilled fill="white" onClick={scrollUp} />
        ) : (
          <Book fill="gray" />
        )}
      </Link>

      <Link to="/search">
        {pathname.startsWith("/search") ? (
          <SearchFilled fill="white" onClick={scrollUp} />
        ) : (
          <Search fill="gray" />
        )}
      </Link>

      <Link id="user" to="/user">
        {pathname.startsWith("/user") ? (
          <UserFilled fill="white" onClick={scrollUp} />
        ) : (
          <User fill="gray" />
        )}
      </Link>
    </div>
  );
};
