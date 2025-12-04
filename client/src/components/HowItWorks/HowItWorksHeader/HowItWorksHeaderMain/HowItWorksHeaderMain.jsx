import React from 'react';
import HowItWorksHeaderTop from '../HowItWorksHeaderTop/HowItWorksHeaderTop';
import HowItWorksHeaderIcons from '../HowItWorksHeaderIcons/HowItWorksHeaderIcons';
import HowItWorksHeaderLogo from '../HowItWorksHeaderLogo/HowItWorksHeaderLogo';
import DomainForSale from '../HowItWorksHeaderNavigation/DomainForSale/DomainForSale';
import FreeDomainTools from '../HowItWorksHeaderNavigation/FreeDomainTools/FreeDomainTools';
import NamingBrandingService from '../HowItWorksHeaderNavigation/NamingBrandingService/NamingBrandingService';
import WyAtom from '../HowItWorksHeaderNavigation/WyAtom/WyAtom';

class HowItWorksHeaderMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* top row */}
        <div>
          <HowItWorksHeaderTop />
        </div>

        {/* buttom row */}
        <div>
          <div>
            <HowItWorksHeaderLogo />
          </div>

          {/*  NAV*/}
          <div>
            <nav>
              {/* 1 */}
              <DomainForSale />

              {/* 2 */}
              <FreeDomainTools />

              {/* 3 */}
              <NamingBrandingService />

              {/* 4 */}
              <WyAtom />
            </nav>
          </div>

          {/* icons */}
          <div>
            <HowItWorksHeaderIcons />
          </div>
        </div>
      </>
    );
  }
}

export default HowItWorksHeaderMain;
