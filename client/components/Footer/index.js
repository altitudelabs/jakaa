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
        English
      </div>

      <div>
        <div>&copy; Jakaa, Inc.</div>

        <div>
          <ul className={'social-list'}>
            <li>
              <a href="#">Face</a>
            </li>

            <li>
              <a href="#">Twit</a>
            </li>

            <li>
              <a href="#">Insta</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
