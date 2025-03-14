import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

export default function Home() {
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
       
       <SectionCards title='Disney'/>
      </div>
  );
}
