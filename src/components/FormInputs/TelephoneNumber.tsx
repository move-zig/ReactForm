import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class TelephoneNumber extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label='Telephone Number'
        name='telephoneNumber'
        id='telephoneNumber'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        maxLength={50}
        autoComplete='tel'
        changeFunc={this.props.changeFunc}
      />
    );
  }

}
