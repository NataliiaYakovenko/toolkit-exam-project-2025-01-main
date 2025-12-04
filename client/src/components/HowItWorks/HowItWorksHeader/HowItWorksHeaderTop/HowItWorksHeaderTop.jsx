import React from 'react';
import { Link } from 'react-router-dom';

class HowItWorksHeaderTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* top row */}
        <div>
          <div>
            <h2>Black Friday Sale!</h2>
            <p>25% Off The Best Domains on The Web</p>
          </div>

          <div>
            <p>Hurry! Sale Ends In:</p>
          </div>

          <div>
            <div>
              <p>4</p>
              <p>DAYS</p>
            </div>

            <div>
              <p>17</p>
              <p>HOURS</p>
            </div>

            <div>
              <p>58</p>
              <p>MOUNTS</p>
            </div>
          </div>

          <div>
            <Link to="/shopNow">Shop Now</Link>
          </div>
        </div>
      </>
    );
  }
}

export default HowItWorksHeaderTop;
