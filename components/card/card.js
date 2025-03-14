import React from 'react'
import { useState } from 'react';

import Image from 'next/image';
import styles from './card.module.css';
import { motion } from 'framer-motion';
import cls from 'classnames';

const Card = (props) => {
    const {imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            size='medium'} = props;

    
    const [imgSrc, setImgSrc]=useState(imgUrl);
    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem,
    };

    const handleOnError = () => {
        console.log('Hii Error');
        setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    }

  return ( 
  <div className={styles.container}> 
    Card
    <motion.div className={cls(styles.imgMotionWrapper, 
                               classMap[size])}
     whileHover={{ scale: 1.2 }}>
    <Image 
        src={imgSrc} 
        alt='image'
        layout='fill'
        onError={handleOnError}
        className={styles.cardImg}
    /> 
    </motion.div>
    </div>
  )
};

export default Card;
