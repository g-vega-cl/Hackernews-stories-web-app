import "../css/blogs.scss";

import PropTypes from "prop-types";
import React from "react";

export interface ITopStory {
  author: string;
  title: string;
  excerpt: string;
};

const TopStory = ({ author = "", title = "", excerpt = "" }: ITopStory) => {
  return (
    <li className="blogsWrapper">
      <div className="blog">
        <div className="imageWrapper">
          <img
            className="authorImage"
            src={`https://joeschmoe.io/api/v1/${author}`}
            alt="Author"
          />
          <p>{author}</p>
        </div>

        <h2>{title}</h2>
        <p className="excerpt">{excerpt}</p>
      </div>
    </li>
  );
}

export default TopStory;
