import React from "react";
import PropTypes from "prop-types";
import Image from "next/legacy/image";
const LanguageCountryFlag = React.memo(function LanguageCountryFlag({
  locale,
}) {
  const flags = {
    fr: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/fr.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="FR Flag"
        />
        Français
      </>
    ),
    id: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/id.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="ID Flag"
        />
        Indonesian
      </>
    ),

    da: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/dk.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="DK Flag"
        />
        Danish
      </>
    ),
    de: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/de.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="DE Flag"
        />
        German
      </>
    ),
    es: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/es.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="ES Flag"
        />
        Spanish
      </>
    ),
    it: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/it.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="IT Flag"
        />
        Italian
      </>
    ),
    nl: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/nl.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="NL Flag"
        />
        Dutch
      </>
    ),

    pt: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/pt.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="PT Flag"
        />
        Portuguese
      </>
    ),

    ru: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/ru.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="RU Flag"
        />
        Russian
      </>
    ),
    uk: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/ua.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="UA Flag"
        />
        Ukrainian
      </>
    ),
    ar: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/sa.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="SA Flag"
        />
        عربي
      </>
    ),
    hi: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/in.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="IN Flag"
        />
        Hindi
      </>
    ),
    ko: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/kr.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="KR Flag"
        />
        Korean
      </>
    ),
    zh: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/cn.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="CN Flag"
        />
        Chinese
      </>
    ),

    ja: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/jp.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="JP Flag"
        />
        Japanese
      </>
    ),
    en: (
      <>
        <Image
          src={
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/1x1/us.svg"
          }
          width={14}
          height={12}
          loading="lazy"
          alt="US Flag"
        />
        English
      </>
    ),
  };

  return flags[locale] || flags["en"];
});
export default LanguageCountryFlag;

LanguageCountryFlag.propTypes = {
  locale: PropTypes.string.isRequired,
};
