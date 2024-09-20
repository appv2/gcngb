import React, { useRef, useEffect } from "react";
import styles from "../styles/DocumentPreview.module.css";
import PropTypes from "prop-types";
const FileButton = React.memo(function FileButton({
  children,
  title,
  onClick,
  hideOnMobile,
}) {
  const buttonRef = useRef();
  useEffect(() => {
    //save refs to remove events in clean up function
    const buttonRefCurrent = buttonRef.current;

    //cleanup function
    return () => {
      //removing event listeners
      buttonRefCurrent?.removeEventListener("click", onClick, false);
    };
  }, []);
  return (
    <button
      ref={buttonRef}
      className={`${styles.file_btn} ${
        hideOnMobile && styles.hide_btn_on_mobile
      }`}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default FileButton;

FileButton.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
