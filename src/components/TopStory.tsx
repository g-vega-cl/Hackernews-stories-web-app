import "../css/blogs.scss";
import { getTop10CommenterNames } from "./utils";
import PropTypes from "prop-types";
import React from "react";

export interface ITopStory {
  author: string;
  title: string;
  comments: any; // BUILD COMMENTS INTERFACE.
};

const TopStory = ({ author = "", title = "", comments = {} }: ITopStory) => {
  console.log("ArticleComments", comments);
  const top10CommenterNames = getTop10CommenterNames(comments);
  console.log("top10CommenterNames", top10CommenterNames);
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
