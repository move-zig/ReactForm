import * as React from 'react';

export interface Props {
  label?: string;
  setName: string;
  options: Array<{ name: string; value: string; }>;
  selectedOptions: string[];
  valid: boolean | string;
  changeFunc: (event: React.ChangeEvent<any>) => void;
  blurFunc?: (event: React.FocusEvent<any>) => void;
  wrapperClassName?: string;
  labelClassName?: string;
  fancy?: boolean;
}

export class CheckboxGroup extends React.Component<Props> {
  public render() {

    let wrapperClassName: string;
    let inputClassName: string;
    let labelClassName: string;

    if (this.props.fancy) {
      wrapperClassName = 'custom-control custom-checkbox';
      inputClassName = 'custom-control-input';
      labelClassName = 'custom-control-label';
    } else {
      wrapperClassName = 'form-check';
      inputClassName = 'form-check-input';
      labelClassName = 'form-check-label';
    }

    if (this.props.wrapperClassName) {
      wrapperClassName += ' ' + this.props.wrapperClassName;
    }

    const inputs = this.props.options.map((opt, index) => (
      <div className={wrapperClassName} key={index}>
        <input
          type='checkbox'
          className={inputClassName}
          name={this.props.setName}
          onChange={this.props.changeFunc}
          onBlur={this.props.blurFunc}
          value={opt.value}
          checked={this.props.selectedOptions.indexOf(opt.value) > -1}
          id={this.props.setName + '-' + opt.value}
        />
        <label className={labelClassName} htmlFor={this.props.setName + '-' + opt.value}>
          {opt.name}
        </label>
        {this.helpText()}
      </div>
    ));

    return (
      <div className='form-group'>
        {typeof this.props.label !== 'undefined' ? <label className={this.props.labelClassName}>{this.props.label}</label> : ''}
        {inputs}
      </div>
    );
  }

  private helpText(): JSX.Element | null {
    if (this.props.valid === false) {
      return null;
    } else if (this.props.valid === true) {
      return <small className='form-text text-success'>Looks good!</small>;
    } else {
      return <small className='form-text text-danger'>{this.props.valid}</small>;
    }
  }

}
