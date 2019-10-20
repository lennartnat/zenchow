import React, { useContext } from 'react';

import Card from 'components/Card/Card';
import Button from 'components/Button/Button';

import { OrderContext } from 'context/OrderContext';
import { StepContext } from 'context/StepContext';

const Restaurant = () => {
  const { stepNext, stepPrev } = useContext(StepContext);
  const { meal, restaurant, setRestaurant, availableRestaurants } = useContext(OrderContext);

  return (
    <Card>
      <h3>Where to order {meal} from?</h3>

      <select value={restaurant} onChange={({ target: { value } }) => setRestaurant(value)}>
        {availableRestaurants.map(resto => (
          <option key={resto}>{resto}</option>
        ))}
      </select>

      <br />

      <div>
        <Button onClick={stepPrev}>{'<'}</Button>
        <Button onClick={stepNext}>{'>'}</Button>
      </div>
    </Card>
  );
};

export default Restaurant;
