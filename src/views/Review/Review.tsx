import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

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

    const msg = `Order submitted!
    Meal: ${meal}
    Pax: ${pax}
    Restaurant: ${restaurant}
    Dishes: ${dishes.map(dish => `${dish.name} - ${dish.count}`)}
    `;

    console.log(msg);
    alert(msg);
  };

  return (
    <Card>
      <h3>
        <FormattedMessage id={'REVIEW.TITLE'} />
      </h3>

      <ReviewItem label={'WORD.MEAL'}>{meal[0].toUpperCase() + meal.slice(1)}</ReviewItem>
      <ReviewItem label={'WORD.PAX'}>{pax}</ReviewItem>
      <ReviewItem label={'WORD.RESTAURANT'}>{restaurant}</ReviewItem>
      <ReviewItem label={'WORD.FOOD'}>
        {dishes.map((dish, i) => (
          <span key={`${dish.name}_${i}`}>
            {dish.count} pc(s) {dish.name}
            <br />
          </span>
        ))}
      </ReviewItem>

      <br />

      <Button
        disabled={!meal || !pax || !restaurant || totalDishCount < pax || totalDishCount > 10}
        onClick={handleSubmit}
      >
        {'✔'}
      </Button>
      {currentStep === OrderStep.Dish && totalDishCount < pax && (
        <i>
          <FormattedMessage id={'REVIEW.ADDMORE'} />
        </i>
      )}
      {totalDishCount > 10 && (
        <i>
          <FormattedMessage id={'REVIEW.FOODEXCEEED'} />
        </i>
      )}
    </Card>
  );
};

export default Review;
