import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (event) => {
    setImageName(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (imageName.trim() === "") {
      toast.error("Введите текст для поиска");
      return;
    }

    onSubmit(imageName);
    setImageName("");
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.label}>Search</span>
        </button>
        <input
          value={imageName}
          onChange={handleNameChange}
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  imageName: PropTypes.string,
};
