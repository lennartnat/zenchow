import React from 'react';
import './ReviewItem.css';

interface ReviewItemProps {
  children: React.ReactNode;
  label: string;
}

const ReviewItem = ({ label, children }: ReviewItemProps) => (
  <div className={'review-item'}>
    <span className={'review-label'}>{label}</span>
    <span className={'review-value'}>{children}</span>
  </div>
);

export default ReviewItem;
