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
- **Card**: Renders video cards in three sizes (large, medium, small) with hover effects and overlay. Includes error handling for broken images using a fallback to `/static/images/placeholder.jpg`.
- **Section Cards**: Displays video sections (e.g., "Disney Videos," "Popular") with horizontal scrolling.

## Navigation

- **Home (`/`)**: Displays featured banner and video sections (e.g., Disney, Popular). Uses SSG for performance.
- **Login (`/login`)**: Passwordless sign-in with email input and Magic link authentication.
- **My List (`/browse/my-list`)**: User-specific list of saved videos, fetched via SSR.
- **Video Page (`/video/[videoId]`)**: Dynamic route for individual videos (e.g., `/video/PLl99DlL6b4`). Uses SSR for user-specific data.

## Data Fetching

- **Static Site Generation (SSG)**: Used for homepage and genre listings for fast, scalable performance.
- **Server-Side Rendering (SSR)**: Used for user-specific content like "My List" and video pages.
- **Incremental Static Regeneration (ISR)**: Updates static content (e.g., new movies) with a revalidation interval, balancing freshness and speed.

## Authentication

- **Magic**: Passwordless authentication via email magic links. Users enter an email, receive a link, and are logged in upon clicking.
- **Hasura**: Stores user data (email, likes, dislikes) in a PostgreSQL database with GraphQL queries.
- **JWT**: Tokens are generated in `/api/login` and stored as cookies for session management.
- **Middleware**: Protects routes like `/` and `/browse/my-list`, redirecting unauthenticated users to `/login`.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Netlify CLI (`npm install -g netlify-cli`)
- Accounts for:
  - [Magic](https://dashboard.magic.link) (for authentication)
  - [Hasura Cloud](https://cloud.hasura.io) (for GraphQL backend)
  - [Google Cloud](https://console.cloud.google.com) (for YouTube API key)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd discover-videos
   ```
2. Installl dependencies:
   ```bash
   npm install
   ```
3. Create a .enc.local file:
   ```env
   NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=pk_live_...
   MAGIC_SERVER_KEY=sk_live_...
   JWT_SECRET=your_jwt_secret
    NEXT_PUBLIC_HASURA_ADMIN_URL=https://your-hasura-instance.hasura.app/v1/graphql
    NEXT_PUBLIC_HASURA_ADMIN_SECRET=your_hasura_secret
    YOUTUBE_API_KEY=your_youtube_api_key
   ```
### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```
Or, use Netlify CLI:
  ```bash
  netlify dev
```
2. Open http://localhost:8888 (Netlify CLI) or http://localhost:3000.
3. Sign in with a valid email to test the Magic link flow.

### Deployment on Netlify
1. Ensure netlify.toml is configured
```toml
[build]
  command = "next build"
  publish = ".next"
[[plugins]]
  package = "@netlify/plugin-nextjs"
```
2. Set environment variables in Netlify dashboard > Site configuration > Environment variables.
3. Push to your Git repository:
```bash
git push origin main
```
4. Deploy via Netlify dashboard or CLI:
```bash
netlify deploy --prod
```

### Magic Configuration
1. In Magic Dashboard:
   - Add to Allowed Origins:
       https://discover-videos.netlify.app
       http://localhost
   - Add to Redirect allowlist:
       https://discover-videos.netlify.app/login
       https://discover-videos.netlify.app/api/login
2. Save changes.

### Next.js Configuration
####  Image Optimization
```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
```
### Project Structure
```text
discover-videos/
├── pages/
│   ├── api/login.js        # Handles Magic token validation and JWT
│   ├── login.js           # Sign-in page with Magic authentication
│   ├── index.js           # Homepage with banner and video sections
│   ├── video/[videoId].js # Dynamic video pages
│   ├── browse/my-list.js  # User-specific list
├── lib/
│   ├── magic-client.js    # Magic SDK initialization
│   ├── cookies.js         # Cookie management
│   ├── db/hasura.js       # Hasura GraphQL queries
│   ├── videos.js          # YouTube API data fetching
├── utils/
│   ├── redirectUser.js    # Middleware for token validation
├── styles/
│   ├── Login.module.css   # CSS modules for styling
├── public/static/
│   ├── icons/netflix.svg  # Netflix logo
│   ├── images/placeholder.jpg # Fallback image
├── next.config.js         # Image optimization config
├── netlify.toml           # Netlify deployment config
```



   
