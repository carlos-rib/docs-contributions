import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';

import styles from './index.module.css';
import { CompanyLogoWithFill } from '../components/CompanyLogo/CompanyLogo';
import RaysBackground from '../components/RaysBackground/RaysBackground';

import { DotBackground } from '../components/DotBackground/DotBackground';
import { Button } from '../components/Button/Button';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroBannerContainer)}>
        <CompanyLogoWithFill large />
        <Heading as='h1' className='hero__title' style={{ marginTop: '16px' }}>
          {siteConfig.title}
        </Heading>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <p className='hero__subtitle2'>
          This repository is a minimal Docusaurus instance used to preview
          external contributions to the Kothar Docs.
        </p>
        <Button href='/docs/contributions'>
          Open Contributions
        </Button>

        <DotBackground />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <main
        className={styles.mainContainer}
        style={{ height: '100%', position: 'relative' }}
      >
        <RaysBackground
          raysOrigin='top-center'
          raysColor='#92eded'
          raysSpeed={0.7}
          lightSpread={0.8}
          rayLength={1}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className='custom-rays'
        />

        <HomepageHeader />

        <section className={styles['docs-main']}>
          <div className={styles['docs-hero']}>
            <h2 className={styles['docs-title']}>Contribution Rules</h2>
            <p className={styles['docs-subtitle']}>
              Follow these requirements so your pull request can be reviewed and
              integrated into the official docs site.
            </p>
          </div>

          <div className={styles['docs-card-grid']}>
            <div className={styles.acknowledgementsCard}>
              <p className={styles.acknowledgementsName}>
                Only edit docs/contributions
              </p>
              <p className={styles.acknowledgementsRole}>
                Changes outside that folder will be refused.
              </p>
            </div>
            <div className={styles.acknowledgementsCard}>
              <p className={styles.acknowledgementsName}>Use kebab-case</p>
              <p className={styles.acknowledgementsRole}>
                Keep file and folder names URL-friendly and consistent.
              </p>
            </div>
            <div className={styles.acknowledgementsCard}>
              <p className={styles.acknowledgementsName}>Rich content OK</p>
              <p className={styles.acknowledgementsRole}>
                Admonitions, inline LaTeX math, images, and Aleph Plotting
                .figure files are supported.
              </p>
            </div>
            <div className={styles.acknowledgementsCard}>
              <p className={styles.acknowledgementsName}>
                Submit via GitHub PR
              </p>
              <p className={styles.acknowledgementsRole}>
                The Kothar team reviews and merges accepted contributions into
                the official site.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
