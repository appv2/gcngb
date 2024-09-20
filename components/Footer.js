import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import styles from "../styles/Footer.module.css";

const Footer = React.memo(function Footer() {
  const { t } = useTranslation();

  const mountedRef = useRef();
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <footer className={`${styles.page_footer}`}>
      <div className={`container text-center mb-0`}>
        <div className="row">
          <div className="col-lg-12">
            <Link href="/" scroll={true}>
              <h3>
                <span style={{ color: "#096a34" }}>Genie</span>
                <span style={{ color: "#3c4365" }}>Merge</span>
              
              </h3>
            </Link>
          </div>
        </div>


        <div className="row">
          <div className="col-lg-12 py-3 d-flex justify-content-center">
            <p className={`text-center ${styles.copyright}`}>
              Copyright &copy;{" "}
              <Link href="/" target="_blank">
                Connected 2024-2025
              </Link>
              . {t("common:all_rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
