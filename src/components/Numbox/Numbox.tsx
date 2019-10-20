import React from 'react';
import './Numbox.css';

interface NumboxProps {
  step: number;
  min: number;
  max: number;
  value: number;
  onChange: (_: any) => void;
}

const Numbox = (props: NumboxProps) => <input className={'numbox'} type={'number'} {...props} />;

export default Numbox;
