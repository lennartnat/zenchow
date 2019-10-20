import React from 'react';
import './Crumb.css';

interface CrumbProps {
  label: string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: any;
}

const Crumb = ({ label, isActive, isDisabled, ...rest }: CrumbProps) => {
  return (
    <button
      className={`crumb ${isActive && 'crumb-current'} ${isDisabled && 'crumb-disabled'}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Crumb;
