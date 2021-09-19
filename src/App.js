// import React, { useState, useEffect } from "react";
// import SearchBar from "./components/Searchbar";
// import ImageGallery from "./components/ImageGallery";
// import Button from "./components/Button";
// import Modal from "./components/Modal";
// import AppLoader from "./components/Loader";
// import fetchImages from "./services/api-service";
// import styles from "./App.module.css";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import styles from "./App.module.css";

import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button/";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import ImageErrorView from "./components/ImageGallery/ImageErrorView";

import galleryAPI from "./services/api-service";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const [imageName, setImageName] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (imageName) => {
    galleryAPI.resetPage();

    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  const toggleModal = () => {
    setLargeImageURL("");
  };

  const largeImgModal = (event) => {
    const imagesClick = event.target;

    if (imagesClick.nodeName !== "IMG") {
      return;
    }

    const largeURL = imagesClick.dataset.sourse;
    setLargeImageURL(largeURL);
  };

  useEffect(() => {
    if (imageName === "") {
      return;
    }

    setStatus(Status.PENDING);

    const scrollPage = () => {
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: "smooth",
      });
    };

    galleryAPI
      .fetchGallery(imageName, page)

      .then(({ hits, total }) => {
        if (hits.length === 0) {
          toast.error("По вашему запросу нет нужного результата!");
        }
        setImages((i) => [...i, ...hits]);
        setTotal(total);
        setIsLoading(false);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    scrollPage();
  }, [imageName, page]);

  const onLoadMore = () => {
    setIsLoading(true);
    setPage((page) => page + 1);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.IDLE && (
        <div className={styles.text}>Введите текст для поиска</div>
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ImageErrorView message={error.message} />}
      {total > 1 && status === Status.RESOLVED && (
        <ImageGallery images={images} largeURL={largeImgModal} />
      )}
      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={imageName} />
        </Modal>
      )}
      {isLoading && <Loader />}

      {total > images.length && <Button loadMore={onLoadMore} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
