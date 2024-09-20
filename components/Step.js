import React from "react";
import styles from "../styles/Step.module.css";
import PropTypes from "prop-types";
const Step = React.memo(function Step({ number, description }) {
  return (
    <div className={`${styles.step_wrapper}`}>
      <span className={`${styles.step_number}`}>{number}.</span>
      <span className={`${styles.step_desc}`}>{description}</span>
    </div>
  );
});

export default Step;

Step.propTypes = {
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};
