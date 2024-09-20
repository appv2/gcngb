import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import pageStyles from "../styles/Page.module.css";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "contact"])),
    },
  };
}

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* Anything you add here will be added this page only */}
        <title>Contact Us</title>
        <meta name="description" content="" />
        <meta name="Keywords" content="" />
        <meta name="robots" content="noindex,nofollow" />
        {/* You can add your canonical here */}
        {/* You can add your alternate here */}
      </Head>
      <main>
        <header className="page_section header mb-0">
          <h1 className="title">{t("common:contact")}</h1>
        </header>
        <section className="page_section mt-0">
          <article className="container">
            <section>
              <p className={`${pageStyles.paragraph_text}`}>
                {t("contact:contact_text")}
              </p>
            </section>
          </article>
        </section>
      </main>
    </>
  );
};

export default Contacts;
