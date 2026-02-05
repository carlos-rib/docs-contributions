import React from 'react';
import './LinkCard.css';
const LinkCard = ({ link, icon, title, subtitle }) => {
  return (
    <a href={link} className='link-card'>
      <div className='link-card-icon'>{icon}</div>
      <div className='link-card-content'>
        <h3 className='link-card-title'>{title}</h3>
        <p className='link-card-subtitle'>{subtitle}</p>
      </div>
    </a>
  );
};

export default LinkCard;
