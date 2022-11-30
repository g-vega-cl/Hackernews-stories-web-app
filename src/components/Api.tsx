import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getDataAPI = () => {
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