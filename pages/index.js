import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

export default function Home() {

  const disneyVideos =[
    {
      imgUrl: '/static/images/shawshank_redemption.jpg',
    },
     {
      imgUrl: '/static/images/shawshank_redemption.jpg',
    },
     {
      imgUrl: '/static/images/shawshank_redemption.jpg',
    },

  ]
  return (
  <div className={styles.container}>
      <Head>
        <title>Netflix App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <NavBar 
          username='muchiri@a2z.com'
          />
       <Banner 
          title='Shawshank Redemption'
          subTitle='Drama'
          imgUrl='/static/images/shawshank_redemption.jpg'   
       />

       <div className={styles.sectionWrapper}>
       <SectionCards title='Disney' videos={disneyVideos} size='large'/>
       <SectionCards title='Disney' videos={disneyVideos} size='medium'/>
       </div>
      </div>
  );
}
