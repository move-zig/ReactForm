import * as React from 'react';

export class PaymentPlan extends React.Component<{}, { paymentPlan: 'full' | 'part' | 'accelerated' }> {
  public constructor(props: any) {
    super(props);
    this.state = {
      paymentPlan: 'full',
    };
  }

  public handleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState<any>({ paymentPlan: target.value });
  }

  public render() {
    return (
      <div>
        <h2>Payment Plan</h2>
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
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='paymentPlan'
              value='accelerated'
              id='payment-plan-accelerated'
              checked={this.state.paymentPlan === 'accelerated'}
              onChange={this.handleChange}
            />
            <label className='form-name-label' htmlFor='payment-plan-accelerated'>Accelerated Plan</label>
          </div>
        </div>
      </div>
    );
  }
}
