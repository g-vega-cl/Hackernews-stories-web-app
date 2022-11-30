import React from "react";
import BlogList from "./components/BlogList";
import StyledNavbar from "./components/Navbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Blog() {
  return (
    <div style={{ margin: "auto", width: "93%"}}>
      <StyledNavbar />
      <div style={{ marginTop: 30, display: "flex" }}>
        <BlogList />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Blog;
