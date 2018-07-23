import * as React from 'react';

export interface LineItem {
  description: string;
  cost: string;
  discount: boolean;
  primary: boolean;
}

export interface Props {
  price: any;
}

export class Invoice extends React.Component<Props> {

  public render() {

    const invoiceItems: LineItem[] = [];
    if (this.props.price !== null && typeof this.props.price.courses !== 'undefined') {
      for (const courseCode in this.props.price.courses) {
        if (this.props.price.courses.hasOwnProperty(courseCode)) {
          const course = this.props.price.courses[courseCode];
          invoiceItems.push({
            description: course.name,
            cost: this.props.price.currency.symbol + course.baseCost,
            discount: false,
            primary: course.primary,
          });
          if (course.secondaryDiscountAmount) {
            invoiceItems.push({
              description: (course.secondaryDiscount * 100).toFixed(0) + '% discount',
              cost: '-' + this.props.price.currency.symbol + course.secondaryDiscountAmount,
              discount: true,
              primary: false,
            });
          }
        }
      }
    }

    return (
      <table
        style={
          invoiceItems.length ?
            { maxWidth: '360px', display: 'table' } :
            { display: 'none' }
        }
        className='mx-auto w-md-100 mr-lg-0'
      >
        <thead>
          <tr>
            <th scope='col' className='h3 pb-1' style={{ paddingRight: '24px' }}>Selected Courses</th>
            <th scope='col' className='h3 pb-1 text-right'>Cost</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.filter((el) => el.primary).map(this.renderRow)}
          {invoiceItems.filter((el) => !el.primary).map(this.renderRow)}
        </tbody>
      </table>
    );
  }

  private renderRow = (el: LineItem, index: number) => (
    <tr key={index} className={el.discount ? ' text-primary' : ''}>
      <td
        className={'pt-1' + (el.discount ? ' pl-3' : '')}
        style={{ paddingRight: '24px' }}
      >
        {el.description}
      </td>
      <td className='pt-1 text-right'>{el.cost}</td>
    </tr>
  )
}
