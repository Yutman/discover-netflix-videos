import React from 'react'
import Card from './card';
import Link from 'next/link';
import styles from './section-cards.module.css';

const SectionCards = (props) => {

    const {title, videos = [], size} = props;
    console.log({videos});
    
  return (
  <section className={styles.container}>
           <h2 className={styles.title}>{title}</h2>
    <div className={styles.cardWrapper}>
       {videos.map ((video, idx) => { 
        // eslint-disable-next-line react/jsx-key
        return ( 
           <Link href={`/video/${video.id}`} key={video.id}>
        <Card  
                  id={idx} 
                  imgUrl={video.imgUrl}
                  size={size}
                  />              
                  </Link>
        );
       })}
    </div> 
    </section>
  )
};

export default SectionCards;
