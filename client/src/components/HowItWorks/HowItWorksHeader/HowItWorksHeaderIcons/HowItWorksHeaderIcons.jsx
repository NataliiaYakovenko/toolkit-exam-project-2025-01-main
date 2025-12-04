import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdLocalPhone } from 'react-icons/md';
import { BsChatLeftDotsFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import CONSTANTS from '../../../../constants';


class HowItWorksHeaderIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* icons */}
        <div>
          <ul>
            {/* 1 */}
            <li>
              <a href="/">
                <FaSearch />
              </a>
            </li>
            {/* 2 */}
            <li>
              <a href="/">
                <BsPersonCircle />
                <ul>
                  {/* 2.1 */}
                  <li>
                    <FaUserCircle />
                    <span>Login</span>
                  </li>
                  {/* 2.2 */}
                  <li>
                    <FaUserCircle />
                    <span>Signup</span>
                  </li>
                </ul>
              </a>
            </li>
            {/* 3 */}
            <li>
              <a href="/">
                <MdLocalPhone />
                <ul>
                  {/* 3.1 */}
                  <li>
                    <a href="/">
                      <MdLocalPhone />
                      <span>(877) 355-3585</span>
                    </a>
                  </li>
                  {/* 3.2 */}
                  <li>
                    <a href="/">
                      <BsChatLeftDotsFill />
                      <span>Chat</span>
                    </a>
                  </li>
                  {/* 3.3 */}
                  <li>
                    <a href="/">
                      <MdEmail />
                      <span>Email</span>
                    </a>
                  </li>
                  {/* 3.4 */}
                  <li>
                    <a href="/">
                      <img
                        src={CONSTANTS.HOW_IT_WORKS_HEADER_TARGET}
                        alt="Help Desk"
                      />
                      <span>Help Desk</span>
                    </a>
                  </li>
                  <a href="/">
                    <FaHeart />
                  </a>
                </ul>
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default HowItWorksHeaderIcons;
