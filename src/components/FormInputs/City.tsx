import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  countryCode: string;
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class City extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label={this.label()}
        name='city'
        id='city'
        value={this.props.value}
        valid={this.props.valid}
        placeholder=''
        autoComplete='address-level2'
        changeFunc={this.props.changeFunc}
      />
    );
  }

  private label(): string {
    if (this.props.countryCode === 'AU') {
      return 'Suburb';
    } else if (this.props.countryCode === 'GB') {
      return 'Town';
    } else {
      return 'City';
    }
  }

}
