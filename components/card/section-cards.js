import { useRef } from 'react';
import Card from './card';
import Link from 'next/link';
import clsx from 'classnames';
import styles from './section-cards.module.css';

const SectionCards = (props) => {
  const { title, videos = [], size, shouldWrap = false, shouldScale = true } = props;
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (shouldWrap) return; // Skip for my-list grid layout

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Mouse position relative to wrapper
    const edgeWidth = 100; // Width of hover-sensitive edge (pixels)
    const scrollSpeed = 10; // Pixels per frame

    // Scroll left if mouse is near left edge
    if (mouseX < edgeWidth && wrapper.scrollLeft > 0) {
      wrapper.scrollBy({ left: -scrollSpeed, behavior: 'smooth' });
    }
    // Scroll right if mouse is near right edge
    else if (mouseX > rect.width - edgeWidth && wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth) {
      wrapper.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}
        ref={wrapperRef}
        onMouseMove={shouldWrap ? null : handleMouseMove} // Only for horizontal scrolling
      >
        {videos.map((video, idx) => (
          <Link href={`/video/${video.id}`} key={video.id}>
            <Card
              id={idx}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;

