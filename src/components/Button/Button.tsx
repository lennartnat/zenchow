import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (_: any) => void;
}

const Button = ({ children, ...rest }: ButtonProps) => (
  <button className={`button ${rest.disabled && 'button-disabled'}`} {...rest}>
    {children}
  </button>
);

export default Button;
