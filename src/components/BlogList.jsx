import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, {useState, useMemo} from "react";
import blogs from "../data/blogs.json";
import { getBlogPagesIndex, getBlogPages } from "./utils";

const PAGE_SIZES = [15, 25, 50, 100];


function BlogList() {
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPaginationData = useMemo(()=> 
    getBlogPages(currentPage,rowsPerPage,blogs)
  );

  const updateRowsPerPage = (rowNumber) => {
    // When user changes “X per page” (the only options will be 15, 25, 50 and 100), 
    // it should only display at maximum that amount of blogs per page and the first page is displayed
    setRowsPerPage(rowNumber);
    setCurrentPage(1);
  };
  const updatePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={rowsPerPage} // rowsPerPage is modified by the setRowsPerPage in updateRowsPerPage.
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
