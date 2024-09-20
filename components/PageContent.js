import React, { useRef, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { notify } from "../helpers/utils.js";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import Image from "next/legacy/image";
import styles from "../styles/DocumentPreview.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PageContent = React.memo(function PageContent({ blob, width, scale }) {
  const { t } = useTranslation();
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <>
      <Document
        file={blob}
        loading={""}
        onLoadError={(error) => {
          mountedRef.current
            ? notify("error", t("common:file_load_error"))
            : null;
        }}
        error={
          <div className={`${styles.awa_a4} ${styles.awa_portrait} `}>
            <Image
              src="/img/corrupted-file.png"
              layout="fill"
              objectFit="contain"
              alt="corrupted-file"
            />
          </div>
        }
        renderMode={"canvas"}
      >
        <Page
          width={width}
          pageNumber={1}
          rotate={0}
          onRenderSuccess={(pdf) => {
            // Clean up to avoid memory issue
            pdf.cleanupAfterRender = true;
            pdf._ownerDocument = null;
            pdf._transport.commonObjs.clear();
            pdf._transport.fontLoader.clear();
            pdf._transport.loadingTask.destroy();
            pdf._transport.pageCache = [];
            pdf._transport._params = [];
            pdf._transport.pagePromises = [];
          }}
          loading={""}
          renderAnnotationLayer={false}
          renderInteractiveForms={false}
          renderTextLayer={false}
          renderMode={"canvas"}
          scale={scale}
        />
      </Document>
    </>
  );
});
export default PageContent;

PageContent.propTypes = {
  blob: PropTypes.object.isRequired,
};
