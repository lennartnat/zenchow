import React, { useContext } from 'react';

import Card from 'components/Card/Card';
import Numbox from 'components/Numbox/Numbox';

import { OrderContext } from 'context/OrderContext';
import { StepContext } from 'context/StepContext';
import Button from 'components/Button/Button';

const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj));

const Dish = () => {
  const { stepPrev } = useContext(StepContext);
  const { restaurant, dishes, setDishes, availableDishes } = useContext(OrderContext);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    e.preventDefault();

    const dishesCopy = deepCopy(dishes);
    dishesCopy[index].name = e.target.value;

    setDishes(dishesCopy);
  };

  const handlePaxInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    const dishesCopy = deepCopy(dishes);
    dishesCopy[index].count = parseInt(e.currentTarget.value);

    setDishes(dishesCopy);
  };

  const totalDishCount = dishes.reduce((total, { count }, j) => total + count, 0);
  const selectedDishes = dishes.map(dish => dish.name);

  const addDish = (e: React.MouseEvent) => {
    e.preventDefault();

    const dish = { name: '', count: 1 };

    for (const ad of availableDishes) {
      if (!selectedDishes.includes(ad)) {
        dish.name = ad;
        break;
      }
    }

    setDishes([...dishes, dish]);
  };

  return (
    <Card>
      <h3>Pick some food from {restaurant}!</h3>

      {dishes.map((dish, i) => (
        <div key={dish.name}>
          <select value={dish.name} onChange={e => handleSelect(e, i)}>
            {availableDishes.map(
              opt =>
                (opt === dish.name || !selectedDishes.includes(opt)) && (
                  <option key={opt}>{opt}</option>
                )
            )}
          </select>

          <Numbox
            step={1}
            min={1}
            max={10 - totalDishCount + dish.count}
            value={dish.count}
            onChange={e => handlePaxInput(e, i)}
          />
        </div>
      ))}

      <Button
        disabled={dishes.length >= availableDishes.length || totalDishCount >= 10}
        onClick={addDish}
      >
        {'+'}
      </Button>
      <br />

      <Button onClick={stepPrev}>{'<'}</Button>
    </Card>
  );
};

export default Dish;
