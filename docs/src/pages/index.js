import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import { LogoFull } from "../components/LogoFull";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero")}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <LogoFull />
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started"
            >
              🚀 Get Turbocharged! 🚀
            </Link>
            <div style={{ marginBottom: "2rem" }} />
          </div>
          <div className="col col--6">
            <video
              width="100%"
              autoPlay
              controls={false}
              muted
              loop
              className={clsx("shadow--md", styles.demoImg)}
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="React Native TurboStyles homepage"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
