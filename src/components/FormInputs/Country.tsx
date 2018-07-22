import axios from 'axios';
import * as React from 'react';
import { Select, SelectOption } from '../HTMLElements/Select';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface State {
  opts: SelectOption[];
}

export class Country extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      opts: [],
    };
  }

  public componentWillMount() {
    this.getCountries().then((opts) => {
      this.setState({ opts });
    }).catch((err) => {
      alert('failed to load country data');
    });
  }

  public render() {
    return (
      <Select
        label='Country'
        name='countryCode'
        id='countryCode'
        opts={this.state.opts}
        value={this.props.value}
        valid={this.props.valid}
        autoComplete='country'
        changeFunc={this.props.changeFunc}
        fancy={true}
      />
    );
  }

  private async getCountries(): Promise<SelectOption[]> {
    const response = await axios.get('https://api.qccareerschool.com/geoLocation/countries');
    let countries = response.data.map((el: any) => ({ name: el.name, value: el.code }));
    countries = [
      { value: 'AU', name: 'Australia' },
      { value: 'CA', name: 'Canada' },
      { value: 'NZ', name: 'New Zealand' },
      { value: 'GB', name: 'United Kingdom' },
      { value: 'US', name: 'United States' },
      { value: '', name: '---' },
      ...countries,
    ];
    return countries;
  }

}
