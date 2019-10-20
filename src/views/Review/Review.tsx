import React, { useContext } from 'react';

import Card from 'components/Card/Card';
import Button from 'components/Button/Button';
import ReviewItem from 'components/ReviewItem/ReviewItem';

import { OrderContext } from 'context/OrderContext';
import { StepContext, OrderStep } from 'context/StepContext';

const Review = () => {
  const { meal, pax, restaurant, dishes } = useContext(OrderContext);
  const { currentStep } = useContext(StepContext);

  const totalDishCount = dishes.reduce((total, { count }, j) => total + count, 0);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log(`Order submitted!
    Meal: ${meal}
    Pax: ${pax}
    Restaurant: ${restaurant}
    Dishes: ${dishes.map(dish => `${dish.name} - ${dish.count}`)}
    `);
  };

  return (
    <Card>
      <h3>Order Review</h3>

      <ReviewItem label={'Meal'}>{meal[0].toUpperCase() + meal.slice(1)}</ReviewItem>
      <ReviewItem label={'Pax'}>{pax}</ReviewItem>
      <ReviewItem label={'Restaurant'}>{restaurant}</ReviewItem>
      <ReviewItem label={'Food'}>
        {dishes.map((dish, i) => (
          <span key={`${dish.name}_${i}`}>
            {dish.count} pc(s) {dish.name}
            <br />
          </span>
        ))}
      </ReviewItem>

      <br />

      <Button
        disabled={!meal || !pax || !restaurant || totalDishCount < pax}
        onClick={handleSubmit}
      >
        {'✔'}
      </Button>
      {currentStep === OrderStep.Dish && totalDishCount < pax && <i>{'Add more food!'}</i>}
    </Card>
  );
};

export default Review;
