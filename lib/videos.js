export const getVideos = async () => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=disney%20trailer&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

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
};



// import videoData from '../data/videos.json';

// export const getVideos = async () => {

//     const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

//     const response = await fetch(
//         `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${YOUTUBE_API_KEY}`);

//     const data = await response.json();

//     return data?.items.map((item) => {
//             return{
//                 title: item.snippet.title,
//                 imgUrl: item.snippet.thumbnails.high.url,
//                 id: item?.id?.videoId,
//             };
//     });
// };