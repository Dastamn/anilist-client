import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps<any> {
  data: string[];
}

export default withRouter<Props, any>(({ data, history }: Props) => (
  <div className="genre-list">
    {data.map((genre, index) => (
      <div key={index} className="genre" onClick={() => {}}>
        {genre}
      </div>
    ))}
  </div>
));
