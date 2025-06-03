import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

import {getPopularVideos, getVideos, getWatchItAgainVideos} from '../lib/videos';


export async function getServerSideProps() {


  const userId = 'did:ethr:0xBcF9e233e348111aE12ebA0af0197cB33B3DF977';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweEJjRjllMjMzZTM0ODExMWFFMTJlYkEwYWYwMTk3Y0IzM0IzREY5NzciLCJwdWJsaWNBZGRyZXNzIjoiMHhCY0Y5ZTIzM2UzNDgxMTFhRTEyZWJBMGFmMDE5N2NCMzNCM0RGOTc3IiwiZW1haWwiOiJuaW1pbWlzaGlyaUBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwidXNlcm5hbWUiOm51bGwsIndhbGxldHMiOltdLCJpYXQiOjE3NDg5NDk4NDUsImV4cCI6MTc0OTU1NDY0NSwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4QmNGOWUyMzNlMzQ4MTExYUUxMmViQTBhZjAxOTdjQjMzQjNERjk3NyJ9fQ.IiZHIDSJl33MfQLVTxdJvrc-zGinPbnP2Mffx-z92uo' ;
   const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
   console.log({watchItAgainVideos});
   
    const disneyVideos = await getVideos
    ('disneytrailer');

     const productivityVideos = await getVideos
    ('Productivity');

     const travelVideos = await getVideos
    ('travel');

     const popularVideos = await getPopularVideos();

    return { props: {disneyVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos},
  };
}

export default function Home({
  disneyVideos, 
  travelVideos, 
  productivityVideos,
  popularVideos,
  watchItAgainVideos,
}) {
 
  return (
  <div className={styles.container}>
      <Head>
        <title>Netflix App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar  username='muchiri@a2z.com'/>
       <Banner
          videoId='PLl99DlL6b4' 
          title='Shawshank Redemption'
          subTitle='Drama'
          imgUrl='/static/images/shawshank_redemption.jpg'   
       />

       <div className={styles.sectionWrapper}>
       <SectionCards title='Disney' videos={disneyVideos} size='large'/>
        <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small"
        />
       <SectionCards title='Travel' videos={travelVideos} size='small'/>
        <SectionCards title='Productivity' videos={productivityVideos} size='medium'/>
         <SectionCards title='Popular' videos={popularVideos} size='small'/>
       </div>
       </div>
      </div>
  );
}
