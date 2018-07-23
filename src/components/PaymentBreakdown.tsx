import React from 'react';

export interface Props {
  paymentPlan: string;
  price: any;
}

export class PaymentBreakdown extends React.Component<Props> {

  public render() {
    if (this.props.price === null || this.props.price.numCourses === 0) {
      return null;
    }
    return (
      <div className='text-left text-md-right'>
        <h3>{this.title()}</h3>
        <table className='float-md-right w-100 w-md-auto'>
          {this.renderBody()}
        </table>
      </div>
    );
  }

  private title(): string {
    if (this.props.paymentPlan === 'full') {
      return 'Pay in Full';
    } else if (this.props.paymentPlan === 'part') {
      return 'Installment Plan';
    } else if (this.props.paymentPlan === 'accelerated') {
      return 'Accelerated Installment Plan';
    } else {
      throw new Error('invalid payment plan');
    }
  }

  private renderBody(): JSX.Element {
    if (this.props.paymentPlan === 'full') {
      return this.renderBodyFull();
    } else if (this.props.paymentPlan === 'part') {
      return this.renderBodyPart();
    } else if (this.props.paymentPlan === 'accelerated') {
      return this.renderBodyAccelerated();
    } else {
      throw new Error('invalid payment plan');
    }
  }

  private renderBodyFull() {
    return (
      <tbody>
        <tr>
          <td className='text-left pt-0 pb-2'>Course Cost:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.currency.symbol}{this.props.price.cost - this.props.price.secondaryDiscount}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'>Full-Payment Discount:</td>
          <td className='text-right pt-0 pb-2 pl-4'>&minus;{this.props.price.currency.symbol}{this.props.price.discount.full}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'><strong>Total:</strong></td>
          <td className='text-right pt-0 pb-2 pl-4'>
            <strong>
              {this.props.price.currency.symbol}{this.props.price.cost - this.props.price.secondaryDiscount - this.props.price.discount.full}
            </strong>
          </td>
        </tr>
      </tbody>
    );
  }

  private renderBodyPart() {
    return (
      <tbody>
        <tr>
          <td className='text-left pt-0 pb-2'>Initial Desposit:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.currency.symbol}{this.props.price.deposit.part}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'>Number of Installments:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.installments.part}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'>Monthly Installment:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.currency.symbol}{this.props.price.installmentSize.part}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'><strong>Total:</strong></td>
          <td className='text-right pt-0 pb-2 pl-4'>
            <strong>
              {this.props.price.currency.symbol}{this.props.price.cost - this.props.price.secondaryDiscount - this.props.price.discount.part}
            </strong>
          </td>
        </tr>
      </tbody>
    );
  }

  private renderBodyAccelerated() {
    return (
      <tbody>
        <tr>
          <td className='text-left pt-0 pb-2'>Initial Desposit:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.currency.symbol}{this.props.price.deposit.accelerated}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'>Number of Installments:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.installments.accelerated}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'>Monthly Installment:</td>
          <td className='text-right pt-0 pb-2 pl-4'>{this.props.price.currency.symbol}{this.props.price.installmentSize.accelerated}</td>
        </tr>
        <tr>
          <td className='text-left pt-0 pb-2'><strong>Total:</strong></td>
          <td className='text-right pt-0 pb-2 pl-4'>
            <strong>
              {this.props.price.currency.symbol}{this.props.price.cost - this.props.price.secondaryDiscount - this.props.price.discount.accelerated}
            </strong>
          </td>
        </tr>
      </tbody>
    );
  }

}
