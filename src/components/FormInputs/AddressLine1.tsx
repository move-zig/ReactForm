import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class AddressLine1 extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label='Address Line 1'
        name='address1'
        id='address1'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        autoComplete='address-line1'
        changeFunc={this.props.changeFunc}
      />
    );
  }

}
