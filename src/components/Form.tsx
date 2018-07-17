import * as React from 'react';

import { CourseSelection } from './CourseSelection';
import { PaymentPlan } from './PaymentPlan';
import { ShippingAddress } from './ShippingAddress';

export class Form extends React.Component<{}, {}> {

  public handleSubmit = () => {
    //
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CourseSelection />
        <PaymentPlan />
        <ShippingAddress />
        <button className='btn' type='submit'>Enroll Now</button>
      </form>
    );
  }
}
