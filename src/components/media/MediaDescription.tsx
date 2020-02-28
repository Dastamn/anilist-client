import React, { useState } from "react";
import "../../styles/mediaPage.scss";

interface Props {
  description: string;
  length?: number;
}

export default ({ description, length }: Props) => {
  const limit = length || 256;
  const [hasMore, setHasMore] = useState(description.length > limit);
  let truncated = description.slice(0, limit).trim();
  if (truncated.charAt(truncated.length - 1) !== " ") {
    let i = truncated.length;
    while (i < description.length && description.charAt(i) !== " ") {
      truncated = truncated + description.charAt(i);
      i++;
    }
  }
  if (hasMore && truncated === description) {
    setHasMore(false);
  }
  return description ? (
    <div className="description">
      <p
        dangerouslySetInnerHTML={{
          __html: hasMore ? truncated + "..." : description
        }}
      />
      {hasMore && (
        <span className="more" onClick={() => setHasMore(false)}>
          Read more
        </span>
      )}
    </div>
  ) : null;
};
