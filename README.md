# Hackernews-stories-web-app
 web application that will print the title of the top 30 hacker news stories and the top 10 commenter names of these stories with the total number of comments that they posted (only for these 30 stories).

## Definitions
Stories that are dead or deleted will not be counted.
The top stories could be defined as:
1. Stories with the highest score. <- I'll use this one because it's easier to sort.
2. Most comments.
There is no need to worry, because hackerrank already does this for us! - 
    - I still need to sort the ones I get. BUUUT I THINK THEY ARE ALREADY SORTED.

New, Top and Best Stories
Up to 500 top and new stories are at /v0/topstories (also contains jobs) and /v0/newstories. Best stories are at /v0/beststories.
Example: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
It seems like we can limit the stories to fetch with: (https://github.com/jsuau/hacker-news-api)
    Simply add these parameters to your query and specify the number you wish to limit your response by.
    Path parameters
    Name	Value	Description
    limitToFirst	50	Limits the response to first 50 stories.
    orderBy	$priority	Orders stories by priority in a descending order.
    Sample request

    curl -X GET https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy="$priority"&limitToFirst=50
    Sample response

    NOTE: taking beststories without any orderby or orderby "$key" (they are the same), are NOT orderded by:
        * Alphabetical title
        * Alphabetical author.
        * Score - BUT IT SEEMS THAT IT DOES HAVE A BIG EFFECT. It seems to be a combination of score, descendants and kids. 
        * Descendants
        * Kids
        * Time

    By "$priority" it seems like score is indeed the order. confirm it.
        90% sure, I'll go for this. (Confirm later in code.)
    
    orderyby documentation is from firebase: https://firebase.google.com/docs/firestore/query-data/order-limit-data
        https://firebase.google.com/docs/database/rest/retrieve-data#limit-queries

    NOTE ON NOTE: After all, ordering by priority is fine: See link avobe, in the official firebase docs /retrieve-data#limit-queries
        NOTE: YOU SHOULD NOT ORDER BY PRIORITY: https://stackoverflow.com/questions/31577915/what-does-priority-mean-in-firebase

    This one works: https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy=%22$key%22&limitToFirst=30 instead of priority
        It's not sorted numerically by ID,
            DIG AND SEE IF IT'S SORTED BY STORY SCORE OR ALPHABETICAL OR WHAT? 


A top commenter could be defined as:
1. The highest karma. <- I will use this one because it's easier??? WILL I???
    * I would need to go through each story's kids -> order by karma: kids.sort((a,b) a.karma - b.karma) <- BUT WE NEED TO FETCH THE KIDS FIRST.
2. The highest number of comments in an article. <- I will also implement this one, probably using a button. Because even though the karma way is easier, this feels better as a design perspective.
    * I would need to make a count of how many times a user appears. kids for ((kid) => fetch(kid), kidSet = commenterName: timesSeen)  newSet.sort()
    WE NEED THE TOTAL NUMBER OF COMMENTS EACH COMMENTED, so use #2.


COMMENT ON O(n) time and space
    



In the hackernews documentation they mention: "Want to know the total number of comments on an article? Traverse the tree and count."
descendants:	In the case of stories or polls, the total comment count.
All stories, comments, asks, polls, and jobs are under the `/item/` url.

All users live under `/v0/user/`


To discover all items:
The current largest item id is at /v0/maxitem. You can walk backward from here to discover all items.
Example: https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty
## Steps taken:
1. Create boilerplate.

* Optimization Notes:
    1. We can cache. And should cache. - Use React query library. (How query cache works: https://www.youtube.com/watch?v=2TX8ojaSwF0)
    2. Lazy loading? I say yes. Use pagination, show 10 articles per page. - Depends. It might add complexity to the code where it is not needed.
2. Fetch data.
    * Fetch stories.
        1. Hackerstories provides us with a "beststories" endpoint, and firebase provides us with a "priortity" orderBy, which orders stories by score.
        This means that using the following endpoint we can retrieve only the top 30 stories (sorted): https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty&orderBy=%22$key%22&limitToFirst=30
            O(1) or O(n) - Not our problem, since we are retrieving from hackerrank.
        2. Now that we have the IDs, get the title of each story.


    * Get top commenters.
        1. Go through the kids in each story, create a set with the commenterName: {number-of-times-commented}. O(n)
        2. 

    

3. Display data.