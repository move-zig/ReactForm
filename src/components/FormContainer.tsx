import axios, { CancelTokenSource } from 'axios';
import * as qs from 'qs';
import * as React from 'react';

import { CheckboxGroup } from './CheckboxGroup';
import { Input } from './Input';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';

import { Invoice } from './Invoice';
import { Promotion } from './Promotion';

import * as config from '../config';

export interface Props { }

export interface State {
  formData: {
    courses: string[];
    title: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    provinceCode: string | null;
    postalCode: string;
    countryCode: string;
    emailAddress: string;
    telephoneNumber: string;
    paymentPlan: string;
    paymentDay: number | null;
  };
  price: any;
  provinceOpts: SelectOption[];
  countryOpts: SelectOption[];
  needsPostal: boolean;
}

export interface SelectOption {
  name: string;
  value: string;
}

export class FormContainer extends React.Component<Props, State> {

  private source?: CancelTokenSource;
  private cachedProvinces: { [key: string]: SelectOption[]; } = {};

  public constructor(props: Props) {
    super(props);
    this.state = {
      formData: {
        courses: [],
        title: 'Miss',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        provinceCode: null,
        postalCode: '',
        countryCode: '',
        emailAddress: '',
        telephoneNumber: '',
        paymentPlan: 'full',
        paymentDay: null,
      },
      price: null,
      provinceOpts: [],
      countryOpts: [],
      needsPostal: true,
    };
  }

  public async componentDidMount() {
    try {
      const location = await axios.get('https://api.qccareerschool.com/geoLocation/ip');
      let locationData = location.data;
      const rand = Math.random();
      if (rand > 0.9) {
        locationData = { countryCode: 'GB', provinceCode: null };
      } else if (rand > 0.8) {
        locationData = { countryCode: 'AU', provinceCode: 'NSW' };
      } else if (rand > 0.7) {
        locationData = { countryCode: 'US', provinceCode: 'OK' };
      } else if (rand > 0.6) {
        locationData = { countryCode: 'NZ', provinceCode: null };
      } else if (rand > 0.5) {
        locationData = { countryCode: 'DE', provinceCode: null };
      } else if (rand > 0.4) {
        locationData = { countryCode: 'US', provinceCode: null };
      } else if (rand > 0.3) {
        locationData = { countryCode: 'AU', provinceCode: null };
      } else if (rand > 0.2) {
        locationData = { countryCode: 'AU', provinceCode: 'SA' };
      } else if (rand > 0.1) {
        locationData = { countryCode: 'DE', provinceCode: null };
      }
      const countries = await axios.get('https://api.qccareerschool.com/geoLocation/countries');
      let countryData = countries.data.map((item: any) => ({ name: item.name, value: item.code }));
      countryData = [
        { value: 'AU', name: 'Australia' },
        { value: 'CA', name: 'Canada' },
        { value: 'NZ', name: 'New Zealand' },
        { value: 'GB', name: 'United Kingdom' },
        { value: 'US', name: 'United States' },
        { value: '', name: '---' },
        ...countryData,
      ];
      if ([ 'CA', 'US', 'AU'].indexOf(locationData.countryCode) > -1) {
        const provinces = await this.getProvinces(locationData.countryCode);

        // make sure one of the provinces is selected
        let provinceFound = false;
        for (const p of provinces) {
          if (p.value === locationData.provinceCode) {
            provinceFound = true;
            break;
          }
        }
        if (!provinceFound) {
          locationData.provinceCode = provinces[0].value;
        }

        this.setState((prevState) => {
          return {
            formData: {
              ...prevState.formData,
              countryCode: locationData.countryCode,
              provinceCode: locationData.provinceCode,
            },
            countryOpts: countryData,
            provinceOpts: provinces,
          };
        });
      } else {
        this.setState((prevState) => {
          return {
            formData: {
              ...prevState.formData,
              countryCode: locationData.countryCode,
            },
            countryOpts: countryData,
          };
        });
      }
    } catch (err) {
      alert('failed to load location data');
    }
  }

  public handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    window.alert('submitted!');
  }

  /**
   * Fetches new prices and updates this.state.price. Any time the function is called, still-running http requests will
   * be cancelled.
   *
   * @param string[] courses
   * @param string   countryCode
   * @param string   provinceCode
   */
  public updatePrices = (courses: string[], countryCode: string, provinceCode: string | null) => {
    if (this.source) {
      this.source.cancel('Operation superceded');
    }
    this.source = axios.CancelToken.source();
    axios.get('https://api.qccareerschool.com/prices', {
      cancelToken: this.source.token,
      params: { courses, countryCode, provinceCode },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }), // deep
    }).then((response) => {
      this.setState({ price: response.data });
    }).catch((err) => {
      if (axios.isCancel(err)) {
        // request was cancelled
      } else {
        alert('unable to retrieve prices');
      }
    });
  }

  /**
   * Handles course checkbox changes and updates this.state.courses.
   */
  public handleCourseChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState((prevState) => {
      let courses;
      if (prevState.formData.courses.indexOf(target.value) > -1) {
        courses = prevState.formData.courses.filter((s) => s !== target.value);
      } else {
        courses = [ ...prevState.formData.courses, target.value ];
      }
      this.updatePrices(courses, prevState.formData.countryCode, prevState.formData.provinceCode);
      return { formData: { ...prevState.formData, courses } };
    });
  }

  /**
   * Handles payment plan radio button changes and updates this.state.paymentPlan.
   */
  public handlePaymentPlanChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    this.setState((prevState) => {
      return { formData: { ...prevState.formData, paymentPlan: target.value } };
    });
  }

  /**
   * Handles input in the shipping information and updates the appropriate this.state member.
   */
  public handleShippingChange = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    this.setState((prevState) => {
      return { formData: { ...prevState.formData, [name]: value } };
    });
  }

  /**
   * Handles input changes in the shipping information and updates the appropriate this.state member.
   */
  public handleCountryChange = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    let defaultProvince: string;
    let provinceOpts: SelectOption[];
    if (value === 'CA' || value === 'US' || value === 'AU') {
      provinceOpts = await this.getProvinces(value);
      defaultProvince = provinceOpts[0].value;
    } else {
      provinceOpts = [];
      defaultProvince = '';
    }

    this.setState((prevState) => {
      this.updatePrices(prevState.formData.courses, value, defaultProvince);
      return {
        formData: {
          ...prevState.formData,
          countryCode: value,
          provinceCode: defaultProvince,
        },
        provinceOpts,
      };
    });
  }

  public render() {

    const invoiceItems = [];
    if (this.state.price !== null && typeof this.state.price.courses !== 'undefined') {
      for (const courseCode in this.state.price.courses) {
        if (this.state.price.courses.hasOwnProperty(courseCode)) {
          const course = this.state.price.courses[courseCode];
          invoiceItems.push({ description: course.name, cost: course.baseCost, discount: false });
          if (course.secondaryDiscountAmount) {
            invoiceItems.push({
              description: (course.secondaryDiscount * 100).toFixed(0) + '% discount',
              cost: -course.secondaryDiscountAmount,
              discount: true,
            });
          }
        }
      }
    }

    const courseList = Object.keys(config.courses).map((item) => (
      <CheckboxGroup
        label={item}
        setName='courses'
        options={config.courses[item]}
        selectedOptions={this.state.formData.courses}
        controlFunc={this.handleCourseChange}
        key={item}
      />
    ));

    let provinceSelect;
    if (this.state.provinceOpts.length) {
      provinceSelect = (
        <Select
          label='Province'
          name='provinceCode'
          id='provinceCode'
          opts={this.state.provinceOpts}
          value={this.state.formData.provinceCode || ''}
          required={true}
          controlFunc={this.handleShippingChange}
        />
      );
    } else {
      provinceSelect = null;
    }

    let postalInput;
    if (this.state.needsPostal) {
      postalInput = (
        <Input
          type='text'
          label='Postal Code'
          name='city'
          id='city'
          value={this.state.formData.postalCode}
          placeholder=''
          controlFunc={this.handleShippingChange}
         />
      );
    } else {
      postalInput = null;
    }

    let provincePostal;
    if (provinceSelect && postalInput) {
      provincePostal = (
        <div className='row'>
          <div className='col'>
            {provinceSelect}
          </div>
          <div className='col'>
            {postalInput}
          </div>
        </div>
      );
    } else {
      provincePostal = provinceSelect || postalInput;
    }

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
          <div className='row'>
            <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0 mb-4 mb-md-0'>
              {courseList}
            </div>
            <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0'>
              <Invoice lineItems={invoiceItems} />
            </div>
          </div>
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
            selectedOption={this.state.formData.paymentPlan}
            controlFunc={this.handlePaymentPlanChange}
          />
        </div></section>

        <section className='section' id='shipping'><div className='container'>
          <h2 className='h1 text-center'>Shipping Information</h2>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-4 offset-lg-2'>
              <Select
                label='Title'
                name='title'
                id='title'
                opts={[
                  { name: 'Mrs.', value: 'Mrs.' },
                  { name: 'Miss', value: 'Miss' },
                  { name: 'Ms.', value: 'Ms.' },
                  { name: 'Mr.', value: 'Mr.' },
                ]}
                value={this.state.formData.title}
                required={true}
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='First Name'
                name='firstName'
                id='firstName'
                value={this.state.formData.firstName}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Last Name'
                name='lastName'
                id='lastName'
                value={this.state.formData.lastName}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='email'
                label='Email Address'
                name='emailAddress'
                id='emailAddress'
                value={this.state.formData.emailAddress}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Telephone Number'
                name='telephoneNumber'
                id='telephoneNumber'
                value={this.state.formData.telephoneNumber}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
            </div>
            <div className='col-12 col-md-6 col-lg-4'>
              <Input
                type='text'
                label='Address Line 1'
                name='address1'
                id='address1'
                value={this.state.formData.address1}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='Address Line 2'
                name='address2'
                id='address2'
                value={this.state.formData.address2}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              <Input
                type='text'
                label='City'
                name='city'
                id='city'
                value={this.state.formData.city}
                placeholder=''
                controlFunc={this.handleShippingChange}
              />
              {provincePostal}
              <Select
                label='Country'
                name='countryCode'
                id='countryCode'
                opts={this.state.countryOpts}
                value={this.state.formData.countryCode}
                required={true}
                controlFunc={this.handleCountryChange}
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

  private getProvinces = async (countryCode: string): Promise<SelectOption[]> => {
    try {
      const response = await axios.get('https://api.qccareerschool.com/geoLocation/provinces', {
        params: { countryCode },
      });
      return response.data.map((el: any) => ({ name: el.name, value: el.code }));
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log('Unable to retrieve provinces for ' + countryCode);
      return [];
    }
  }

}
