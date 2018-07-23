import * as React from 'react';
import { Input } from '../HTMLElements/Input';

export interface Props {
  countryCode: string;
  value: string | null;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class PostalCode extends React.Component<Props> {

  public render() {
    return (
      <Input
        type='text'
        label={this.label()}
        name='postalCode'
        id='postalCode'
        value={this.props.value !== null ? this.props.value : ''}
        valid={this.props.valid}
        placeholder=''
        autoComplete='postal-code'
        maxLength={this.maxLength()}
        changeFunc={this.props.changeFunc}
      />
    );
  }

  private maxLength(): number {
    if (this.props.countryCode === 'AU' || this.props.countryCode === 'NZ') {
      return 4;
    } else if (this.props.countryCode === 'CA') {
      return 7;
    } else if (this.props.countryCode === 'MX') {
      return 5;
    } else {
      return 12;
    }
  }

  private label(): string {
    if (this.props.countryCode === 'US') {
      return 'Zip Code';
    } else if (this.props.countryCode === 'CA') {
      return 'Postal Code';
    } else if (this.props.countryCode === 'IT') {
      return 'CAP';
    } else if (this.props.countryCode === 'IN') {
      return 'Postal Index Number';
    } else {
      return 'Postcode';
    }
  }

}
