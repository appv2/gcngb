import React from "react";
import styles from "../styles/Feature.module.css";
import PropTypes from "prop-types";
const Feature = React.memo(function Feature({ title, description, icon }) {
  return (
    <div className={`${styles.feature_wrapper}`}>
      {icon}
      <div className={`${styles.feature_title}`}>{title}</div>
      <div className={`${styles.feature_desc}`}>{description}</div>
    </div>
  );
});

export default Feature;

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};
