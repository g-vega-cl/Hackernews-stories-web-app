import "../css/blogs.scss";
import { getTop10CommenterNames } from "./utils";
import PropTypes from "prop-types";
import React from "react";

export interface ITopStory {
  author: string;
  title: string;
  comments: any; // BUILD COMMENTS INTERFACE.
  isFetchingComments: boolean;
};

const TopStory = ({ author = "", title = "", comments = {}, isFetchingComments = false }: ITopStory) => {
  const {top10CommenterNames, commentorFrequency}  = getTop10CommenterNames(comments);
  return (
    <li className="blogsWrapper">
      <div className="blog">
        <div className="imageWrapper">
          <p>{author}</p>
        </div>

        <h2>{title}</h2>
        <div style={{display:'flex'}}>
          <p style={{fontWeight:'bold'}}>Top commentors: </p>
          {isFetchingComments ? <p style={{margin: '0px 10px'}}> fetching... </p>: top10CommenterNames.map((name,index)=>{
            return <p style={{margin: '0px 10px'}} key={`commentor-${name}-${index}`}>{name}: {commentorFrequency[name]}</p>
          })}
        </div>
      </div>
    </li>
  );
}

export default TopStory;
