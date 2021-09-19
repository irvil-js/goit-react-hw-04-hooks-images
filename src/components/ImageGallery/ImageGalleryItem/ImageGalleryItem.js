import React from "react";
import PropTypes from "prop-types";

import styles from "../ImageGallery.module.css";

function ImageGalleryItem({
  webformatURL = "https://picsum.photos/600/400",
  largeImageURL = "https://picsum.photos/600/400",
  tags,
  imageClick,
}) {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={webformatURL}
        data-sourse={largeImageURL}
        alt={tags}
        className={styles.image}
        onClick={imageClick}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  imageClick: PropTypes.func,
};
