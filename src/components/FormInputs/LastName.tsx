import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class LastName extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label='Last Name'
        name='lastName'
        id='lastName'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        autoComplete='family-name'
        maxLength={31}
        changeFunc={this.props.changeFunc}
      />
    );
  }

}
