import './style.scss';
import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className={'footer__links'}>
        <div>
          <Link to={'/fa'}>FAQ</Link>
          <Link to={'/contact'}>Contact Us</Link>
          <Link to={'/terms'}>Terms Of Use</Link>
          <Link to={'/privacy'}>Privacy & Security</Link>
        </div>

        {/* TODO: Replace with Language component to switch language */}
        <div className={'language'}>
          English
        </div>
      </div>

      <div className={'footer__social'}>
        <div>&copy; Jakaa, Inc.</div>

        <div>
          <a href="#">Face</a>
          <a href="#">Twit</a>
          <a href="#">Insta</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
