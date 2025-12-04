import React from 'react';
import { Link } from 'react-router-dom';

class WyAtom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <ul>
          {/* 4 */}
          <li>
            <Link to="wyAtom">Wy-Atom</Link>
            {/* 4.1 */}
            <ul>
              <li>
                <p>Atom.com</p>
              </li>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/">Testimonials</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
            </ul>
            {/* 4.2 */}
            <ul>
              <li>
                <p>Partner With Us</p>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/distribution.svg"
                    alt="icon"
                  />
                  <span>Distribution Network API</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Share our premium domains with your clients.</p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/mcp.svg"
                    alt="icon"
                  />
                  <span>MCP Server</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>
                    Access premium domains, availability checks, and trademark
                    data.
                  </p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/instant.svg"
                    alt="icon"
                  />
                  <span>White Label Marketplace</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>
                    Offer a turnkey branded domain marketplace on your site.
                  </p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/atomconntect.svg"
                    alt="icon"
                  />
                  <span>Atom Connect </span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>Learn more about our full partner ecosystem.</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </>
    );
  }
}

export default WyAtom;
