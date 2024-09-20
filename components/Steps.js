import React from "react";
import Step from "./Step";
import styles from "../styles/Steps.module.css";
import PropTypes from "prop-types";
import pageStyles from "../styles/Page.module.css";
const Steps = React.memo(function Steps({ title, stepsArray }) {
  return (
    <section className="page_section">
      <article className={`container banner ${styles.steps_section}`}>
        <section className="w-100 mb-5">
          <header>
            <h2 className={`${styles.steps_title} mt-0`}>{title}</h2>
            <div
              className={`${pageStyles.divider} ${pageStyles.mx_auto}`}
            ></div>
          </header>
        </section>
        <section
          className="w-100"
          style={{
            paddingLeft: "6%",
            paddingRight: "6%",
          }}
        >
          <div>
            {stepsArray.map((step, i) => {
              return (
                <Step
                  key={"step" + i}
                  number={step.number}
                  description={step.description}
                />
              );
            })}
          </div>
        </section>
      </article>
    </section>
  );
});

export default Steps;

Steps.propTypes = {
  title: PropTypes.string.isRequired,
  stepsArray: PropTypes.array.isRequired,
};
