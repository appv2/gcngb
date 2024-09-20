import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/errorPage.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "page404"])),
    },
  };
}

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* Anything you add here will be added this page only */}
        <title>404 Error</title>
        <meta name="description" content="" />
        <meta name="Keywords" content="" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main>
        <section className="page_section">
          <article>
            <div className={`${styles.notfound_wrapper}`}>
              <div className={`${styles.notfound}`}>
                <div className={`${styles.notfound_404}`}>
                  <h1>404</h1>
                </div>
                <h2>{t("page404:oops")}</h2>
                <div>
                  {t("page404:we_are_sorry")}
                  <Link href="/">{t("page404:go_back_to")}</Link>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default NotFound;
