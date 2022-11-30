import "../css/blogs.scss";
import { getTop10CommenterNames } from "./utils";
import PropTypes from "prop-types";
import React from "react";

export interface ITopStory {
  author: string;
  title: string;
  comments: any; // BUILD COMMENTS INTERFACE.
  errorComments: string;
};

const TopComments = ({top10CommenterNames, errorComments, commentorFrequency}) => {

  if(top10CommenterNames.length > 0){
    return top10CommenterNames.map((name,index)=>{
      return <p style={{margin: '0px 10px'}} key={`commentor-${name}-${index}`}>{name}: {commentorFrequency[name]}</p>
    })
  } else if(errorComments){
    return <p style={{margin: '0px 10px'}}>Error loading commentators, {errorComments} </p>
  } 

  return <p style={{margin: '0px 10px'}}> Fetching commentators... </p>

}

const TopStory = ({ author = "", title = "", comments = {}, errorComments }: ITopStory) => {
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
          {<TopComments top10CommenterNames={top10CommenterNames} errorComments={errorComments} commentorFrequency={commentorFrequency}/>}
        </div>
      </div>
    </li>
  );
}

export default TopStory;
