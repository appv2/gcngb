import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import pageStyles from "../styles/Page.module.css";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "terms"])),
    },
  };
}

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* Anything you add here will be added to this page only */}
        <title>Terms Of Use</title>
        <meta name="description" content="" />
        <meta name="Keywords" content="" />
        <meta name="robots" content="noindex,nofollow" />
        {/* Anything you add here will be added this page only */}
        {/* You can add your canonical here */}
        {/* You can add your alternate here */}
      </Head>

      <main>
        <header className="page_section header mb-0">
          <h1 className="title">{t("common:terms")}</h1>
        </header>
        <section className="page_section mt-0">
          <article className="container">
            <section>
              <div className={`${pageStyles.paragraph_text}`}>
                <h3>{t("terms:title_01")}</h3>
                <p>{t("terms:paragraph_01")}</p>
                <h3>{t("terms:title_02")}</h3>
                <p>{t("terms:paragraph_02")}</p>
                <h3>{t("terms:title_03")}</h3>
                <p>{t("terms:paragraph_03")}</p>
                <h3>{t("terms:title_04")}</h3>
                <p>{t("terms:paragraph_04")}</p>
                <h3>{t("terms:title_05")}</h3>
                <ul>
                  <li>{t("terms:section_list_item_01")}</li>
                  <li>{t("terms:section_list_item_02")}</li>
                  <li>{t("terms:section_list_item_03")}</li>
                </ul>
              </div>
            </section>
          </article>
        </section>
      </main>
    </>
  );
};

export default TermsOfUse;
