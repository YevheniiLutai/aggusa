// components/Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer container mx-auto ">
      <p className="footer_text">
        © 2025 AGG USA. All rights reserved.
      </p>
      <div className="footer_icon">
        <a href="https://www.instagram.com/autumn_cup_agg_usa/" target="_blank" rel="noopener noreferrer">
          <img src="/instagram_white.png" alt="Instagram" />
        </a>
        <a href="https://youtube.com/@aggusa_media?si=BDbKOe9zOh5vssxf" target="_blank" rel="noopener noreferrer">
          <img src="/youtube_white.png" alt="YouTube" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
