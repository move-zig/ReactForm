import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class EmailAddress extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='email'
        label='Email Address'
        name='emailAddress'
        id='emailAddress'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        autoComplete='email'
        maxLength={50}
        changeFunc={this.props.changeFunc}
      />
    );
  }

}
