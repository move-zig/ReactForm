import * as React from 'react';

export interface ShippingAddressState {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  provinceCode: string;
  postalCode: string;
  countryCode: string;
}

export class ShippingAddress extends React.Component<{}, ShippingAddressState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      provinceCode: '',
      postalCode: '',
      countryCode: '',
    };
  }

  public handleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    this.setState<any>({ [name]: value });
  }

  public render() {
    return (
      <div>
        <h2>Shipping Address</h2>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            className='form-control'
            name='firstName'
            id='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            className='form-control'
            name='lastName'
            id='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
