import {useRouter} from "next/router";
import styles from "../../styles/Video.module.css";
import Modal from "react-modal";

import clsx from "classnames";
import {getYoutubeVideoById} from "../../lib/videos";


Modal.setAppElement("#__next"); // Set the app element for screen readers

export async function getStaticProps() {
    //  const video = {
    //   title: 'Shawshank Redemption',
    //   publishTime: '1994-09-23',
    //   description: 'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion',
    //   channelTitle: 'Warners Brothers',
    //   viewCount: '10000', 
    // };

    const videoId = 'PLl99DlL6b4';

    const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ['PLl99DlL6b4', 'WXTNngJsBrI', 
    'wyEOwHrpZH4'];

  const paths = listOfVideos.map((videoId) => ({
    params: {videoId},
  })); 
 
  return { paths, fallback: 'blocking' }
}


const Video = ({video})=> {
    const router = useRouter();
    
    const {
      title, 
      publishTime, 
      description, 
      channelTitle,
      statistics : {viewCount},
    } = video;
    
    return (
    <div className={styles.container}>
    <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={()=> router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe 
          id="ytplayer" 
          className={styles.videoPlayer}
          type="text/html" 
          width="100%" 
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameborder="0"
          ></iframe>

          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
                <div className={styles.col1}>
                  <p className={styles.publishTime}>
                    {publishTime}
                  </p>
                   <p className={styles.title}>
                    {title}
                  </p>
                   <p className={styles.description}>
                    {description}
                  </p>
                </div>
                 <div className={styles.col2}>
                   <p className={clsx(styles.subText, styles.subTextWrapper)}>
                    <span className={styles.textColor}>Cast: </span>
                     <span className={styles.channelTitle}>
                      {channelTitle}
                     </span>
                  </p>
                    <p className={clsx(styles.subText, styles.subTextWrapper)}>
                    <span className={styles.textColor}>View Count: </span>
                     <span className={styles.channelTitle}>
                      {viewCount}
                     </span>
                  </p>
                 </div>
            </div>
          </div>
      </Modal>
      </div>
    );
};

export default Video;