import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Share from "../components/Share";
import pageStyles from "../styles/Page.module.css";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
}

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        {/* Anything you add here will be added this page only */}
        <title>About Us</title>
        <meta
          name="description"
          content="Learn more about our PDF tools web app, including its features, capabilities, and commitment to fast, reliable, and secure document manipulation. Discover how our app can help you merge, split, compress, convert, and more with ease."
        />
        <meta
          name="Keywords"
          content="PDF tools, PDF manipulation, PDF merge, PDF split, PDF compress, PDF convert"
        />
        <meta name="robots" content="noindex,nofollow" />
        {/* You can add your canonical here */}
        {/* You can add your alternate here */}
      </Head>

      <main>
        <header className="page_section header mb-0">
          <h1 className="title">{t("common:about")}</h1>
        </header>
        <section className="page_section mt-0">
          <article className="container">
            <section>
              <div className={`${pageStyles.paragraph_text}`}>
                <p>{t("about:paragraph_01")}</p>

                <p>{t("about:paragraph_02")}</p>

                <p>{t("about:paragraph_03")}</p>

                <p>{t("about:paragraph_04")}</p>
              </div>
            </section>
          </article>
        </section>

        <Share />
      </main>
    </>
  );
};

export default About;
