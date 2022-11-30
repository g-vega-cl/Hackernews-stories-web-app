import Pagination from "./Pagination";
import React from "react";
import TopStory from "./TopStory.tsx";
const ArticleList = ({articles, currentPage, rowsPerPage, updatePage, updateRowsPerPage, currentPaginationData, comments, commentsError, pageSizeOptions}) => {
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={articles.length}
        pageSize={rowsPerPage}
        pageSizeOptions={pageSizeOptions}
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
