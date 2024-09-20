import React from "react";
import styles from "../styles/Spinner.module.css";
import PropTypes from "prop-types";
const Spinner = React.memo(function Spinner({ isSpinnerActive }) {
  return (
    <>
      <div
        className={`${styles.spinner} ${isSpinnerActive ? styles.active : ""}`}
      >
        <div className={`${styles.spinner_inner} ${styles.fixed}`}></div>
      </div>
    </>
  );
});
export default Spinner;

Spinner.propTypes = {
  isSpinnerActive: PropTypes.bool.isRequired,
};
