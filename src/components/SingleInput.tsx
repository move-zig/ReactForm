import * as React from 'react';

export interface Props {
  type: 'text' | 'number' | 'email';
  label?: string;
  name: string;
  value: string;
  placeholder: string;
  controlFunc: (event: React.ChangeEvent<HTMLElement>) => void;
}

export class SingleInput extends React.Component<Props> {
  public render() {
    return (
      <div className='form-group'>
        {typeof this.props.label !== 'undefined' ? (<label htmlFor=''>{this.props.label}</label>) : ''}
        <input
          className='form-control'
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.controlFunc}
        />
      </div>
    );
  }
}
