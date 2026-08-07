import React, { useState, useEffect } from 'react';
import styles from './HowItWorksFooterTop.module.sass';
import FeatureList from '../../HowItWorksHeader/HowItWorksHeaderBottom/HeaderNavigation/Common/FeatureList/FeatureList';
import CONSTANTS from '../../../../constants';
import {
  servicesItems,
  registrationItems,
  toolsItems,
  sellersItems,
  namingItems,
  brandProtectionItems,
  creativesItems,
  atomItems,
  supportItems,
  partnerItems,
  legalItems,
} from './Items';

const HowItWorksFooterTop = () => {
  const [openSections, setOpenSections] = useState({
    services: false,
    registration: false,
    tools: false,
    sellers: false,
    namingBranding: false,
    brandProtection: false,
    creatives: false,
    atom: false,
    support: false,
    partner: false,
    legal: false,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 990);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className={styles.container}>
      <nav className={styles.wrapper}>
        <div className={styles.column}>
          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.services ? styles.active : ''
              }`}
              onClick={() => toggleSection('services')}
              aria-expanded={openSections.services}
            >
              <strong>Domain Services</strong>

              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.services ? styles.active : ''
              }`}
            >
              <FeatureList
                title={isMobile ? null : 'Domain Services'}
                items={servicesItems}
              />
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.registration ? styles.active : ''
              }`}
              onClick={() => toggleSection('registration')}
              aria-expanded={openSections.registration}
            >
              <strong>Domain Registration</strong>

              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.registration ? styles.active : ''
              }`}
            >
              <FeatureList
                title={isMobile ? null : 'Domain Registration'}
                items={registrationItems}
              />
            </div>
          </section>
        </div>

        <div className={styles.column}>
          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.tools ? styles.active : ''
              }`}
              onClick={() => toggleSection('tools')}
              aria-expanded={openSections.tools}
            >
              <strong>Domain Tools</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.tools ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Domain Tools'}
                  items={toolsItems}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.sellers ? styles.active : ''
              }`}
              onClick={() => toggleSection('sellers')}
              aria-expanded={openSections.sellers}
            >
              <strong>Domain Sellers</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.sellers ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Domain Sellers'}
                  items={sellersItems}
                />
              </div>
            </div>
          </section>
        </div>

        <div className={styles.column}>
          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.namingBranding ? styles.active : ''
              }`}
              onClick={() => toggleSection('namingBranding')}
              aria-expanded={openSections.namingBranding}
            >
              <strong>Naming & Branding</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.namingBranding ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Naming & Branding'}
                  items={namingItems}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.brandProtection ? styles.active : ''
              }`}
              onClick={() => toggleSection('brandProtection')}
              aria-expanded={openSections.brandProtection}
            >
              <strong>Brand Protection</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.brandProtection ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Brand Protection'}
                  items={brandProtectionItems}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.creatives ? styles.active : ''
              }`}
              onClick={() => toggleSection('creatives')}
              aria-expanded={openSections.creatives}
            >
              <strong>Creatives</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.creatives ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Creatives'}
                  items={creativesItems}
                />
              </div>
            </div>
          </section>
        </div>

        <div className={styles.column}>
          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.atom ? styles.active : ''
              }`}
              onClick={() => toggleSection('atom')}
              aria-expanded={openSections.atom}
            >
              <strong>Atom</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.atom ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Atom'}
                  items={atomItems}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.support ? styles.active : ''
              }`}
              onClick={() => toggleSection('support')}
              aria-expanded={openSections.support}
            >
              <strong>Support</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.support ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Support'}
                  items={supportItems}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.partner ? styles.active : ''
              }`}
              onClick={() => toggleSection('partner')}
              aria-expanded={openSections.partner}
            >
              <strong>Partner with Us</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.partner ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Partner with Us'}
                  items={partnerItems}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <button
              className={`${styles.sectionHeader} ${
                openSections.legal ? styles.active : ''
              }`}
              onClick={() => toggleSection('legal')}
              aria-expanded={openSections.legal}
            >
              <strong>Legal</strong>
              <img
                className={styles.arrow}
                src={CONSTANTS.HOW_IT_WORKS_HEADER_ICON_ARROW_DOWN}
                alt="ArrowDown"
              />
            </button>
            <div
              className={`${styles.sectionContent} ${
                openSections.legal ? styles.active : ''
              }`}
            >
              <div className={styles.mobileColumn}>
                <FeatureList
                  title={isMobile ? null : 'Legal'}
                  items={legalItems}
                />
              </div>
            </div>
          </section>
        </div>
      </nav>
    </footer>
  );
};

export default HowItWorksFooterTop;
