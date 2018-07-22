import * as React from 'react';
import { Select } from '../HTMLElements/Select';

export interface Props {
  value: string;
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export class Title extends React.Component<Props> {

  public render() {
    return (
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
        value={this.props.value}
        valid={this.props.valid}
        autoComplete='honorific-prefix'
        changeFunc={this.props.changeFunc}
        fancy={true}
      />
    );
  }

}
