import React from "react";
import PageContent from "./PageContent";
import styles from "../styles/DocumentPreview.module.css";
import PropTypes from "prop-types";

const PagesDragPreview = React.memo(function PagesDragPreview({ pages }) {
  let backPreviews = 1;
  if (pages.length === 2) {
    backPreviews = 2;
  } else if (pages.length >= 3) {
    backPreviews = 3;
  }

  return (
    <div>
      {pages.slice(0, backPreviews).map((page, i) => (
        <div
          key={page.id}
          className={`card ${styles.card} ${styles.card_dragged} ${styles.portrait}`}
          style={{
            zIndex: pages.length - i,
            transform: `rotateZ(${-i * 2.5}deg)`,
          }}
        >
          <PageContent blob={page.outputBlob} width={149} scale={1} />
        </div>
      ))}
    </div>
  );
});

export default PagesDragPreview;

PagesDragPreview.propTypes = {
  pages: PropTypes.array.isRequired,
};
