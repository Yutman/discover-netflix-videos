import {useRouter} from "next/router";
import styles from "../../styles/Video.module.css";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // Set the app element for screen readers

const Video = ()=> {
    const router = useRouter();
    console.log({router});
    
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
          type="text/html" 
          width="640" 
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameborder="0"
          ></iframe>
      </Modal>
      </div>
    );
};

export default Video;