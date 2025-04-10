import {useRouter} from "next/router";
import styles from "../../styles/Video.module.css";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // Set the app element for screen readers

const Video = ()=> {
    const router = useRouter();
    console.log({router});
    
    return <div>Video Page{router.query.videoId}
    <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={()=> router.back()}
        overlayClassName={styles.overlay}
      >
      <div>Modal Body</div>
      </Modal>
      </div>;
};

export default Video;