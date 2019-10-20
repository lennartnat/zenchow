import React, { useContext } from 'react';
import Crumb from 'components/Crumb/Crumb';

import { StepContext } from 'context/StepContext';

import './Crumbs.css';

const CRUMBS = ['1', '2', '3'];

const Crumbs: React.FC = () => {
  const { activeStep, currentStep, setActiveStep } = useContext(StepContext);

  return (
    <div className={'crumbs'}>
      {CRUMBS.map((crumb, i) => (
        <Crumb
          key={crumb}
          label={crumb}
          onClick={() => setActiveStep(i)}
          isActive={i === activeStep}
          isDisabled={i > currentStep}
        />
      ))}
    </div>
  );
};

export default Crumbs;
