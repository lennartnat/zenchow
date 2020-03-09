import React from 'react';
import './ReviewItem.css';
import { FormattedMessage } from 'react-intl';

interface ReviewItemProps {
  children: React.ReactNode;
  label: string;
}

const ReviewItem = ({ label, children }: ReviewItemProps) => (
  <div className={'review-item'}>
    <span className={'review-label'}>
      <FormattedMessage id={label} />
    </span>
    <span className={'review-value'}>{children}</span>
  </div>
);

export default ReviewItem;
