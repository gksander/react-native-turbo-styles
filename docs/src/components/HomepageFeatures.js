import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Constraints",
    Svg: require("../../static/img/choice.svg").default,
    description: (
      <>
        TurboStyles takes a <em>design-by-constraints</em> approach, giving you
        design guard-rails. This keeps you productive, and keeps your designs
        consistent.
      </>
    ),
  },
  {
    title: "Ergonomics",
    Svg: require("../../static/img/productivity.svg").default,
    description: (
      <>
        TurboStyles drastically reduces the amount of typing you need to do to
        create great designs by using a nemonic naming system similar to
        TailwindCSS's.
      </>
    ),
  },
  {
    title: "Type-Safety",
    Svg: require("../../static/img/unlock.svg").default,
    description: (
      <>
        TurboStyles provides type-safety out of the box, helping you avoid
        errors and drastically improving the developer experience.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
