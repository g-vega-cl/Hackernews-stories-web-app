import Pagination from "./Pagination";
import React, {useState, useMemo, useEffect} from "react";
import { getPages } from "./utils";
import TopStory from "./TopStory.tsx"; // TODO fix the .tsx import, not high priority
import LoadingPage from "./LoadingPage.tsx";
import { getArticlesAPI, getCommentsAPI } from "./Api.tsx";

const PAGE_SIZES = [3, 5, 10];

function ArticleList() {
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

  const {
    articles, isLoadingArticles, isLoadingArticleIds, articlesError
  } = getArticlesAPI(currentPaginationData);

  currentPaginationData = useMemo(()=>
    getPages(currentPage,rowsPerPage,articles)
  );

  const {comments, commentsError, refetchComments} = getCommentsAPI(currentPaginationData)


  useEffect(() => {
    refetchComments();
  },[currentPage, rowsPerPage]);

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
        {currentPaginationData.map((article) => (
          <TopStory
            key={article.id}
            author={article.by}
            title={article.title}
            comments={comments ? comments[article.id]: {}}
            isErrorComments={commentsError?.message}
          />
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
