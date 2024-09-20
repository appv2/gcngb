import React from "react";
import {
  Trash,
  ArrowClockwise,
  ArrowCounterclockwise,
  ArrowLeft,
  ArrowRight,
  X,
} from "react-bootstrap-icons";
import PageContent from "./PageContent";
import { rotatePageRight, rotatePageLeft } from "../helpers/utils.js";
import styles from "../styles/PagePreviewerModal.module.css";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

const PagePreviwerModal = React.memo(function PagePreviwerModal({
  pages,
  setZoomedPage,
  currentPage,
  deletePage,
  handleRotatePageRight,
  handleRotatePageLeft,
}) {
  const { t } = useTranslation();
  const deleteZoomedOnPage = () => {
    //update zoomedOnPage
    const zoomedOnIndex = pages.findIndex((page) => page.id === currentPage.id);
    if (pages[zoomedOnIndex - 1]) {
      setZoomedPage(pages[zoomedOnIndex - 1]);
    } else {
      setZoomedPage(null);
    }
    //delete page from pages array
    deletePage(currentPage.id);
  };

  const moveToNextZoomedPage = () => {
    const zoomedOnIndex = pages.findIndex((page) => page.id === currentPage.id);
    if (pages[zoomedOnIndex + 1]) {
      setZoomedPage(pages[zoomedOnIndex + 1]);
    }
  };

  const moveToPreviousZoomedPage = () => {
    const zoomedOnIndex = pages.findIndex((page) => page.id === currentPage.id);
    if (pages[zoomedOnIndex - 1]) {
      setZoomedPage(pages[zoomedOnIndex - 1]);
    }
  };

  const jumpToPage = (index) => {
    if (pages[index]) {
      setZoomedPage(pages[index]);
    }
  };

  return (
    <>
      <div className={`${styles.modal_open}`}>
        <div
          id="modalPreview"
          className={`modal ${styles.modal} ${styles.modal_preview} ${styles.show}`}
          role="dialog"
          style={{
            display: "block",
            paddingRight: "16px",
          }}
        >
          <div
            className={`${styles.modal_backdrop} ${styles.show}`}
            onClick={() => {
              setZoomedPage(null);
            }}
          ></div>
          <div className={`${styles.modal_dialog}`}>
            <div className={`${styles.modal_content} h-100`}>
              <div className={`${styles.modal_panel}`}>
                <div>
                  <div className="d-flex justify-content-center relative">
                    <div className={`${styles.modal_actions}`}>
                      <button
                        className={`${styles.btn_icon_modal}`}
                        title={t("common:rotate_left")}
                        aria-label={t("common:rotate_left")}
                        onClick={() => {
                          //update zoomedOnPage rotation
                          const newRotation = rotatePageLeft(
                            currentPage.degree
                          );
                          const updatedZoomedOnPage = {
                            ...currentPage,
                            degree: newRotation,
                          };
                          setZoomedPage(updatedZoomedOnPage);

                          //update page rotation in pages array
                          handleRotatePageLeft(currentPage.id);
                        }}
                      >
                        <ArrowCounterclockwise />
                      </button>
                      <button
                        className={`${styles.btn_icon_modal}`}
                        title={t("common:rotate_right")}
                        aria-label={t("common:rotate_left")}
                        onClick={() => {
                          //update zoomedOnPage rotation
                          const newRotation = rotatePageRight(
                            currentPage.degree
                          );
                          const updatedZoomedOnPage = {
                            ...currentPage,
                            degree: newRotation,
                          };

                          setZoomedPage(updatedZoomedOnPage);

                          //update page rotation in pages array
                          handleRotatePageRight(currentPage.id);
                        }}
                      >
                        <ArrowClockwise />
                      </button>
                      {deletePage && (
                        <button
                          className={`${styles.btn_icon_modal}`}
                          title={t("common:delete")}
                          aria-label={t("common:delete")}
                          onClick={() => {
                            deleteZoomedOnPage();
                          }}
                        >
                          <Trash />
                        </button>
                      )}
                    </div>
                    <div className="d-flex">
                      <button
                        className={`${styles.btn_icon_modal} mr-1 mr-md-4 ${
                          currentPage.order === 1
                            ? `disabled ` + styles.disabled
                            : ""
                        }`}
                        title={t("common:previous_page")}
                        aria-label={t("common:previous_page")}
                        onClick={moveToPreviousZoomedPage}
                      >
                        <ArrowLeft />
                      </button>
                      <div className="color-white d-flex align-items-center mr-4">
                        <input
                          className={`${styles.modal_input} mr-2`}
                          type="number"
                          value={currentPage.order}
                          onChange={(e) => {
                            const index = parseInt(e.target.value);
                            if (index && typeof index == "number") {
                              jumpToPage(index - 1);
                            }
                          }}
                          max={pages.length}
                          min="1"
                          disabled={pages.length === 1 ? true : false}
                        />
                        <span className={`${styles.modal_info_total_count}`}>
                          {pages.length}
                        </span>
                      </div>
                      <button
                        className={`${styles.btn_icon_modal} ${
                          currentPage.order === pages.length
                            ? `disabled ` + styles.disabled
                            : ""
                        }`}
                        title={t("common:next_page")}
                        aria-label={t("common:next_page")}
                        onClick={moveToNextZoomedPage}
                      >
                        <ArrowRight />
                      </button>
                    </div>
                    <button
                      type="button"
                      className={`${styles.close} ${styles.btn_icon_modal}`}
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setZoomedPage(null);
                      }}
                    >
                      <X />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.modal_body} d-flex justify-content-center align-items-center h-100 m-9`}
                data-page-rotation={currentPage.degree}
              >
                <div
                  className={`${styles.modal_canvas_wrapper} ${
                    currentPage.width > currentPage.height
                      ? styles.modal_landscape
                      : styles.modal_portrait
                  }`}
                >
                  {currentPage && (
                    <PageContent
                      blob={currentPage.outputBlob}
                      width={400}
                      scale={1}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default PagePreviwerModal;

PagePreviwerModal.propTypes = {
  pages: PropTypes.array.isRequired,
  setZoomedPage: PropTypes.func.isRequired,
  currentPage: PropTypes.object.isRequired,
  handleRotatePageLeft: PropTypes.func.isRequired,
  handleRotatePageRight: PropTypes.func.isRequired,
};
