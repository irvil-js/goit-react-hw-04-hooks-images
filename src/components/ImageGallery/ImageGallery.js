import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, largeURL }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={index}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          imageClick={largeURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  largeURL: PropTypes.func,
};
