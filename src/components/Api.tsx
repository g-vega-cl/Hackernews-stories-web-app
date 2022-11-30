import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getArticlesAPI = () => {
    // This is cached and saved locally for 24h
  const { isLoading: isLoadingArticleIds, data: articleIds } = useQuery({queryKey:["hackerNews-article-ids"], queryFn:() => {
    return axios
      .get("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy=%22$key%22&limitToFirst=30")
      .then((res) => res.data)
    },
    refetchOnWindowFocus: false,
  });

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
    enabled: articleIds?.length > 0,
    refetchOnWindowFocus: false,
  });


  return {
    articles, isLoadingArticles, isLoadingArticleIds, articlesError
  }
}

export const getCommentsAPI = (currentPaginationData) => {
    const { error: commentsError, data: comments, refetch: refetchComments } = useQuery({
        queryKey: [`hackerNews-comments`], //Adding currentPage here blocks refetching unless currentPage changes.
        queryFn: async () => { // THIS IS O(n2). BUT WE NEED TO do O(n2) because we want to go through every comment.
        const articlesWithComments = {};
        for(let i = 0; i < currentPaginationData.length; i++){
            const article = currentPaginationData[i];
            if(comments !== undefined && comments[article.id]){
            continue;
            }
            const articleComments = await Promise.all(article.kids.map(async (kidId) => {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${kidId}.json`);
                const data = res.json();
            // WE want the top commenter names for each article. With the total number of comments they posted, we could calculate this here.
                // BUT since we are fetching the comments anyways, I'd rather cache the comments and then calculate what we need.
            return data;
            }));

            articlesWithComments[article.id] = articleComments;
        }
        if(comments !== undefined){
            return {...comments, ...articlesWithComments}
        } else {
            return articlesWithComments;
        }
        },
        enabled: currentPaginationData?.length > 0 // The query will not execute until the articleIds?.length > 0 is true
    });
    return {comments, commentsError, refetchComments}
}