import React from 'react';
import styles from './HowItWorksFooterTop.module.sass';
import FeatureList from '../../HowItWorksHeader/HowItWorksHeaderBottom/HeaderNavigation/Common/FeatureList/FeatureList';

const HowItWorksFooterTop = () => {
  const servicesItems = [
    { link: 'https://www.atom.com/premium-domains-for-sale', title: 'Domain Services'},
    { link: 'https://www.atom.com/ultra-premium-marketplace/all', title: 'Ultra Premium Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/tld/.ai', title: '.ai Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/length/Short',title: 'Short Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/length/3%20Letters',title: '3 Letter Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/length/4%20Letters', title: '4 Letter Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/length/5%20Letters',title: '5 Letter Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/q/6%20letter', title: '6 Letter Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/q/7%20letter', title: '7 Letter Domains'},
    { link: 'https://www.atom.com/premium-domains-for-sale/type_of_name/One%20Word', title: 'One Word Domains'},
    { link: 'https://www.atom.com/aged-domains',title: 'Aged Domains'},
    { link: 'https://www.atom.com/aftermarket-domains', title: 'Aftermarket Domains'},
    { link: 'https://www.atom.com/expired-domains', title: 'Expired Domains'},
    { link: 'https://www.atom.com/rent-a-domain', title: 'Domains for Rent'},
    { link: 'https://www.atom.com/domain-broker', title: 'Domain Broker'},
    { link: 'https://chatgpt.com/g/g-68f9057af6ac81918cbf521ba7cad871-domain-name-availability-checker-from-atom-com', title: 'Domain Availability Check'},
    { link: 'https://chatgpt.com/g/g-68f91377058881919bda54f8ac714da8-premium-domain-finder-by-atom-com', title: 'Premium Domain Finder'},
    { link: 'https://www.atom.com/ai-domains-for-sale/short', title: 'Short AI Domains'},
    { link: 'https://www.atom.com/ai-domains-for-sale/3-letters', title: '3 Letter AI Domains'},
    { link: 'https://www.atom.com/ai-domains-for-sale/4-letters', title: '4 Letter AI Domains'},
    { link: 'https://www.atom.com/ai-domains-for-sale/5-letters', title: '5 Letter AI Domains'},
    { link: 'https://www.atom.com/ai-domains-for-sale/one-word', title: 'One Word AI Domains'},
  ];

  const toolsItems = [
    { link: 'https://www.atom.com/domain-name-generator',title: 'Domain Name Generator'},
    { link: 'https://www.atom.com/domain-appraisal',title: 'Domain Appraisal'},
    { link: 'https://www.atom.com/domain-extensions', title: 'Domain Extensions'},
    { link: 'https://www.atom.com/whois', title: 'WHOIS Lookup' },
    { link: 'https://www.atom.com/insights/', title: 'Domain Insights' },
    { link: 'https://www.atom.com/radar/', title: 'AtomRadar (Domain Research)'},
  ];

  const sellersItems = [
    { link: 'https://www.atom.com/sell-domain-names', title: 'Become a Seller'},
    { link: 'https://helpdesk.atom.com/en/articles/997701-domain-marketplace-terms-conditions-sellers', title: 'Domain Selling Info'},
    { link: 'https://www.atom.com/ultra-premium-marketplace',title: 'Ultra Premium Seller Info'},
    { link: 'https://www.atom.com/sapphire', title: 'Sapphire Marketplace' },
    { link: 'https://www.atom.com/cctld', title: 'ccTLD Marketplace' },
    { link: 'https://www.atom.com/pay', title: 'AtomPay' },
    { link: 'https://www.atom.com/auctions', title: 'Domain Auctions' },
    { link: 'https://www.atom.com/ssologin.php?sso=bm9uY2U9MWViYmEzNzE3ZDEyZGEyY2I2MGYxZGIyOWRmNjhlOTImcmV0dXJuX3Nzb191cmw9aHR0cHMlM0ElMkYlMkZkaXNjdXNzaW9uLmF0b20uY29tJTJGc2Vzc2lvbiUyRnNzb19sb2dpbg%3D%3D&sig=0f6ee23df44f36fcd40056f60daf0f39d3751fdfbc3bedff66a46c60e125792d', title: 'Discussion Forum'},
  ];

  const namingItems = [
    { link: 'https://www.atom.com/branding-marketing-naming-contests', title: 'Naming Contest'},
    { link: 'https://www.atom.com/brand-identity-design',title: 'Brand Identity Design'},
    { link: 'https://www.atom.com/brand-naming-agency',title: 'Brand Naming Agency'},
    { link: 'https://www.atom.com/business-name-generator',title: 'Business Name Generator'},
    { link: 'https://www.atom.com/research', title: 'Audience Research' },
    { link: 'https://www.atom.com/startups', title: 'Startup Toolkit' },
    { link: 'https://www.atom.com/build-a-brand', title: 'Build a Brand' },
    { link: 'https://www.atom.com/logo-maker', title: 'AI Logo Generator' },
    { link: 'https://chatgpt.com/g/g-68f90fbbd81881919f55f2f4cd22aaff-ai-slogan-and-tagline-generator', title: 'Slogan and Tagline Generator'},
  ];

  const brandProtectionItems = [
    {link: 'https://trademark.io/trademark-research',title: 'Premium Trademark Reports'},
    {link: 'https://trademark.io/brand-monitoring',title: 'Brand Monitoring'},
    {link: 'https://trademark.io/free-trademark-search?query=&country=&statuses=Registered,Pending&classifications=&page=undefined&query_term_on_load=&spelling_variations=yes',title: 'Free Trademark Checker'},
  ];

  const creativesItems = [
    {link: 'https://www.atom.com/join-as-creative',title: 'Become a Creative'},
    {link: 'https://helpdesk.atom.com/en/collections/118397-creatives',title: 'Creative FAQs'},
    {link: 'https://www.atom.com/branding-marketing-naming-contests',title: 'Active Contests'},
    {link: 'https://www.atom.com/winners', title: 'Recent Winners' },
    {link: 'https://www.atom.com/ssologin.php?sso=bm9uY2U9MTcxYmM1MTc1ZTMyMDYxZjNjMmQ2YmJhNzVjMDM3MzYmcmV0dXJuX3Nzb191cmw9aHR0cHMlM0ElMkYlMkZkaXNjdXNzaW9uLmF0b20uY29tJTJGc2Vzc2lvbiUyRnNzb19sb2dpbg%3D%3D&sig=00abdd57ecbfe4003faed9361bd59bbc3497ca83882ca93ed415aff82c855e1f', title: 'Discussion Forum'},
  ];

  const atomItems = [
    { link: 'https://www.atom.com/AboutUs', title: 'About' },
    { link: 'https://www.atom.com/ContactUs', title: 'Contact' },
    { link: 'https://www.atom.com/blog/category/case-study/',title: 'Case Studies'},
    { link: 'https://www.trustpilot.com/review/atom.com',title: 'Testimonials'},
    { ink: 'https://www.atom.com/blog/', title: 'Blog' },
    { link: 'https://careers.atom.com/atom-com', title: 'Careers' },
  ];

  const supportItems = [
    { link: '', title: 'Customer Support' },
    { link: 'https://helpdesk.atom.com/en/', title: 'Help & FAQs' },
    { link: 'https://helpdesk.atom.com/en/articles/12694581-how-to-report-domain-abuse', title: 'Report Abuse'},
  ];

  const partnerItems = [
    { link: 'https://www.atom.com/connect',title: 'AtomConnect Partnership Program'},
    { link: 'https://www.atom.com/connect/distribution-network', title: 'Distribution Network API'},
    { link: 'https://www.atom.com/connect/affiliate', title: 'Affiliate Program'},
    { link: 'https://www.atom.com/atom-mcp-server', title: 'MCP Server' },
    { link: 'https://www.atom.com/connect/marketplace-builder', title: 'White Label Marketplace'},
  ];

  const legalItems = [
    { link: 'https://www.atom.com/legal/terms', title: 'Terms of Service' },
    { link: 'https://www.atom.com/legal/privacy', title: 'Privacy Policy' },
    { link: 'https://www.atom.com/cookie-policy', title: 'Cookie Policy' },
    { link: 'https://www.atom.com/legal', title: 'Terms & Agreements' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FeatureList title="Domain Services" items={servicesItems} />
        <div>
          <FeatureList title="Domain Tools" items={toolsItems} />
          <FeatureList title="Domain Sellers" items={sellersItems} />
        </div>
        <div>
          <FeatureList title="Naming & Branding" items={namingItems} />
          <FeatureList title="Brand Protection" items={brandProtectionItems} />
          <FeatureList title="Creatives" items={creativesItems} />
        </div>
        <div>
          <FeatureList title="Atom" items={atomItems} />
          <FeatureList title="Support" items={supportItems} />
          <FeatureList title="Partner with Us" items={partnerItems} />
          <FeatureList title="Legal" items={legalItems} />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksFooterTop;
