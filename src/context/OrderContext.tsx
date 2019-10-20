/* eslint react-hooks/exhaustive-deps: 0 */

import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { StepContext, OrderStep } from './StepContext';

interface Dish {
  name: string;
  count: number;
}

interface Data {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

type OrderContextType = {
  meal: string;
  pax: number;
  restaurant: string;
  dishes: Dish[];
  availableDishes: string[];
  availableRestaurants: string[];
  setMeal: (_: string) => void;
  setPax: (_: number) => void;
  setRestaurant: (_: string) => void;
  setDishes: (_: Dish[]) => void;
};

const PATH_DATA = 'data/dishes.json';
export const MEALS = ['breakfast', 'lunch', 'dinner'];

const OrderContext = createContext<OrderContextType>({
  meal: '',
  pax: 1,
  restaurant: '',
  dishes: [],
  availableDishes: [''],
  availableRestaurants: [''],
  setMeal: (_: string) => {},
  setPax: (_: number) => {},
  setRestaurant: (_: string) => {},
  setDishes: (_: Dish[]) => {}
});

const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentStep, activeStep, setCurrentStep } = useContext(StepContext);

  const [data, setData] = useState<Data[]>([]);
  const [meal, setMeal] = useState(MEALS[0]);
  const [pax, setPax] = useState(1);
  const [restaurant, setRestaurant] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Get available dishes based on selected restaurant and meal
  const availableDishes = useMemo(
    () =>
      data.reduce<string[]>((acc, dish) => {
        if (dish.availableMeals.includes(meal) && restaurant === dish.restaurant) {
          !acc.includes(dish.name) && acc.push(dish.name);
        }
        return acc;
      }, []),
    [meal, restaurant, data]
  );

  // Get available restaurants based on selected meal
  const availableRestaurants = useMemo(
    () =>
      data.reduce<string[]>((acc, { availableMeals, restaurant }) => {
        if (availableMeals.includes(meal) && !acc.includes(restaurant)) {
          acc.push(restaurant);
        }
        return acc;
      }, []),
    [meal, data]
  );

  // Initial dishes data fetching
  useEffect(() => {
    fetch(PATH_DATA)
      .then(data => data.json())
      .then(data => {
        setData(data.dishes);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  // Effect trigger: Meal selection, current step progression
  useEffect(() => {
    // Set default restaurant
    if (currentStep === OrderStep.Restaurant && !restaurant) {
      setRestaurant(availableRestaurants[0]);
    }

    // If meal is set again, reset restaurant and step
    if (activeStep === OrderStep.Meal && currentStep > OrderStep.Meal) {
      setRestaurant('');
      setCurrentStep(OrderStep.Meal);
    }
  }, [availableRestaurants, currentStep]);

  // Effect trigger: Restaurant selection, current step progression
  useEffect(() => {
    // Set default dish
    if (currentStep === OrderStep.Dish && !dishes.length) {
      setDishes([{ name: availableDishes[0], count: 1 }]);
    }

    // If restaurant is set again, reset dishes and step
    if (activeStep < OrderStep.Dish && currentStep > OrderStep.Restaurant) {
      setDishes([]);
      setCurrentStep(OrderStep.Restaurant);
    }
  }, [availableDishes, currentStep]);

  return (
    <OrderContext.Provider
      value={{
        meal,
        pax,
        restaurant,
        dishes,
        availableDishes,
        availableRestaurants,
        setMeal,
        setPax,
        setRestaurant,
        setDishes
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
