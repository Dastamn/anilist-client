import React from "react";
import "../styles/navbar.scss";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ReactComponent as Monitor } from "../assets/monitor.svg";
import { ReactComponent as MonitorFilled } from "../assets/monitor_filled.svg";
import { ReactComponent as Book } from "../assets/book.svg";
import { ReactComponent as BookFilled } from "../assets/book_filled.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as SearchFilled } from "../assets/search_filled.svg";
import { ReactComponent as User } from "../assets/user.svg";
import { ReactComponent as UserFilled } from "../assets/user_filled.svg";

const Navbar = (props: RouteComponentProps) => {
  const {
    location: { pathname },
    history
  } = props;
  const redirect = (location: string) => history.push(location);
  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="navbar-content">
      <section onClick={() => redirect("/anime")}>
        {pathname.startsWith("/anime") ? (
          <MonitorFilled fill="white" onClick={scrollUp} />
        ) : (
          <Monitor fill="gray" onClick={() => redirect("/anime")} />
        )}
      </section>

      <section onClick={() => redirect("/manga")}>
        {pathname.startsWith("/manga") ? (
          <BookFilled fill="white" onClick={scrollUp} />
        ) : (
          <Book fill="gray" onClick={() => redirect("/anime")} />
        )}
      </section>

      <section onClick={() => redirect("/search")}>
        {pathname.startsWith("/search") ? (
          <SearchFilled fill="white" onClick={scrollUp} />
        ) : (
          <Search fill="gray" onClick={() => redirect("/anime")} />
        )}
      </section>

      <section id="user" onClick={() => redirect("/user")}>
        {pathname.startsWith("/user") ? (
          <UserFilled fill="white" onClick={scrollUp} />
        ) : (
          <User fill="gray" onClick={() => redirect("/anime")} />
        )}
      </section>
    </div>
  );
};

export default withRouter<RouteComponentProps, any>(Navbar);
