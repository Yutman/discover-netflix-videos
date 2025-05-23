import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

import {getPopularVideos, getVideos} from '../lib/videos';



export async function getServerSideProps() {
    const disneyVideos = await getVideos
    ('disneytrailer');

     const productivityVideos = await getVideos
    ('Productivity');

     const travelVideos = await getVideos
    ('travel');

     const popularVideos = await getPopularVideos();

    return { props: {disneyVideos, travelVideos, productivityVideos, popularVideos},
  };
}

export default function Home({
  disneyVideos, 
  travelVideos, 
  productivityVideos,
  popularVideos
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
       <SectionCards title='Travel' videos={travelVideos} size='small'/>
        <SectionCards title='Productivity' videos={productivityVideos} size='medium'/>
         <SectionCards title='Popular' videos={popularVideos} size='small'/>
       </div>
       </div>
      </div>
  );
}
