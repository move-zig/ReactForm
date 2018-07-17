import * as React from 'react';

export interface Props {
  type: 'checkbox' | 'radio';
  label?: string;
  setName: string;
  options: Array<{ name: string; value: string; }>;
  selectedOptions: string[];
  controlFunc: (event: React.ChangeEvent<HTMLElement>) => void;
}

export class CheckboxOrRadioGroup extends React.Component<Props> {
  public render() {
    const inputs = this.props.options.map((opt) => (
      <div className='form-check' key={opt.value}>
        <input
          className='form-check-input'
          name={this.props.setName}
          onChange={this.props.controlFunc}
          value={opt.value}
          checked={this.props.selectedOptions.indexOf(opt.value) > -1}
          type={this.props.type}
          id={this.props.setName + '-' + opt.value}
        />
        <label className='form-check-label' htmlFor={this.props.setName + '-' + opt.value}>
          {opt.name}
        </label>
      </div>
    ));
    return (
      <div className='form-group'>
        {typeof this.props.label !== 'undefined' ? <label>{this.props.label}</label> : '' }
        {inputs}
      </div>
    );
  }
}
