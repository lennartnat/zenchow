import React from 'react';
import './Card.css';

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className={'card'}>{children}</div>
);

export default Card;
