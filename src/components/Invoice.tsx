import * as React from 'react';

export interface Props {
  lineItems: Array<{ description: string; cost: string; discount: boolean }>;
}

export class Invoice extends React.Component<Props> {
  public render() {
    const lines = this.props.lineItems.map((el, index) => (
      <tr key={index} className={el.discount ? ' text-primary' : ''}>
        <td className={'pt-1' + (el.discount ? ' pl-3' : '')}>{el.description}</td>
        <td className='pt-1 text-right'>{el.cost}</td>
      </tr>
    ));
    return (
      <table style={
        this.props.lineItems.length ?
        { maxWidth: '360px', margin: '0 0 0 auto', width: '100%', display: 'table' } :
        { display: 'none' }
      }>
        <thead>
          <tr>
            <th scope='col' className='h3 pb-1'>Selected Courses</th>
            <th scope='col' className='h3 pb-1 text-right'>Cost</th>
          </tr>
        </thead>
        <tbody>
          {lines}
        </tbody>
      </table>
    );
  }
}
