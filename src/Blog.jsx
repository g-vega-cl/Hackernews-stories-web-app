import React from "react";
import BlogList from "./components/BlogList";
import StyledNavbar from "./components/Navbar";
import StickySidebar from "./components/StickySidebar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Blog() {
  return (
    <div style={{ margin: "0 auto", width: "100%", padding: 20 }}>
      {/* <StyledNavbar /> */}
      <div style={{ marginTop: 60, display: "flex" }}>
        <BlogList />
        {/* <StickySidebar /> */}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Blog;
