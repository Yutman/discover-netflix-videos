import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner/banner";

export default function Home() {
  return (
  <div className={styles.container}>
      <Head>
        <title>Netflix App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <h1>Netflix</h1>

       <Banner/>

      {/* <NavBar/>
       <Card/> */}

      </div>
  );
}
