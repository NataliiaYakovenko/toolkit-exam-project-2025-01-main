import React from 'react';
import HowItWorksHeaderTop from '../HowItWorksHeaderTop/HowItWorksHeaderTop';
import HowItWOrksHeaderBottom from '../HowItWorksHeaderBottom/HowItWorksHeaderBottom/HowItWorksHeaderBottom';

class HowItWorksHeaderMain extends React.Component {
  render() {
    return (
      <div>
        <div>
          <HowItWorksHeaderTop />
        </div>

        <div>
          <HowItWOrksHeaderBottom />
        </div>
      </div>
    );
  }
}

export default HowItWorksHeaderMain;
