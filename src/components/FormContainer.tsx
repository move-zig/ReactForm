import * as React from 'react';

import { CheckboxOrRadioGroup } from './CheckboxOrRadioGroup';
import { SingleInput } from './SingleInput';

import * as config from '../config';

export interface Props { }

export interface State {
  courses: string[];
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  emailAddress: string;
  telephoneNumber: string;
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
      emailAddress: '',
      telephoneNumber: '',
    };
  }

  public handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    alert('submitted!');
  }

  public handleCourseChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      // add an item
      this.setState((prevState) => ({
        courses: [ ...prevState.courses, target.value ],
      }));
    } else {
      // remove an item
      this.setState((prevState) => {
        const courses = [ ...prevState.courses ];
        const index = courses.indexOf(target.value);
        courses.splice(index, 1);
        return { courses };
      });
    }
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
      <CheckboxOrRadioGroup
        type='checkbox'
        label={item}
        setName='courses'
        options={config.courses[item]}
        selectedOptions={this.state.courses}
        controlFunc={this.handleCourseChange}
      />
    ));

    return (
      <form onSubmit={this.handleFormSubmit}>
        <h2 className='text-center'>Choose Your Courses</h2>
        {courseList}
        <h2 className='text-center'>Shipping Address</h2>
        <div className='row'>
          <div className='col-12 col-md-6 col-lg-4 offset-lg-2'>
            <SingleInput
              type='text'
              label='First Name'
              name='firstName'
              value={this.state.firstName}
              placeholder=''
              controlFunc={this.handleShippingChange}
            />
            <SingleInput
              type='text'
              label='Last Name'
              name='lastName'
              value={this.state.lastName}
              placeholder=''
              controlFunc={this.handleShippingChange}
            />
            <SingleInput
              type='email'
              label='Email Address'
              name='emailAddress'
              value={this.state.emailAddress}
              placeholder=''
              controlFunc={this.handleShippingChange}
            />
            <SingleInput
              type='text'
              label='Telephone Number'
              name='telephoneNumber'
              value={this.state.telephoneNumber}
              placeholder=''
              controlFunc={this.handleShippingChange}
            />
          </div>
          <div className='col-12 col-md-6 col-lg-4'>
            <SingleInput
              type='text'
              label='Address Line 1'
              name='address1'
              value={this.state.address1}
              placeholder=''
              controlFunc={this.handleShippingChange}
            />
            <SingleInput
              type='text'
              label='Address Line 2'
              name='address2'
              value={this.state.address2}
              placeholder=''
              controlFunc={this.handleShippingChange}
            />
          </div>
        </div>
        <input type='submit' className='btn' value='Enroll Now' />
      </form>
    );
  }
}
