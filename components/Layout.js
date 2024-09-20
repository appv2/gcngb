import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ToastAlert = dynamic(() => import("./ToastAlert"), {
  ssr: false,
});
const BackToTopButton = dynamic(() => import("./BackToTopButton"), {
  ssr: false,
});
import Nav from "./Nav";
import Footer from "./Footer";
import { rtlLanguages } from "../helpers/utils";
import { Poppins } from "next/font/google";

// Google Font
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Layout = ({ children }) => {
  const router = useRouter();
  const direction = rtlLanguages.includes(router.locale) ? "rtl" : "ltr";
  const langStyle = {
    direction: direction,
  };
  useEffect(() => {
    //Fucntion to scroll to the top of the page when route change
    const handleScroll = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    router.events.on("routeChangeComplete", handleScroll);
    return () => {
      router.events.off("routeChangeComplete", handleScroll);
    };
  });

  return (
    <div style={langStyle} className={poppins.className}>
      <ToastAlert />
      <BackToTopButton />

      <Nav />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
