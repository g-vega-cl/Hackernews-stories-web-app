import Pagination from "./Pagination";
import React, {useState, useMemo} from "react";
import blogs from "../data/blogs.json";
import { getArticles, getPages } from "./utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogPost from './BlogPost';
import TopStory from "./TopStory.tsx"; // TODO fix the .tsx import, not high priority

const PAGE_SIZES = [5, 10, 20, 30];


function BlogList() {
  // const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZES[0]);
  // const [currentPage, setCurrentPage] = useState(1);
  let currentPaginationData = [];

  const updateRowsPerPage = (rowNumber) => {
    // When user changes “X per page” (the only options will be 15, 25, 50 and 100), 
    // it should only display at maximum that amount of blogs per page and the first page is displayed
    setRowsPerPage(rowNumber);
    setCurrentPage(1);
  };

  const updatePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // This is cached and saved locally for 24h
  const { isLoading: isLoadingArticleIds, error: errorArticleIds, data: articleIds } = useQuery(["hackerNews-article-ids"], () => {
    return axios
      .get("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy=%22$key%22&limitToFirst=30")
      .then((res) => res.data)
    }
  );

  const { isLoading: isLoadingArticle,error: articleError, data: article } = useQuery({
    queryKey: [`hackerNews-articles`],
    queryFn: async () => {
      return await Promise.all(articleIds.map(async (id) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
		    const data = res.json();
        return data;
      }))
    },
    // The query will not execute until the isLoadingArticleIds is false
    enabled: articleIds?.length > 0
  })


  // currentPaginationData = getArticles(data);

  if (isLoadingArticleIds) return "Loading..."; // THIS SHOULD BE HANDLED SOMEWHERE ELSE.

  if (errorArticleIds) return "An error has occurred: " + error.message; // //TODO // RETURN ERROR PAGE.

  
  // console.log("isLoadingArticle", isLoadingArticle, " article", article);
  console.log("refresh");

  // If we have data.
  // currentPaginationData = useMemo(()=>  //CHECK IF THIS RE-RENDERS EVERY TIME.
  //   getPages(currentPage,rowsPerPage,data)
  // );

  return (
    <div>
      {/* <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={rowsPerPage} // rowsPerPage is modified by the setRowsPerPage in updateRowsPerPage.
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      /> */}
      <ul
        aria-label="blog list"
      >
        {/* {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
          />
        ))} */}
      </ul>
    </div>
  );
}

export default BlogList;
