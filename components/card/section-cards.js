import React from 'react'
import Card from './card';
import styles from './section-cards.module.css';

const SectionCards = (props) => {

    const {title, videos, size} = props;
    console.log({videos});
    

  return (
  <section className={styles.container}>
           <h2 className={styles.title}>{title}</h2>
    <div className={styles.cardWrapper}>
       {videos.map ((video, idx) => { 
        // eslint-disable-next-line react/jsx-key
        return <Card  id={idx} imgUrl={video.imgUrl}
          size={size}/>
       })}
    </div> 
    </section>
  )
};

export default SectionCards;
