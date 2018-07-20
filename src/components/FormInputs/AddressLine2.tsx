import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class AddressLine2 extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label='Address Line 2'
        name='address2'
        id='address2'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        autoComplete='address-line2'
        changeFunc={this.props.changeFunc}
      />
    );
  }

}
