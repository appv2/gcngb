import React from "react";
import Link from "next/link";
import { XLg } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import LanguageCountryFlag from "./LanguageCountryFlag";
import styles from "../styles/LangModal.module.css";
import PropTypes from "prop-types";
const LangModal = React.memo(function LangModal({ show, onClose }) {
  const router = useRouter();
  return show ? (
    <div
      className={`${styles.lang_modal} col-12 col-md-2 mb-10 mb-md-0 order-first order-md-0`}
      id="lang_modal"
    >
      <div className={`${styles.lang_modal_overlay}`} onClick={onClose}></div>
      <div className={`${styles.lang_modal_wrap}`}>
        <div className={`${styles.lang_modal_inner}`}>
          <XLg
            className={`${styles.lang_modal_close}`}
            size={30}
            onClick={onClose}
          />
          <div className={`${styles.lang_modal_text} font-weight-bold`}>
            Select language
          </div>
          <ul className={`${styles.lang_modal_list} list-unstyled mb-0`}>
            {router.locales.map((locale) => {
              return (
                <li key={locale}>
                  <Link
                    href=""
                    locale={locale}
                    className={`${styles.lang_modal_link}`}
                    prefetch={false}
                  >
                    <LanguageCountryFlag locale={locale} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
});
export default LangModal;

LangModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
