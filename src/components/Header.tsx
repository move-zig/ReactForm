/**
 * Note:
 * Use
 * import faPhone from '@fortawesome/free-solid-svg-icons/faPhone';
 * rather than
 * import { faPhone } from '@fortawesome/free-solid-svg-icons'
 * The second form casuses webpack to include all the icons and adds over 200 kb to the bundle size.
 */
import faPhone from '@fortawesome/free-solid-svg-icons/faPhone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface Props {
  countryCode: string;
}

export class Header extends React.Component<Props> {

  public render() {
    return (
      <header id='header'>
        <div className='container'>
          <div className='row'>
            <div className='col-9 col-sm-12 text-left text-sm-center'>
              <a href='https://www.qcmakeupacademy.com'><img src='./images/logo.svg' alt='QC Makeup Academy' id='logo' /></a>
            </div>
            <div className='col-3 d-block d-sm-none text-right'>
              <a id='phone-link' href={'tel:' + this.phoneNumber()}>
                <FontAwesomeIcon icon={faPhone} style={{ fontSize: '30px' }} />
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }

  private phoneNumber(): string {
    if (this.props.countryCode === 'CA' || this.props.countryCode === 'CA') {
      return '1-800-267-1829';
    }
    if (this.props.countryCode === 'AU') {
      return '1800 358 931';
    }
    if (this.props.countryCode === 'NZ') {
      // TODO: what is the New Zeland toll free number?
      return '99999999';
    }
    if (this.props.countryCode === 'GB') {
      return '0800 066 4734';
    }
    return '+1 613-749-8248';
  }

}
