import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import Card from 'components/Card/Card';
import RadioButton from 'components/RadioButton/RadioButton';
import Numbox from 'components/Numbox/Numbox';
import Button from 'components/Button/Button';

import { StepContext } from 'context/StepContext';
import { OrderContext, MEALS } from 'context/OrderContext';

import './Meal.css';

const Meal = () => {
  const { stepNext } = useContext(StepContext);
  const { meal, setMeal, pax, setPax } = useContext(OrderContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (meal && pax > 0 && pax <= 10) {
      stepNext();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={'form-meal'}>
        <h3>
          <FormattedMessage id={'MEAL.MEALSELECT'} />
        </h3>

        <div>
          {MEALS.map(m => (
            <RadioButton key={m} text={m} checked={meal === m} onChange={() => setMeal(m)} />
          ))}
        </div>

        <h3>
          <FormattedMessage id={'MEAL.PAXINPUT'} />
        </h3>

        <Numbox
          step={1}
          min={1}
          max={10}
          value={pax}
          onChange={({ currentTarget: { value } }) => setPax(parseInt(value))}
        />

        <br />

        <Button>{'>'}</Button>
      </form>
    </Card>
  );
};

export default Meal;
