# Discover Videos

Discover Videos is a Netflix-inspired web application built with Next.js, allowing users to browse and search YouTube videos, manage a personalized "My List," and interact with videos via like/dislike features. It uses Magic for passwordless email authentication, Hasura for GraphQL-based data storage, and the YouTube Data API for video content. The app is deployed on Netlify at [https://discover-videos.netlify.app](https://discover-videos.netlify.app).

## Features
- **Passwordless Authentication**: Sign in using Magic’s email-based magic links.
- **Video Browsing**: Search and view popular YouTube videos with horizontal scrolling sections.
- **My List**: Save favorite videos to a user-specific list stored in Hasura.
- **Like/Dislike**: Interact with videos by liking or disliking them.
- **Responsive Design**: Optimized for desktop and mobile with hover effects and animations via Framer Motion.
- **Error Handling**: Fallback images for broken video thumbnails.

## Tech Stack
- **Frontend**: Next.js (^15.2.4), React, CSS Modules, Framer Motion, `classnames` (^2.5.1)
- **Authentication**: Magic (`magic-sdk` ^28.0.0)
- **Backend**: Hasura (GraphQL) with PostgreSQL
- **API**: YouTube Data API v3
- **Deployment**: Netlify (`@netlify/plugin-nextjs` ^5.0.0)
- **Other Dependencies**: `jsonwebtoken` (^9.0.0), `cookie` (^0.7.1), `node-fetch` (^2.6.7)

## Component Architecture
- **Navbar**: Contains Netflix logo, "My List" link, and user email dropdown (configurable).
- **Banner**: Displays a featured video with image, title, subtitle, and clickable button. Uses Google Fonts for styling.
- **Card**: Renders video cards in three sizes (large, medium, small) with hover effects and overlay. Includes error handling for broken images:
  ```
  const Card = (props) => {
    const { imgUrl = '/static/images/placeholder.jpg', size = 'medium' } = props;
    const [imgSrc, setImgSrc] = useState(imgUrl);
    const classMap = { large: styles.lgItem, medium: styles.mdItem, small: styles.smItem };
    const handleOnError = () => {
      console.log('Card: Image load error');
      setImgSrc('/static/images/placeholder.jpg');
    };
    return (
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ scale: 1.2 }}
      >
        <img src={imgSrc} onError={handleOnError} alt="Video thumbnail" />
      </motion.div>
    );
  };```
