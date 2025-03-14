import React from 'react'
import Card from './card';
import styles from './section-cards.module.css';

const SectionCards = (props) => {

    const {title} = props;

  return (
  <section className={styles.container}>
           <h2 className={styles.title}>{title}</h2>
    <div className={styles.cardWrapper}>
        <Card 
          imgUrl='/static/images/shawshank_redemption.jpg'
          size='large'/>
    </div> 
    </section>
  )
};

export default SectionCards;
