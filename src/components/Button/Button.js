import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ loadMore }) {
  return (
    <button className={styles.button} type="button" onClick={loadMore}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
