import React, { useRef, useEffect } from "react";
import { Facebook, Twitter, Reddit } from "react-bootstrap-icons";
import { useTranslation } from "next-i18next";
import styles from "../styles/Share.module.css";

const Share = React.memo(function Share() {
  const { t } = useTranslation();

  const mountedRef = useRef();
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  function share(i) {
    const wSize = "width=600,height=460",
      title = "share",
      // Sharer URLs
      fb = "https://www.facebook.com/sharer/sharer.php?u=", // 0. Facebook
      rd = "http://reddit.com/submit?url=", // 1. Reddit
      // URLs array
      url = [fb, rd];
    if (mountedRef.current) {
      const loc = encodeURIComponent(window.location.href);
      window.open(url[i] + loc, title, wSize);
    }
  }

  function twitter() {
    const wSize = "width=600,height=460";
    const title = "share";
    const tw = "https://twitter.com/share?url=";
    const text = "Title";
    const hashtag = "hashtags=Tags";
    if (mountedRef.current) {
      const loc = encodeURIComponent(window.location.href);
      window.open(tw + loc + "&" + text + "&" + hashtag, title, wSize);
    }
  }

  return (
    <>
      <section className="page_section">
        <article className={`container banner ${styles.share_section}`}>
          <section>
            <div className={`${styles.share_buttons}`}>
              <div className={`${styles.share_btn}`} onClick={() => share(0)}>
                <Facebook />
              </div>

              <div className={`${styles.share_btn}`} onClick={() => twitter()}>
                <Twitter />
              </div>

              <div className={`${styles.share_btn}`} onClick={() => share(1)}>
                <Reddit />
              </div>
            </div>
          </section>
          <section>
            <div className={`${styles.share_text}`}>
              <p>
                <strong>
                  <b>{t("common:share_thanks")}</b>
                </strong>
              </p>
              <p>{t("common:share_with_friends")}</p>
            </div>
          </section>
        </article>
      </section>
    </>
  );
});

export default Share;
