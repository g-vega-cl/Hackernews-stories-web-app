import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getArticlesAPI = () => {
    // This is cached and saved locally for 24h
  const { isLoading: isLoadingArticleIds, data: articleIds } = useQuery({queryKey:["hackerNews-article-ids"], queryFn:() => {
    return axios
      .get("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy=%22$priority%22&limitToFirst=30")
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
    enabled: articleIds?.length > 0, // The query will not execute until the articleIds?.length > 0 is true
    refetchOnWindowFocus: false,
  });


  return {
    articles, isLoadingArticles, isLoadingArticleIds, articlesError
  }
}

//Technically this could also be used to fetch all comments inside a comment element.
export const getCommentsAPI = (items) => {
    const { error: commentsError, data: comments, refetch: refetchComments } = useQuery({
        queryKey: [`hackerNews-comments`],
        queryFn: async () => { // THIS IS O(n2). But we need O(n2) because we want to go through every comment in every item.
        const articlesWithComments = {};
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            if(comments !== undefined && comments[item.id]){
                continue;
            }
            const articleComments = await Promise.all(item.kids.map(async (kidId) => {
                const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${kidId}.json`);
                const data = res.json();
                return data;
            }));

            articlesWithComments[item.id] = articleComments;
        }
        if(comments !== undefined){
            return {...comments, ...articlesWithComments}
        } else {
            return articlesWithComments;
        }
        },
        enabled: items?.length > 0 // The query will not execute until the articleIds?.length > 0 is true
    });
    return {comments, commentsError, refetchComments}
}