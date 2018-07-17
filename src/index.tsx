import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CourseSelection } from './components/CourseSelection';
import { Hello } from './components/Hello';
import { PaymentPlan } from './components/PaymentPlan';
import { ShippingAddress } from './components/ShippingAddress';

ReactDOM.render(
  (
    <div className='container'>
    <Hello compiler='TypeScript' framework='React' foo='overwritten!' />
    <form>
      <CourseSelection />
      <PaymentPlan />
      <ShippingAddress />
    </form>
    </div>
  ),
  document.getElementById('root'),
);
