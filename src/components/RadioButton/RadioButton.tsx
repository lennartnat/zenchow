import React from 'react';
import './RadioButton.css';

interface RadioProps {
  text: string;
  checked: boolean;
  onChange: () => void;
}

const RadioButton = ({ text, ...props }: RadioProps) => (
  <label className={'radio'}>
    <input value={text} type={'radio'} name={'meal'} {...props} /> {text}
  </label>
);

export default RadioButton;
