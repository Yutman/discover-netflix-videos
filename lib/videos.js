import videoTestData from '../data/videos.json';
import { getWatchedVideos } from './db/hasura';

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

     const response = await fetch(
       `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
     );
     return await response.json();
}


export const getCommonVideos = async (url) => {
   try {
    const isDev = process.env.DEVELOPMENT;
     const data = isDev ? videoTestData : await fetchVideos(url);
     if (data?.error) {
        console.error('Youtube API error', data.error);
        return [];
     }

     console.log("Fetched Data:", data.items);

     return data?.items.map((item) => {
        console.log({id: item.id});
        const id = item?.id?.videoId || item?.id;

        const snippet = item.snippet;
        return {
            title: snippet.title,
            imgUrl: snippet.thumbnails.high.url,
            id,
            description: snippet.description,
            publishTime: snippet.publishedAt,
            channelTitle: snippet.channelTitle,
            statistics: item.statistics 
                        ? item.statistics
                        : {viewCount: 0},
        };  
     });
   } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
   }
};
     
 export const getVideos = (searchQuery) => {
   const URL = `search?part=snippet&q=${searchQuery}&type=video`;
   return getCommonVideos(URL);
 };

 export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=KE";

  return getCommonVideos(URL);
};

 export const getYoutubeVideoById = (videoId) => {
  const URL =
     `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  
  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
      };
    }) || []
  );
};