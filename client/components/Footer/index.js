import './style.scss';
import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer>
      <div>
        <ul>
          <li>
            <Link to={'/fa'}>FA</Link>
          </li>

          <li>
            <Link to={'/contact'}>Contact</Link>
          </li>

          <li>
            <Link to={'/terms'}>Terms</Link>
          </li>

          <li>
            <Link to={'/privacy'}>Privacy</Link>
          </li>

        </ul>
      </div>

      <div>
        section 2
      </div>

      <div>
        section 3
      </div>
    </footer>
  );
}

export default Footer;
