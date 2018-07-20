import axios, { CancelTokenSource } from 'axios';
import * as React from 'react';
import { Select, SelectOption } from '../HTMLElements/Select';

export interface Props {
  countryCode: string;
  value: string | null;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface State {
  opts: SelectOption[];
}

export class Province extends React.Component<Props, State> {

  private source?: CancelTokenSource;

  public constructor(props: Props) {
    super(props);
    this.state = {
      opts: [],
    };
  }

  public componentWillMount() {
    this.update();
  }

  /**
   * Fetch provinces if needed, and set state.opts
   */
  public update(): void {
    if (!this.needsProvince()) {
      return this.setState({ opts: [] });
    }

    if (this.source) {
      this.source.cancel('Operation superceded');
    }
    this.source = axios.CancelToken.source();
    axios.get('https://api.qccareerschool.com/geoLocation/provinces', {
      cancelToken: this.source.token,
      params: { countryCode: this.props.countryCode },
    }).then((response) => {
      const opts = [ { name: '---', value: '' }, ...response.data.map((el: any) => ({ name: el.name, value: el.code })) ];
      this.setState({ opts });
    }).catch((err) => {
      if (axios.isCancel(err)) {
        // request was cancelled
      } else {
        alert('failed to load provinces');
      }
    });
  }

  public render() {
    return (
      <Select
        label={this.label()}
        name='provinceCode'
        id='provinceCode'
        opts={this.state.opts}
        value={this.props.value}
        valid={this.props.valid}
        autoComplete='address-level1'
        changeFunc={this.props.changeFunc}
        fancy={true}
      />
    );
  }

  private needsProvince(): boolean {
    const countries = ['CA', 'US', 'AU'];
    return countries.indexOf(this.props.countryCode) > -1;
  }

  private label(): string {
    if (this.props.countryCode === 'US' || this.props.countryCode === 'AU') {
      return 'State';
    } else {
      return 'Province';
    }

  }
}
