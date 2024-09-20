import React from "react";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import styles from "../styles/Alert.module.css";

const Alerts = React.memo(function Alerts({
  alerts,
  type = "waning" | "error",
  icon,
}) {
  const { t } = useTranslation();
  const alertClass = styles[`${type}_msg`]; // Get the appropriate CSS Module class dynamically

  return (
    <div className="row w-100 d-flex justify-content-center mt-2 mb-1">
      <div className={alertClass}>
        <div className="row justify-content-center">
          <div
            className="col-md-2"
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {icon}
          </div>

          <div className="col-md-10 mt-2 mb-2">
            {alerts.length === 1
              ? t("common:file_error")
              : alerts.length > 1
              ? t("common:files_error")
              : ""}
            <ul
              style={{
                marginBottom: "0px",
                marginTop: "10px",
              }}
            >
              {alerts.map((error) => {
                return (
                  <li
                    key={`doc-${type}${error.document.id}`}
                  >{`${error.document.fileName}`}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Alerts;

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};
