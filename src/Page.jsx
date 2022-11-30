import React from "react";
import ArticleList from "./components/ArticleList";
import StyledNavbar from "./components/Navbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Blog() {
  return (
    <div style={{ margin: "auto", width: "93%"}}>
      <StyledNavbar />
      <div style={{ marginTop: 30, display: "flex" }}>
        <ArticleList />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Blog;
