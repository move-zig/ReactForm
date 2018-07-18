import * as React from 'react';

export interface Props {
  label?: string;
  opts: Array<{ name: string; value: string; }>;
  name: string;
  id: string;
  value: string;
  required: boolean;
  controlFunc: (event: React.ChangeEvent) => void;
}

export class Select extends React.Component<Props> {
  public render() {
    const items = this.props.opts.map((item, index) => (
      <option key={index} value={item.value}>
        {item.name}
      </option>
    ));
    return (
      <div className='form-group'>
      {typeof this.props.label !== 'undefined' ? (<label htmlFor={this.props.id}>{this.props.label}</label>) : ''}
      <select
        required={this.props.required}
        className='form-control'
        id={this.props.id}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.controlFunc}
      >
      {items}
      </select>
    </div>
    );
  }
}
