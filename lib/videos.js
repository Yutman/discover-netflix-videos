export const getCommonVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3'
    const response = await fetch(
        `https://${BASE_URL}${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
        console.error("YouTube API Error:", data.error);
        return [];
    }

    console.log("Full API Response:", JSON.stringify(data, null, 2)); // Log full response to analyze its structure
        // confirms whether id.videoId is missing in some objects

    return data?.items
        .map((item, index) => {
            const videoId = item?.id?.videoId;
            if (!videoId) {
                console.warn(`Skipping item at index ${index} - Missing videoId:`, item);
            }

            return videoId
                ? {
                      title: item.snippet.title,
                      imgUrl: item.snippet.thumbnails.high.url,
                      id: videoId,
                  }
                : null; // Return null for invalid items
        })
        .filter(Boolean); // Remove null values from the final array
    }
    catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};

export const getVideos = async (searchQuery) => {
        const URL = `/search?part=snippet&type=video&maxResults=25&q=${searchQuery}&`;
        return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

  //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
  return getCommonVideos(URL);
};