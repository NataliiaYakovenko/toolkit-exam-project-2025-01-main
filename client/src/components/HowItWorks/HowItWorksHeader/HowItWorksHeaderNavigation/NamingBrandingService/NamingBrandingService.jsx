import React from 'react';
import { Link } from 'react-router-dom';

class NamingBrandingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <ul>
          {/* 3 */}
          <li>
            <Link to="/services"> Naming & Branding Services</Link>
            {/* 3.1 */}
            <ul>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/launch.svg"
                    alt="icon"
                  />
                  <span>Launch a Naming Contest</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Get 1000s of unique names from real creatives. </p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/hire.svg"
                    alt="icon"
                  />
                  <span>Hire Our Naming Agency</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Get agency-level naming without agency fees.</p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/ai.svg"
                    alt="icon"
                  />
                  <span>AI Logo Generator</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Create instant, professional logos in minutes.</p>
                </a>
              </li>
            </ul>
            {/* 3.2 */}
            <ul>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/audience_research.svg"
                    alt="icon"
                  />
                  <span>Audience Research</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Test almost anything with your target customers.</p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/trademark_filling.svg"
                    alt="icon"
                  />
                  <span>Trademark Services</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Search, file, and protect your trademarks.</p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/brand.svg"
                    alt="icon"
                  />
                  <span>Brand monitoring</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Track and protect your brand online.</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </>
    );
  }
}

export default NamingBrandingService;
