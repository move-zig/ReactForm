import * as React from 'react';

export class PaymentPlan extends React.Component<{}, { paymentPlan: 'full' | 'part' | 'accelerated' }> {
  public constructor(props: any) {
    super(props);
    this.state = {
      paymentPlan: 'full',
    };
  }

  public handleChange = (event: any) => {
    //
  }

  public render() {
    return (
      <div className='form-group'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentPlan'
            value='full'
            id='payment-plan-full'
            checked={this.state.paymentPlan === 'full'}
            onChange={this.handleChange}
          />
          <label className='form-name-label' htmlFor='payment-plan-full'>Pay in Full</label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentPlan'
            value='part'
            id='payment-plan-part'
            checked={this.state.paymentPlan === 'part'}
            onChange={this.handleChange}
          />
          <label className='form-name-label' htmlFor='payment-plan-part'>Installment Plan</label>
        </div>
      </div>
    );
  }
}
