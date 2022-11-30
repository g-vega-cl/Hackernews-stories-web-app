import Pagination from "./Pagination";
import React, {useState, useMemo} from "react";
import { getPages } from "./utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TopStory from "./TopStory.tsx"; // TODO fix the .tsx import, not high priority
import LoadingPage from "./LoadingPage.tsx";

const PAGE_SIZES = [3, 5, 10];

function BlogList() {
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  let currentPaginationData = [];

  const updateRowsPerPage = (rowNumber) => {
    // Runs when user changes “X per page”.
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

  // Fetches all 30 articles
  const { isLoading: isLoadingArticles,error: articlesError, data: articles } = useQuery({
    queryKey: [`hackerNews-articles`],
    queryFn: async () => {
      return await Promise.all(articleIds.map(async (id) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
		    const data = res.json();
        return data;
      }))
    },
    // The query will not execute until the articleIds?.length > 0 is true
    enabled: articleIds?.length > 0
  });

  currentPaginationData = useMemo(()=>
    getPages(currentPage,rowsPerPage,articles)
  );

  // Fetches all comments for the articles
  const { isLoading: isLoadingComments,error: commentsError, data: comments } = useQuery({
    queryKey: [`hackerNews-comments`],
    queryFn: async () => { // THIS IS O(n2). BUT WE NEED TO do O(n2) because we want to go through every comment.
      // HERE INSTEAD OF DOING .MAP you could do a for each and save the next step of map -> Object
      const articleObject = {};
      for(let i = 0; i < currentPaginationData.length; i++){
        const article = currentPaginationData[i];
        const articleComments = await Promise.all(article.kids.map(async (kidId) => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${kidId}.json`);
		      const data = res.json();
          // WE want the top commenter names for each article. With the total number of comments they posted, we could calculate this here.
            // BUT since we are fetching the comments anyways, I'd rather cache the comments and then calculate what we need.
          return data;
        }));
        articleObject[article.id] = articleComments;
      }
      console.log("articleObject", articleObject);
      return articleObject;

      // const commentsArray = Promise.all(currentPaginationData.map(async (article) => {
      //   // Gets all comments. NOTE: Can be rate limited.
      //   const articleComments = await Promise.all(article.kids.map(async (kidId) => {
      //     const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${kidId}.json`);
		  //     const data = res.json();
      //     // WE want the top commenter names for each article. With the total number of comments they posted, we could calculate this here.
      //       // BUT since we are fetching the comments anyways, I'd rather cache the comments and then calculate what we need.
      //     return data;
      //   }));

      //   const articleObject = {};
      //   articleObject[article["id"]] = articleComments;
      //   return articleObject;
      // }))
    },
    // The query will not execute until the articleIds?.length > 0 is true
    enabled: currentPaginationData?.length > 0
  });

  console.log("isLoadingComments ", isLoadingComments, " commentsError ", commentsError, "Comments ", comments);

  if (isLoadingArticles || isLoadingArticleIds) return <LoadingPage isLoadingIds={isLoadingArticleIds}/>;

  if (articlesError) return "An error has occurred: " + error.message; // //TODO // RETURN ERROR PAGE.

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={articles.length}
        pageSize={rowsPerPage}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        aria-label="blog list"
      >
        {/* {currentPaginationData.map((article) => (
          <TopStory
            key={article.id}
            author={article.by}
            title={article.title}
            comments={comments[article.id]}
          />
        ))} */}
      </ul>
    </div>
  );
}

export default BlogList;
