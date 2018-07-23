import * as React from 'react';
import { RadioGroup } from '../HTMLElements/RadioGroup';

export interface Props {
  selectedOption: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<any>) => void;
}

export class PaymentPlan extends React.Component<Props> {

  public render() {
    return (
      <div>
        <RadioGroup
          setName='paymentPlans'
          label='Payment Options'
          options={[
            { value: 'full', name: 'Pay in Full' },
            { value: 'accelerated', name: <span>Accelerated <span className='d-sm-none d-lg-inline'>Installment</span> Plan</span> },
            { value: 'part', name: 'Installment Plan' },
          ]}
          selectedOption={this.props.selectedOption}
          valid={this.props.valid}
          changeFunc={this.props.changeFunc}
          wrapperClassName='mb-2'
          labelClassName='h3'
          fancy={true}
        />
      </div>
    );
  }

}
