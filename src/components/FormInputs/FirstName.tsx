import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class FirstName extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label='First Name'
        name='firstName'
        id='firstName'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        autoComplete='given-name'
        maxLength={31}
        changeFunc={this.props.changeFunc}
      />
    );
  }

}
