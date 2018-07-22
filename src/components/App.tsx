import axios, { CancelTokenSource } from 'axios';
import * as Joi from 'joi';
import * as qs from 'qs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { animateScroll } from 'react-scroll';

import { Footer } from './Footer';
import { Header } from './header';

import { RadioGroup } from './HTMLElements/RadioGroup';

import { Invoice } from './Invoice';
import { Promotion } from './Promotion';

import { AddressLine1 } from './FormInputs/AddressLine1';
import { AddressLine2 } from './FormInputs/AddressLine2';
import { City } from './FormInputs/City';
import { Country } from './FormInputs/Country';
import { Courses } from './FormInputs/Courses';
import { EmailAddress } from './FormInputs/EmailAddress';
import { FirstName } from './FormInputs/FirstName';
import { LastName } from './FormInputs/LastName';
import { PostalCode } from './FormInputs/PostalCode';
import { Province } from './FormInputs/Province';
import { TelephoneNumber } from './FormInputs/TelephoneNumber';
import { Title } from './FormInputs/Title';
import { PaymentBreakdown } from './PaymentBreakdown';

export interface Props {}

export type ValidationState = boolean | string;

export interface State {
  disabled: boolean;
  formData: {
    courses: string[];
    title: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    telephoneNumber: string;
    address1: string;
    address2: string;
    city: string;
    provinceCode: string | null;
    postalCode: string;
    countryCode: string;
    paymentPlan: string;
    paymentDay: number | null;
  };
  validationState: {
    courses: ValidationState;
    title: ValidationState;
    firstName: ValidationState;
    lastName: ValidationState;
    emailAddress: ValidationState;
    telephoneNumber: ValidationState;
    address1: ValidationState;
    address2: ValidationState;
    city: ValidationState;
    provinceCode: ValidationState;
    postalCode: ValidationState;
    countryCode: ValidationState;
    paymentPlan: ValidationState
    paymentDay: ValidationState
  };
  submitAttempted: boolean;
  price: any;
}

export interface SelectOption {
  name: string;
  value: string;
}

export class App extends React.Component<Props, State> {

  private source?: CancelTokenSource;

  public constructor(props: Props) {
    super(props);
    this.state = {
      disabled: true,
      formData: {
        courses: [],
        title: 'Miss',
        firstName: '',
        lastName: '',
        emailAddress: '',
        telephoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        provinceCode: null,
        postalCode: '',
        countryCode: '',
        paymentPlan: 'full',
        paymentDay: null,
      },
      validationState: {
        courses: false,
        title: false,
        firstName: false,
        lastName: false,
        emailAddress: false,
        telephoneNumber: false,
        address1: false,
        address2: false,
        city: false,
        provinceCode: false,
        postalCode: false,
        countryCode: false,
        paymentPlan: false,
        paymentDay: false,
      },
      submitAttempted: false,
      price: null,
    };
  }

  public async componentWillMount() {
    try {
      const location = await axios.get('https://api.qccareerschool.com/geoLocation/ip');
      const locationData = location.data;

      this.setState((prevState) => {
        return {
          formData: {
            ...prevState.formData,
            countryCode: locationData.countryCode,
            provinceCode: locationData.provinceCode,
          },
        };
      });
    } catch (err) {
      alert('failed to load location data');
    }
  }

  public render(): JSX.Element {

    const invoiceItems = [];
    if (this.state.price !== null && typeof this.state.price.courses !== 'undefined') {
      for (const courseCode in this.state.price.courses) {
        if (this.state.price.courses.hasOwnProperty(courseCode)) {
          const course = this.state.price.courses[courseCode];
          invoiceItems.push({ description: course.name, cost: this.state.price.currency.symbol + course.baseCost, discount: false });
          if (course.secondaryDiscountAmount) {
            invoiceItems.push({
              description: (course.secondaryDiscount * 100).toFixed(0) + '% discount',
              cost: '-' + this.state.price.currency.symbol + course.secondaryDiscountAmount,
              discount: true,
            });
          }
        }
      }
    }

    return (
      <div>

        <Header countryCode={this.state.formData.countryCode} />

        <form onSubmit={this.handleFormSubmit} noValidate>

          <section className='section' id='courses' ref='coursesSection'><div className='container'>
            <Promotion />
          </div></section>

          <section className='section' id='courses'><div className='container'>
            <h2 className='h1 text-center'>Choose Your Courses</h2>
            <h3 className='mb-4 text-center'>
              Enroll in more than one course and get <strong>50% OFF</strong> each additional course!
          </h3>
            <div className='row'>
              <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0 mb-4 mb-md-0'>
                <Courses
                  selectedOptions={this.state.formData.courses}
                  valid={this.state.validationState.courses}
                  changeFunc={this.handleCourseChange}
                />
              </div>
              <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0'>
                <Invoice lineItems={invoiceItems} />
              </div>
            </div>
          </div></section>

          <section className='section' id='payment'><div className='container'>
            <h2 className='h1 text-center'>Payment Plan</h2>
            <div className='row'>
              <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0 col-lg-4 mb-4 mb-md-0'>
                <RadioGroup
                  setName='paymentPlans'
                  label='Payment Options'
                  options={[
                    { value: 'full', name: 'Pay in Full' },
                    { value: 'accelerated', name: 'Accelerated Installment Plan' },
                    { value: 'part', name: 'Installments Plan' },
                  ]}
                  selectedOption={this.state.formData.paymentPlan}
                  valid={this.state.validationState.paymentPlan}
                  changeFunc={this.handlePaymentPlanChange}
                  wrapperClassName='mb-2'
                  labelClassName='h3'
                  fancy={true}
                />
              </div>
              <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0 offset-lg-2'>
                <PaymentBreakdown paymentPlan={this.state.formData.paymentPlan} price={this.state.price} />
              </div>
            </div>
          </div></section>

          <section className='section' id='shipping'><div className='container'>
            <h2 className='h1 text-center'>Shipping Information</h2>
            <div className='row'>
              <div className='col-12 col-md-6 col-lg-4 offset-lg-2'>
                <Title
                  value={this.state.formData.title}
                  valid={this.state.validationState.title}
                  changeFunc={this.handleTitleChange}
                />
                <FirstName
                  value={this.state.formData.firstName}
                  valid={this.state.validationState.firstName}
                  changeFunc={this.handleFirstNameChange}
                />
                <LastName
                  value={this.state.formData.lastName}
                  valid={this.state.validationState.lastName}
                  changeFunc={this.handleLastNameChange}
                />
                <EmailAddress
                  value={this.state.formData.emailAddress}
                  valid={this.state.validationState.emailAddress}
                  changeFunc={this.handleEmailAddressChange}
                />
                <TelephoneNumber
                  value={this.state.formData.telephoneNumber}
                  valid={this.state.validationState.telephoneNumber}
                  changeFunc={this.handleTelephoneNumberChange}
                />
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <Country
                  value={this.state.formData.countryCode}
                  valid={this.state.validationState.countryCode}
                  changeFunc={this.handleCountryCodeChange}
                />
                <AddressLine1
                  value={this.state.formData.address1}
                  valid={this.state.validationState.address1}
                  changeFunc={this.handleAddress1Change}
                />
                <AddressLine2
                  value={this.state.formData.address2}
                  valid={this.state.validationState.address2}
                  changeFunc={this.handleAddress2Change}
                />
                <City
                  countryCode={this.state.formData.countryCode}
                  value={this.state.formData.city}
                  valid={this.state.validationState.city}
                  changeFunc={this.handleCityChange}
                />
                {this.createProvincePostalElement()}
              </div>
            </div>
          </div></section>

          <section className='section' id='enroll'><div className='container'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-7 col-lg-7'>
                <input type='submit' className='btn' disabled={this.state.disabled} value='Enroll Now' />
                {this.state.formData.courses.length ? null : (
                  <div className='alert alert-primary mt-2' role='alert' onClick={() => {
                    const coursesSection = ReactDOM.findDOMNode(this.refs.coursesSection);
                    if (coursesSection !== null && coursesSection) {
                      animateScroll.scrollTo((coursesSection as HTMLElement).offsetTop);
                      // window.scrollTo(0, (coursesSection as HTMLElement).offsetTop);
                    }
                  }}>
                    Please choose one or more courses before enrolling.
                </div>
                )}
              </div>
              <div className='col-6 offset-3 col-sm-4 offset-sm-4 col-md-2 offset-md-0 mt-4 mb-2'>
              </div>
              <div className='col-12 col-md-3 text-center text-md-left'>
                <h3 className='h4'>21-Day Money-Back Guarantee</h3>
              </div>
            </div>
          </div></section>

        </form>

        <Footer />

      </div>
    );
  }

  public handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    this.setState({ submitAttempted: true }, () => {
      this.validate().then((valid) => {
        if (valid) {
          axios.post('https://api.qccareerschool.com/enrollments', this.state.formData).then((response) => {
            //
          }).catch((err) => {
            //
          });
        }
      });
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
        courses = [...prevState.formData.courses, target.value];
      }
      return { formData: { ...prevState.formData, courses } };
    }, () => {
      // update prices
      this.updatePrices();
    });
  }

  /**
   * Handles changes to the title input
   */
  public handleTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, tile: target.value } };
    }, () => { // state updated
      if (this.state.submitAttempted) {
        this.validateTitle();
      }
    });
  }

  /**
   * Handles changes to the first name input
   */
  public handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, firstName: target.value } };
    }, () => { // state updated
      if (this.state.submitAttempted) {
        this.validateFirstName();
      }
    });
  }

  /**
   * Handles changes to the last name input
   */
  public handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, lastName: target.value } };
    }, () => { // state updated
      if (this.state.submitAttempted) {
        this.validateLastName();
      }
    });
  }

  /**
   * Handles changes to the email address input
   */
  public handleEmailAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, emailAddress: target.value } };
    }, () => {
      if (this.state.submitAttempted) {
        this.validateEmailAddress();
      }
    });
  }

  /**
   * Handles changes to the telephone number input
   */
  public handleTelephoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, telephoneNumber: target.value } };
    }, () => {
      if (this.state.submitAttempted) {
        this.validateTelephoneNumber();
      }
    });
  }

  /**
   * Handles changes the the countryCode select in the shipping information and updates the state.
   */
  public handleCountryCodeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const value = target.value;

    // set the new state
    this.setState((prevState) => {
      return { formData: { ...prevState.formData, countryCode: value, provinceCode: null } };
    }, () => {

      // fetch the new prices
      this.updatePrices();

      if (this.state.submitAttempted) {
        this.validateCountryCode();
        this.validateProvinceCode();
        this.validatePostalCode();
      }

      if (this.refs.provinceCode) {
        (this.refs.provinceCode as Province).update();
      }

    });

  }

  /**
   * Handles changes to the address line 1 input
   */
  public handleAddress1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, address1: target.value } };
    }, () => {
      if (this.state.submitAttempted) {
        this.validateAddress1();
      }
    });
  }

  /**
   * Handles changes to the address line 2 input
   */
  public handleAddress2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, address2: target.value } };
    }, () => {
      if (this.state.submitAttempted) {
        this.validateAddress2();
      }
    });
  }

  /**
   * Handles changes to the address line 2 input
   */
  public handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, city: target.value } };
    }, () => {
      if (this.state.submitAttempted) {
        this.validateCity();
      }
    });
  }

  /**
   * Handles changes to the province input
   */
  public handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;

    // set the new state
    this.setState((prevState) => {
      return { formData: { ...prevState.formData, provinceCode: target.value } };
    }, () => {
      // fetch the new prices
      this.updatePrices();
      if (this.state.submitAttempted) {
        this.validateProvinceCode();
      }
    });
  }

  /**
   * Handles changes to the postal code input
   */
  public handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    this.setState((prevState) => {
      return { formData: { ...prevState.formData, postalCode: target.value } };
    }, () => {
      if (this.state.submitAttempted) {
        this.validatePostalCode();
      }
    });
  }

  /**
   * Handles payment plan radio button changes and updates the state.
   */
  public handlePaymentPlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    this.setState((prevState) => {
      return { formData: { ...prevState.formData, paymentPlan: target.value } };
    });
  }

  /**
   * Validates all form fields and updates state.validationState. Returns true if all form fields are valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validate(): Promise<boolean> {
    let valid = true;
    valid = await this.validateTitle() && valid;
    valid = await this.validateFirstName() && valid;
    valid = await this.validateLastName() && valid;
    valid = await this.validateEmailAddress() && valid;
    valid = await this.validateTelephoneNumber() && valid;
    valid = await this.validateCountryCode() && valid;
    valid = await this.validateAddress1() && valid;
    valid = await this.validateAddress2() && valid;
    valid = await this.validateCity() && valid;
    valid = await this.validateProvinceCode() && valid;
    valid = await this.validatePostalCode() && valid;
    valid = await this.validateCountryCode() && valid;
    return valid;
  }

  /**
   * Validates the title field and updates state.validationState.title. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateTitle(): Promise<boolean> {
    const schema = Joi
      .string()
      .equal(['Miss', 'Mrs.', 'Ms.', 'Mr.'])
      .error(new Error('Please choose either "Miss", "Mrs.", "Ms." or "Mr.".'));
    try {
      await Joi.validate(this.state.formData.title, schema);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, title: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, title: err.message } }));
      return false;
    }
  }

  /**
   * Validates the first name field and updates state.validationState.firstName. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateFirstName(): Promise<boolean> {
    const MAX_LENGTH = 31;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter a first name.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.firstName, schemaExists);
      await Joi.validate(this.state.formData.firstName, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, firstName: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, firstName: err.message } }));
      return false;
    }
  }

  /**
   * Validates the last name field and updates state.validationState.lastName. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateLastName(): Promise<boolean> {
    const MAX_LENGTH = 31;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter a last name.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.lastName, schemaExists);
      await Joi.validate(this.state.formData.lastName, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, lastName: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, lastName: err.message } }));
      return false;
    }
  }

  /**
   * Validates the email address field and updates state.validationState.emailAddress. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateEmailAddress(): Promise<boolean> {
    const MAX_LENGTH = 50;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter an email address.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    const schemaEmail = Joi
      .string()
      .email()
      .error(new Error('Please enter a valid email address. Check "@" and "."'));
    try {
      await Joi.validate(this.state.formData.emailAddress, schemaExists);
      await Joi.validate(this.state.formData.emailAddress, schemaMaxLength);
      await Joi.validate(this.state.formData.emailAddress, schemaEmail);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, emailAddress: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, emailAddress: err.message } }));
      return false;
    }
  }

  /**
   * Validates the email address field and updates state.validationState.emailAddress. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateTelephoneNumber(): Promise<boolean> {
    const MAX_LENGTH = 50;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter a telephone number.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.telephoneNumber, schemaExists);
      await Joi.validate(this.state.formData.telephoneNumber, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, telephoneNumber: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, telephoneNumber: err.message } }));
      return false;
    }
  }

  /**
   * Validates the country code field and updates state.validationState.countryCode. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateCountryCode(): Promise<boolean> {
    const MAX_LENGTH = 2;
    const schemaExists = Joi
      .string()
      .error(new Error('Please choose country.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.countryCode, schemaExists);
      await Joi.validate(this.state.formData.countryCode, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, countryCode: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, countryCode: err.message } }));
      return false;
    }
  }

  /**
   * Validates the address line 1 field and updates state.validationState.address1. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateAddress1(): Promise<boolean> {
    const MAX_LENGTH = 40;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter a street address.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.address1, schemaExists);
      await Joi.validate(this.state.formData.address1, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, address1: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, address1: err.message } }));
      return false;
    }
  }

  /**
   * Validates the address line 2 field and updates state.validationState.address2. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateAddress2(): Promise<boolean> {
    const MAX_LENGTH = 40;
    const schema = Joi
      .string()
      .allow('') // can be empty
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.address2, schema);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, address2: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, address2: err.message } }));
      return false;
    }
  }

  /**
   * Validates the city field and updates state.validationState.city. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateCity(): Promise<boolean> {
    const MAX_LENGTH = 31;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter a city/town/village.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.city, schemaExists);
      await Joi.validate(this.state.formData.city, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, city: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, city: err.message } }));
      return false;
    }
  }

  /**
   * Validates the province code field and updates state.validationState.provinceCode. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validateProvinceCode(): Promise<boolean> {
    const MAX_LENGTH = 3;
    const schemaExists = Joi
      .string()
      .error(new Error('Please choose a provice/state.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    try {
      await Joi.validate(this.state.formData.provinceCode, schemaExists);
      await Joi.validate(this.state.formData.provinceCode, schemaMaxLength);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, provinceCode: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, provinceCode: err.message } }));
      return false;
    }
  }

  /**
   * Validates the postal code field and updates state.validationState.postalCode. Returns true if valid, otherwise false.
   * @return Promise<boolean>
   */
  private async validatePostalCode(): Promise<boolean> {
    const MAX_LENGTH = 10;
    const schemaExists = Joi
      .string()
      .error(new Error('Please enter a postal/zip code.'));
    const schemaMaxLength = Joi
      .string()
      .max(MAX_LENGTH)
      .error(new Error(`Max ${MAX_LENGTH} characters`));
    let schemaPattern = Joi.string();
    if (this.state.formData.countryCode === 'CA') {
      schemaPattern = schemaPattern.regex(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i).error(new Error('Please provide a valid postal code.'));
    } else if (this.state.formData.countryCode === 'US') {
      schemaPattern = schemaPattern.regex(/^\d{5}([ \-]\d{4})?$/).error(new Error('Please provide a valid zip code.'));
    } else if (this.state.formData.countryCode === 'AU' || this.state.formData.countryCode === 'NZ') {
      schemaPattern = schemaPattern.regex(/^\d{4}$/).error(new Error('Please provide a valid postcode.'));
    } else if (this.state.formData.countryCode === 'GB') {
      // tslint:disable-next-line:max-line-length
      schemaPattern = schemaPattern.regex(/^(GIR 0AA)|((([A-Z]\d{1,2})|(([A-Z][A-HJ-Y]\d{1,2})|(([A-Z]\d[A-Z])|([A-Z][A-HJ-Y]\d?[A-Z])))) \d[A-Z]{2})$/i).error(new Error('Please provide a valid postcode.'));
    }
    try {
      await Joi.validate(this.state.formData.postalCode, schemaExists);
      await Joi.validate(this.state.formData.postalCode, schemaMaxLength);
      await Joi.validate(this.state.formData.postalCode, schemaPattern);
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, postalCode: true } }));
      return true;
    } catch (err) {
      this.setState((prevState) => ({ validationState: { ...prevState.validationState, postalCode: err.message } }));
      return false;
    }
  }

  private needsProvince(): boolean {
    const countries = ['CA', 'US', 'AU'];
    return countries.indexOf(this.state.formData.countryCode) > -1;
  }

  private needPostal(): boolean {
    const countries = ['AO', 'AG', 'AW', 'BS', 'BZ', 'BJ', 'BW', 'BF', 'BI', 'CM', 'TD', 'KM', 'CD', 'CG', 'CK', 'CW',
      'DJ', 'DM', 'GQ', 'ER', 'FJ', 'GA', 'GM', 'GH', 'GD', 'GY', 'HM', 'HK', 'CI', 'JM', 'KI', 'LY', 'MO', 'MW', 'ML',
      'MR', 'MS', 'NA', 'NR', 'NU', 'KP', 'PA', 'QA', 'RE', 'RW', 'KN', 'LC', 'WS', 'ST', 'SC', 'SL', 'MF', 'SB', 'GS',
      'SR', 'SY', 'TZ', 'TG', 'TK', 'TO', 'TT', 'TV', 'UG', 'AE', 'VU', 'YE', 'ZW'];
    return countries.indexOf(this.state.formData.countryCode) === -1;
  }

  private createProvincePostalElement(): JSX.Element | null {

    // create the province input
    let provinceSelect;
    if (this.needsProvince()) {
      provinceSelect = (
        <Province
          countryCode={this.state.formData.countryCode}
          value={this.state.formData.provinceCode}
          valid={this.state.validationState.provinceCode}
          changeFunc={this.handleProvinceChange}
          ref='provinceCode'
        />
      );
    } else {
      provinceSelect = null;
    }

    // create the postal code input
    let postalInput;
    if (this.needPostal()) {
      postalInput = (
        <PostalCode
          countryCode={this.state.formData.countryCode}
          value={this.state.formData.postalCode}
          valid={this.state.validationState.postalCode}
          changeFunc={this.handlePostalCodeChange}
          ref='postalCode'
        />
      );
    } else {
      postalInput = null;
    }

    if (provinceSelect && postalInput) {
      return (
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
      return provinceSelect || postalInput;
    }
  }

  /**
   * Fetches new prices and updates this.state.price. Any time the function is called, still-running http requests will
   * be cancelled.
   */
  private updatePrices() {
    if (this.source) {
      this.source.cancel('Operation superceded');
    }
    this.source = axios.CancelToken.source();
    axios.get('https://api.qccareerschool.com/prices', {
      cancelToken: this.source.token,
      params: {
        courses: this.state.formData.courses,
        countryCode: this.state.formData.countryCode,
        provinceCode: this.state.formData.provinceCode,
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }), // deep
    }).then((response) => {
      const data = response.data;
      const disabled = data.numCourses === 0;
      this.setState({ price: data, disabled });
    }).catch((err) => {
      if (axios.isCancel(err)) {
        // request was cancelled
      } else {
        alert('unable to retrieve prices');
      }
    });
  }

}
