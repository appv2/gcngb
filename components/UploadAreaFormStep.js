import React, { useEffect, useRef } from "react";
import { FileEarmarkPlus, FileEarmarkPdfFill } from "react-bootstrap-icons";
import { useTranslation } from "next-i18next";
import styles from "../styles/UploadContainer.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { notify, handlePreventDefault } from "../helpers/utils";
const UploadAreaFormStep = React.memo(function UploadAreaFormStep({
  handleChange,
  isSpinnerActive,
  isMultipleInput,
  acceptedMimeType,
}) {
  const { t } = useTranslation();
  const formRef = useRef();
  const dropZone = useRef();
  const file = useRef();

  useEffect(() => {
    //save refs to remove events in clean up function
    const fileRef = file.current;
    const dropZoneRef = dropZone.current;
    const formRefCurrent = formRef.current;

    //cleanup function
    return () => {
      //removing event listeners
      fileRef?.removeEventListener("change", handleChange, false);
      dropZoneRef?.removeEventListener("drop", handleChange, false);
      dropZoneRef?.removeEventListener("dragover", handlePreventDefault, false);
      dropZoneRef?.removeEventListener(
        "dragenter",
        handlePreventDefault,
        false
      );
      formRefCurrent?.removeEventListener(
        "submit",
        handlePreventDefault,
        false
      );
    };
  }, []);

  return (
    <section className={`${styles.toolbox} py-0 mt-0 ${styles.is_upload}`}>
      <form onSubmit={handlePreventDefault} ref={formRef}>
        <div
          id="drop-area"
          ref={dropZone}
          className={`${styles.toolbox_wrapper} d-flex`}
          onDragOver={handlePreventDefault}
          onDragEnter={handlePreventDefault}
          onDrop={(event) => {
            if (
              isMultipleInput === false &&
              event.dataTransfer.files.length > 1
            ) {
              event.preventDefault();
              notify(
                "error",
                "You can only drop one file at a time! Please select one file and try again."
              );
            } else {
              handleChange(event);
            }
          }}
        >
          <div className={`${styles.uploader} w-100`}>
            <label className={`${styles.input_file_label}`} htmlFor="inputFile">
              <div className="d-flex flex-column align-items-center">
                <input
                  type="file"
                  className={`${styles.input_file}`}
                  accept={acceptedMimeType}
                  id="inputFile"
                  name="file"
                  ref={file}
                  hidden
                  multiple={isMultipleInput}
                  onChange={handleChange}
                />

                <div className={`${styles.uploader}`}>
                  <div className={`${styles.uploader_image}`}>
                    <FileEarmarkPdfFill />
                  </div>
                  <div className={`${styles.upload_options} mt-3 mb-3`}>
                    <div className={`${styles.from_device_option}`}>
                      <FileEarmarkPlus size={20} />
                      <div
                        className={`${styles.upload_option_description}`}
                        title={t("common:select_files")}
                      >
                        {t("common:select_files")}
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.uploader_droptxt}`}>
                    {t("common:drop_files")}
                  </div>
                </div>
              </div>
            </label>
          </div>
          <Spinner isSpinnerActive={isSpinnerActive} />
        </div>
      </form>
    </section>
  );
});

export default UploadAreaFormStep;

UploadAreaFormStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isSpinnerActive: PropTypes.bool.isRequired,
  isMultipleInput: PropTypes.bool.isRequired,
};
