import * as React from 'react';

export interface Props {
  lineItems: Array<{ description: string; cost: string; discount: boolean }>;
}

export class Invoice extends React.Component<Props> {
  public render() {
    const lines = this.props.lineItems.map((el) => (
      <tr key={el.description} className={el.discount ? 'text-primary' : ''}>
        <td>{el.description}</td>
        <td className='text-right'>{el.cost}</td>
      </tr>
    ));
    return (
      <table style={
        this.props.lineItems.length ?
        { maxWidth: '360px', width: '100%', display: 'table' } :
        { display: 'none' }
      }>
        <thead>
          <tr>
            <th>Selected Courses</th>
            <th className='text-right'>Cost</th>
          </tr>
        </thead>
        <tbody>
          {lines}
        </tbody>
      </table>
    );
  }
}
