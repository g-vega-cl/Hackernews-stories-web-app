import React, {useState, useEffect, useMemo} from "react";
import ArticleList from "./components/ArticleList";
import StyledNavbar from "./components/Navbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getArticlesAPI, getCommentsAPI } from './components/Api.tsx';
import { getPages } from "./components/utils";
import LoadingPage from "./components/LoadingPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";


const PAGE_SIZES = [3, 5, 10];

const Page = () => {
  const {articles, isLoadingArticles, isLoadingArticleIds, articlesError} = getArticlesAPI();
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

  currentPaginationData = useMemo(()=>
    getPages(currentPage,rowsPerPage,articles)
  );

  const {comments, commentsError, refetchComments} = getCommentsAPI(currentPaginationData)


  useEffect(() => {
    refetchComments();
  },[currentPage, rowsPerPage]);

  console.log("currentPaginationData", currentPaginationData)

  if (isLoadingArticles || isLoadingArticleIds) return <LoadingPage isLoadingIds={isLoadingArticleIds}/>;

  if (articlesError) return <ErrorPage errorMessage = {articlesError}/>
  return (
    <div style={{ margin: "auto", width: "93%"}}>
      <StyledNavbar />
      <div style={{ marginTop: 30, display: "flex" }}>
        <ArticleList 
          articles={articles} 
          currentPage={currentPage} 
          rowsPerPage={rowsPerPage} 
          updatePage={updatePage}
          updateRowsPerPage={updateRowsPerPage} 
          currentPaginationData={currentPaginationData} 
          comments={comments}
          commentsError={commentsError}
          pageSizeOptions={PAGE_SIZES}
        />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Page;
