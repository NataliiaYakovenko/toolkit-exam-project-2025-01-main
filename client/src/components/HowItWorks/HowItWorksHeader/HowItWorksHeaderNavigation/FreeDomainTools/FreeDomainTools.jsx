import React from 'react';
import { Link } from 'react-router-dom';

class FreeDomainTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <ul>
          {/* 2 */}
          <li>
            <Link to="/tools"> Free Domain Tools</Link>
            <ul>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/bsg.svg"
                    alt="icon"
                  />
                  <span> AI Domain Name Generator</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Get hundreds of smart domain ideas in seconds.</p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/ai_score.svg"
                    alt="icon"
                  />
                  <span>AI Domain Appraisal Tool</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Instantly check your domain’s market</p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/whois.svg"
                    alt="icon"
                  />
                  <span>WHOIS Domain Lookup</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Find domain ownership and registration details.</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </>
    );
  }
}

export default FreeDomainTools;
