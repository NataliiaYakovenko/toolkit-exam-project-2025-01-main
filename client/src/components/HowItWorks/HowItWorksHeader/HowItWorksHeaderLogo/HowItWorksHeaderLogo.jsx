import React from 'react';

class HowItWorksHeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>
          <a href="/">
            <img
              src="https://img.atom.com/public/images/atom-logo.png"
              alt="logo"
            />
          </a>
        </div>
      </>
    );
  }
}

export default HowItWorksHeaderLogo;
