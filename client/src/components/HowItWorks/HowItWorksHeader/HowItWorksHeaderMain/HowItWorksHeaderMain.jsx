import React from 'react';
import HowItWorksHeaderTop from '../HowItWorksHeaderTop/HowItWorksHeaderTop';
import HowItWOrksHeaderButtom from '../HowItWorksHeaderButtom/HowItWorksHeaderButtom/HowItWorksHeaderButtom';

class HowItWorksHeaderMain extends React.Component {
  render() {
    return (
      <div>
        <div>
          <HowItWorksHeaderTop />
        </div>

        <div>
          <HowItWOrksHeaderButtom />
        </div>
      </div>
    );
  }
}

export default HowItWorksHeaderMain;
