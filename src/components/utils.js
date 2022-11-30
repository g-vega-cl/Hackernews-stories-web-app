export const getBlogPagesIndex = (currentPage, rowsPerPage) => {
    const indexes = {
      firstPostIndex: (currentPage-1)*rowsPerPage,
      lastPostIndex: (currentPage-1)*rowsPerPage+rowsPerPage,
    }
    return indexes
}

export const getPages = (currentPage,rowsPerPage, articles) => {
    if(!articles || articles.length === 0) return [];
    
    return articles.slice(getBlogPagesIndex(currentPage,rowsPerPage).firstPostIndex, getBlogPagesIndex(currentPage,rowsPerPage).lastPostIndex);
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

export const getTop10CommenterNames = (comments) => {
    //Could optimize by adding conditions like:
        // If the 10th most frequent comment commented 10 times, and there are 9 items left, stop.
    const commentorFrequency = {};
    Object.keys(comments).forEach((commentId) => {
        const comment = comments[commentId];
        console.log("Comment", comment);
        if(commentorFrequency[comment.by]){
            commentorFrequency[comment.by]++;
         }else{
            commentorFrequency[comment.by] = 1;
         }
    });

    const sortedCommentorNames = Object.keys(commentorFrequency).sort(function(a,b){return commentorFrequency[a]-commentorFrequency[b]})
    console.log("sortedCommentorNames", sortedCommentorNames);     // bar,me,you,foo
    // ONLY RETURN TOP 10.
    return sortedCommentorNames.slice(0,10);
}