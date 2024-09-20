import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowUpSquareFill } from "react-bootstrap-icons";
import styles from "../styles/BackToTop.module.css";
import Link from "next/link";

const BackToTopButton = React.memo(function BackToTopButton() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleShowBackToTopBTN = function () {
      if (document.body.scrollTop > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    document.body.addEventListener("scroll", handleShowBackToTopBTN);

    return () => {
      document.body.removeEventListener("scroll", handleShowBackToTopBTN);
    };
  }, []);

  return (
    <>
      <Link
        href={router.pathname}
        id="back-to-top-btn"
        className={`${styles.back_to_top_btn} ${showButton && styles.show}`}
        scroll={true}
        prefetch={false}
      >
        <ArrowUpSquareFill />
      </Link>
    </>
  );
});

export default BackToTopButton;
