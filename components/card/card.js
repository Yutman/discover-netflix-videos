import React, { useState } from 'react';
import Image from 'next/image';
import styles from './card.module.css';
import { motion } from 'framer-motion';
import cls from 'classnames';

const Card = (props) => {
  const {
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    size = 'medium',
    id,
    shouldScale = true,
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    );
  };

  // Apply scale to all cards when shouldScale is true
  const scale = shouldScale ? { scale: 1.05 } : { scale: 1.0 };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={scale}
      >
        <Image
          src={imgSrc}
          alt={`Video ${id}`}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;



