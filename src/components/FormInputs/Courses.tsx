import * as React from 'react';

import { CheckboxGroup } from '../HTMLElements/CheckboxGroup';

import * as config from '../../config';

export interface Props {
  selectedOptions: string[];
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Courses extends React.Component<Props> {

  public render() {
    return Object.keys(config.courses).map((courseGroup) => (
      <CheckboxGroup
        label={courseGroup}
        setName='courses'
        options={config.courses[courseGroup]}
        selectedOptions={this.props.selectedOptions}
        valid={this.props.valid}
        changeFunc={this.props.changeFunc}
        wrapperClassName='mb-2'
        labelClassName='h3'
        fancy={true}
        key={courseGroup}
      />
    ));
  }

}
