import * as React from 'react';

export interface Props {
  type: 'text' | 'number' | 'email';
  label?: string;
  name: string;
  id: string;
  value: string;
  placeholder: string;
  controlFunc: (event: React.ChangeEvent<HTMLElement>) => void;
}

export class Input extends React.Component<Props> {
  public render() {
    return (
      <div className='form-group'>
        {typeof this.props.label !== 'undefined' ? (<label htmlFor={this.props.id}>{this.props.label}</label>) : ''}
        <input
          className='form-control'
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.controlFunc}
        />
      </div>
    );
  }
}
