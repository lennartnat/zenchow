import React, { useContext } from 'react';

import Meal from './Meal/Meal';
import Restaurant from './Restaurant/Restaurant';
import Dish from './Dish/Dish';
import Review from './Review/Review';
import Crumbs from './Crumbs/Crumbs';

import { StepContext, OrderStep } from 'context/StepContext';
import { OrderProvider } from 'context/OrderContext';

import './App.css';

const App: React.FC = () => {
  const { activeStep } = useContext(StepContext);

  return (
    <div className='App'>
      <nav className={'navbar'}>
        <h1>Zenchow</h1>
      </nav>

      <Crumbs />

      <div className='content'>
        <OrderProvider>
          {activeStep === OrderStep.Meal && <Meal />}
          {activeStep === OrderStep.Restaurant && <Restaurant />}
          {activeStep === OrderStep.Dish && <Dish />}
          <Review />
        </OrderProvider>
      </div>
    </div>
  );
};

export default App;
