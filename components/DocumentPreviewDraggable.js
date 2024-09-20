import React, { useRef, useEffect } from "react";
import {
  ArrowClockwise,
  ArrowCounterclockwise,
  Trash,
  ZoomIn,
} from "react-bootstrap-icons";
import { formatBytes } from "../helpers/utils.js";
import styles from "../styles/DocumentPreview.module.css";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { isMobile } from "react-device-detect";
import PageContent from "./PageContent";
import PropTypes from "prop-types";
import FileButton from "./FileButton.js";
import { useTranslation } from "next-i18next";
const DocumentPreviewDraggable = React.memo(function DocumentPreviewDraggable({
  id,
  blob,
  width,
  height,
  degree,
  order,
  index,
  selectedPages,
  handleClearPageSelection,
  handleRearrangePages,
  handleSetInsertIndex,
  onSelectionChange,
  insertLineOnLeft,
  insertLineOnRight,
  isSelected,
  zoomOnPage,
  handleDeletePage,
  handleRotatePageLeft,
  handleRotatePageRight,
}) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag({
    type: "page",
    item: (monitor) => {
      const draggedPage = {
        id,
        order,
        outputBlob: blob,
        degree,
        width,
        height,
      };
      let pages;
      if (selectedPages.find((page) => page.id === id)) {
        pages = selectedPages;
      } else {
        handleClearPageSelection();
        onSelectionChange(index, null);
        pages = [draggedPage];
      }
      const otherPages = pages.concat();
      otherPages.splice(
        pages.findIndex((c) => c.id === id),
        1
      );
      const pagesDragStack = [draggedPage, ...otherPages];
      const pagesIDs = pages.map((c) => c.id);
      return { pages, pagesDragStack, draggedPage, pagesIDs };
    },
    isDragging: (monitor) => {
      return monitor.getItem().pagesIDs.includes(id);
    },
    end: (item, monitor) => {
      handleRearrangePages(item);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ hovered }, drop] = useDrop({
    accept: "page",
    hover: (item, monitor) => {
      const hoverIndex = index;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get horizontal middle
      const midX =
        hoverBoundingRect.left +
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const pointerOffset = monitor.getClientOffset();

      const newInsertIndex =
        pointerOffset.x < midX ? hoverIndex : hoverIndex + 1;
      handleSetInsertIndex(hoverIndex, newInsertIndex);

      //Add scroll in mobile
      if (isMobile) {
        if (monitor.getDifferenceFromInitialOffset().y > 0) {
          document.body.scrollLeft = 0;
          document.body.scrollTop = document.body.scrollTop + 2;
        }
        if (monitor.getDifferenceFromInitialOffset().y < 0) {
          document.body.scrollLeft = 0;
          document.body.scrollTop = document.body.scrollTop - 2;
        }
      }
    },
    collect: (monitor) => ({
      hovered: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const onClick = (e) => {
    onSelectionChange(index, e.ctrlKey);
  };

  useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, []);

  const opacity = isDragging ? 0.4 : 1;

  const borderLeft = insertLineOnLeft && hovered ? "2px solid #7d64ff" : null;

  const borderRight = insertLineOnRight && hovered ? "2px solid #7d64ff" : null;

  const fileOrioentation = width > height ? styles.landscape : styles.portrait;
  const fileSizeString = formatBytes(blob.size, 2);

  return (
    <>
      <div
        className={`preview ${styles.preview} ${
          isSelected ? styles.selected : ""
        }`}
        ref={ref}
        onClick={onClick}
        style={{ opacity, borderLeft, borderRight }}
        id={id}
        data-id={id}
        data-index={index}
        data-page-rotation={degree}
        data-page-number="1"
      >
        <div className="d-flex">
          <div className={`file ${styles.file}`} title={`${fileSizeString}`}>
            <div className={`${styles.file_actions}`}>
              {zoomOnPage && (
                <FileButton title={t("common:zoom")} onClick={zoomOnPage}>
                  <ZoomIn />
                </FileButton>
              )}

              {handleRotatePageLeft && (
                <FileButton
                  title={t("common:rotate_left")}
                  onClick={handleRotatePageLeft}
                  className={`${styles.hide_btn_on_mobile}`}
                  hideOnMobile={true}
                >
                  <ArrowCounterclockwise />
                </FileButton>
              )}

              {handleRotatePageRight && (
                <FileButton
                  title={t("common:rotate_right")}
                  onClick={handleRotatePageRight}
                >
                  <ArrowClockwise />
                </FileButton>
              )}

              <FileButton title={t("common:delete")} onClick={handleDeletePage}>
                <Trash />
              </FileButton>
            </div>
            <div
              className={`${styles.file_canvas} ${fileOrioentation}`}
              style={{ transform: `rotate(${degree}deg)` }}
            >
              <PageContent blob={blob} width={149} scale={1} />
            </div>
            <div className={`${styles.file_info}`}>
              <span className={`${styles.file_info_name}`}>{order}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default DocumentPreviewDraggable;

DocumentPreviewDraggable.propTypes = {
  id: PropTypes.number.isRequired,
  blob: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  degree: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  selectedPages: PropTypes.array.isRequired,
  handleClearPageSelection: PropTypes.func.isRequired,
  handleRearrangePages: PropTypes.func.isRequired,
  handleSetInsertIndex: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  insertLineOnLeft: PropTypes.bool.isRequired,
  insertLineOnRight: PropTypes.bool.isRequired,
  // isSelected: PropTypes.bool.isRequired,
  zoomOnPage: PropTypes.func.isRequired,
  handleDeletePage: PropTypes.func.isRequired,
  handleRotatePageLeft: PropTypes.func.isRequired,
  handleRotatePageRight: PropTypes.func.isRequired,
};
