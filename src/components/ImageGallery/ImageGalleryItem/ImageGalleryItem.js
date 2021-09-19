import React from 'react';
import styles from '../ImageGallery.module.css';

const ImageGalleryItem = ({ webformatURL, onClick, largeImg }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={onClick}>
      <img
        src={webformatURL}
        alt="#"
        data-src={largeImg}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
