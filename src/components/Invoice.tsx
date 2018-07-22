import * as React from 'react';

export interface LineItem {
  description: string;
  cost: string;
  discount: boolean;
  primary: boolean;
}

export interface Props {
  lineItems: LineItem[];
}

export class Invoice extends React.Component<Props> {

  public render() {
      return (
      <table
        style={
          this.props.lineItems.length ?
          { maxWidth: '360px', display: 'table' } :
          { display: 'none' }
        }
        className='mx-auto w-md-100 mr-lg-0'
      >
        <thead>
          <tr>
            <th scope='col' className='h3 pb-1' style={{paddingRight: '24px'}}>Selected Courses</th>
            <th scope='col' className='h3 pb-1 text-right'>Cost</th>
          </tr>
        </thead>
        <tbody>
          {this.props.lineItems.filter((el) => el.primary).map(this.renderRow)}
          {this.props.lineItems.filter((el) => !el.primary).map(this.renderRow)}
        </tbody>
      </table>
    );
  }

  private renderRow = (el: LineItem, index: number) => (
    <tr key={index} className={el.discount ? ' text-primary' : ''}>
      <td
        className={'pt-1' + (el.discount ? ' pl-3' : '')}
        style={{paddingRight: '24px'}}
      >
        {el.description}
      </td>
      <td className='pt-1 text-right'>{el.cost}</td>
    </tr>
  )
}
