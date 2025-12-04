import React from 'react';
import { Link } from 'react-router-dom';

class DomainForSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <ul>
          {/* 1 */}
          <li>
            <Link to="/domians"> Domains for Sale</Link>
            {/* 1.2 */}
            <ul>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/cdm_icon.svg"
                    alt="icon"
                  />
                  <span>Premium Domain Marketplace</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>
                    Explore 300,000+ expert-curated, brandable domains to
                    elevate your business.
                  </p>
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/upm_icon.svg"
                    alt="icon"
                  />
                  <span>Ultra Premium Marketplace</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>
                    Discover the world’s most coveted and powerful domains for
                    top-tier brands.
                  </p>
                </a>
              </li>

              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/sapphire_icon.svg"
                    alt="icon"
                  />
                  <span>Sapphire Marketplace</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>
                    Find one-word domains with modern extensions like .ai, .io,
                    and .xyz.
                  </p>
                </a>
              </li>
            </ul>

            {/*  1.3*/}
            <ul>
              <li>
                <p>Top Domain Collections</p>
              </li>
              <li>
                <a href="/">.ai Domains</a>
                <span>Popular</span>
              </li>
              <li>
                <a href="/">Short Domains</a>
              </li>
              <li>
                <a href="/">One-Word Domains</a>
              </li>
              <li>
                <a href="/">3 Letter Domains</a>
              </li>
              <li>
                <a href="/">4 Letter Domains</a>
              </li>
              <li>
                <a href="/">5 Letter Domains</a>
              </li>
              <li>
                <a href="/">Country-Specific Domains</a>
              </li>
              <li>
                <p>Domain Services</p>
              </li>
              <li>
                <a href="/">Domain Transactions</a>
                <span>Popular</span>
              </li>
              <li>
                <a href="/">Domain Broker</a>
              </li>
              <li>
                <a href="/">Domain Auction</a>
              </li>
            </ul>

            {/*  1.4*/}
            <ul>
              <li>
                <a href="/">
                  <img
                    src="https://www.atom.com/public/images/common/get_started.png"
                    alt="icon"
                  />
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="https://img.atom.com/public/images/common/search.svg"
                    alt="icon"
                  />
                  <span>Get Started</span>
                  <img
                    src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
                    alt="arrow"
                  />
                  <p>
                    Find your perfect domain today and buy instantly in the
                    Atom.com marketplace.
                  </p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </>
    );
  }
}

export default DomainForSale;
