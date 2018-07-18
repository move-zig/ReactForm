import * as React from 'react';

import { CheckboxGroup } from './CheckboxGroup';
import { Input } from './Input';
import { RadioGroup } from './RadioGroup';

import { Promotion } from './Promotion';

import * as config from '../config';

export interface Props { }

export interface State {
  courses: string[];
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  provinceCode: string;
  postalCode: string;
  countryCode: string;
  emailAddress: string;
  telephoneNumber: string;
  paymentPlan: string;
  paymentDay: number | null;
}

export class FormContainer extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      courses: [],
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      provinceCode: '',
      postalCode: '',
      countryCode: '',
      emailAddress: '',
      telephoneNumber: '',
      paymentPlan: 'full',
      paymentDay: null,
    };
  }

  public handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    alert('submitted!');
  }

  public handleCourseChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState((prevState) => {
      if (prevState.courses.indexOf(target.value) > -1) {
        return { courses: prevState.courses.filter((s) => s !== target.value) };
      } else {
        return { courses: [ ...prevState.courses, target.value ] };
      }
    });
    // tslint:disable-next-line:no-console
    setTimeout(() => console.log(this.state), 2000);
  }

  public handlePaymentPlanChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState({ paymentPlan: target.value });
    // tslint:disable-next-line:no-console
    setTimeout(() => console.log(this.state), 2000);
  }

  public handleShippingChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState<any>({ [target.name]: target.value });
    // tslint:disable-next-line:no-console
    setTimeout(() => console.log(this.state), 2000);
  }

  public render() {

    const courseList = Object.keys(config.courses).map((item) => (
      <CheckboxGroup
        label={item}
        setName='courses'
        options={config.courses[item]}
        selectedOptions={this.state.courses}
        controlFunc={this.handleCourseChange}
        key={item}
      />
    ));

    return (
      <form onSubmit={this.handleFormSubmit}>

        <section className='section' id='courses'><div className='container'>
          <Promotion />
        </div></section>

        <section className='section' id='courses'><div className='container'>
          <h2 className='h1 text-center'>Choose Your Courses</h2>
          <h3 className='mb-4 text-center'>
            Enroll in more than one course and get <strong>50% OFF</strong> each additional course!
          </h3>
          {courseList}
        </div></section>

        <section className='section' id='payment'><div className='container'>
          <h2 className='h1 text-center'>Payment Plan</h2>
          <h3>Payment Options</h3>
          <RadioGroup
            setName='paymentPlans'
            options={[
              { value: 'full', name: 'Pay in Full' },
              { value: 'accelerated', name: 'Accelerated Installment Plan' },
              { value: 'part', name: 'Installments Plan' },
            ]}
            selectedOption={this.state.paymentPlan}
            controlFunc={this.handlePaymentPlanChange}
          />
        </div></section>

        <section className='section' id='shipping'><div className='container'>
          <h2 className='h1 text-center'>Shipping Information</h2>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-4 offset-lg-2'>
              <Input
                type='text'
                label='First Name'
                name='firstName'
                value={this.state.firstName}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Last Name'
                name='lastName'
                value={this.state.lastName}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='email'
                label='Email Address'
                name='emailAddress'
                value={this.state.emailAddress}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Telephone Number'
                name='telephoneNumber'
                value={this.state.telephoneNumber}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
            </div>
            <div className='col-12 col-md-6 col-lg-4'>
              <Input
                type='text'
                label='Address Line 1'
                name='address1'
                value={this.state.address1}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Address Line 2'
                name='address2'
                value={this.state.address2}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='City'
                name='city'
                value={this.state.city}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Postal Code'
                name='city'
                value={this.state.postalCode}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
            </div>
          </div>
        </div></section>

        <section className='section' id='enroll'><div className='container'>
          <input type='submit' className='btn' value='Enroll Now' />
        </div></section>

      </form>
    );
  }
}
