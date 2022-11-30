import "../css/blogs.scss";

import PropTypes from "prop-types";
import React from "react";

export interface ITopStory {
  author: string;
  title: string;
  comments: {};
};

const TopStory = ({ author = "", title = "", comments = {} }: ITopStory) => {
  return (
    <li className="blogsWrapper">
      <div className="blog">
        <div className="imageWrapper">
          <p>{author}</p>
        </div>

        <h2>{title}</h2>
        <p className="excerpt">{}</p>
      </div>
    </li>
  );
}

export default TopStory;
