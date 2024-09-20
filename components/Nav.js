import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LangModal from "./LangModal";
import LanguageCountryFlag from "./LanguageCountryFlag";
import styles from "../styles/NavBar.module.css";

const Nav = React.memo(function Nav() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header>
        <nav className={`${styles.navigation}`}>
          <div className="container d-flex justify-content-between">
            <Link href="/" className={`${styles.logo}`}>
              <h3>
                <span style={{ color: "#7d64ff" }}>PDF</span>
                <span style={{ color: "#2d3748" }}>Merger</span>
                <span className="dot"></span>
              </h3>
            </Link>
            <div className={`${styles.nav_action}`}>
              <div
                className={`${styles.btn_primary}`}
                onClick={() => setShowModal(true)}
              >
                <LanguageCountryFlag locale={router.locale} />
              </div>
            </div>
          </div>
        </nav>
      </header>
      {showModal && (
        <LangModal show={showModal} onClose={() => setShowModal(false)} />
      )}
    </>
  );
});

export default Nav;
