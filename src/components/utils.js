import { useQuery } from "@tanstack/react-query";

export const getBlogPagesIndex = (currentPage, rowsPerPage) => {
    const indexes = {
      firstPostIndex: (currentPage-1)*rowsPerPage,
      lastPostIndex: (currentPage-1)*rowsPerPage+rowsPerPage,
    }
    return indexes
}

export const getPages = (currentPage,rowsPerPage, blogs) => {
    return blogs.posts.slice(getBlogPagesIndex(currentPage,rowsPerPage).firstPostIndex, getBlogPagesIndex(currentPage,rowsPerPage).lastPostIndex);
}

export const calculateLastPage = (totalCount, pageSize) => {
    return Math.ceil(totalCount/pageSize);
}

export const getPageSiblings = (currentPage, lastPage) => {
    const siblings = {
        firstSibling: currentPage !== 1 ? currentPage - 1 : 1,
        secondSibling: currentPage !== lastPage ? currentPage + 1 : lastPage,
    }
    return siblings;
}