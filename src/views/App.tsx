import React, { useContext } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import Meal from './Meal/Meal';
import Restaurant from './Restaurant/Restaurant';
import Dish from './Dish/Dish';
import Review from './Review/Review';
import Crumbs from './Crumbs/Crumbs';

import { StepContext, OrderStep } from 'context/StepContext';
import { OrderProvider } from 'context/OrderContext';

import './App.css';
import { ConfigContext } from 'context/ConfigContext';

interface MsgType {
  [index: string]: any;
}

const msgs: MsgType = {
  en: {
    'NAV.TITLE': 'Zenchow',
    'MEAL.MEALSELECT': "What's this order for?",
    'MEAL.PAXINPUT': 'For how many people?',
    'REVIEW.TITLE': 'Order Review',
    'REVIEW.ADDMORE': 'Add more food!',
    'REVIEW.FOODEXCEEED': 'Please do not exceed 10 food servings!',
    'WORD.MEAL': 'Meal',
    'WORD.PAX': 'Pax',
    'WORD.RESTAURANT': 'Restaurant',
    'WORD.FOOD': 'Food'
  },
  ja: {
    'NAV.TITLE': 'ゼンチャウ',
    'MEAL.MEALSELECT': '何のため注文しますか？',
    'MEAL.PAXINPUT': '何人が食べますか？',
    'REVIEW.TITLE': '注文確認書',
    'REVIEW.ADDMORE': '食べ物をもっと追加しよう！',
    'REVIEW.FOODEXCEEED': '10食を超えないようにしてください！',
    'WORD.MEAL': '食事',
    'WORD.PAX': '人数',
    'WORD.RESTAURANT': 'レストラン',
    'WORD.FOOD': '食物'
  }
};

const App: React.FC = () => {
  const { activeStep } = useContext(StepContext);
  const { language, setLanguage } = useContext(ConfigContext);

  return (
    <IntlProvider locale={language} messages={msgs[language]}>
      <div className='App'>
        <nav className={'navbar'}>
          <button onClick={() => setLanguage('en')}>EN</button> |{' '}
          <button onClick={() => setLanguage('ja')}>JA</button>
          <h1>
            <FormattedMessage id={'NAV.TITLE'} />
          </h1>
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
    </IntlProvider>
  );
};

export default App;
