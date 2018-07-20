import * as React from 'react';

export interface SelectOption { name: string; value: string; }

export interface Props {
  label?: string;
  opts: SelectOption[];
  name: string;
  id: string;
  value: string | null;
  valid: boolean | string;
  autoComplete?: string;
  changeFunc: (event: React.ChangeEvent<any>) => void;
  blurFunc?: (event: React.FocusEvent<any>) => void;
  wrapperClassName?: string;
  fancy?: boolean;
}

export class Select extends React.Component<Props> {

  public render() {

    let className: string;

    if (this.props.fancy) {
      className = 'custom-select';
    } else {
      className = 'form-control';
    }
    if (typeof this.props.valid === 'string') {
      className += ' is-invalid';
    } else if (this.props.valid === true) {
      className += ' is-valid';
    }

    let label;
    if (typeof this.props.label === 'undefined') {
      label = null;
    } else {
      label = <label htmlFor={this.props.id}>{this.props.label}</label>;
    }

    const items = this.props.opts.map((item, index) => (
      <option key={index} value={item.value}>
        {item.name}
      </option>
    ));

    let value;
    if (this.props.value !== null) {
      value = this.props.value;
    } else if (this.props.opts.length) {
      value = this.props.opts[0].value;
    }

    return (
      <div className='form-group'>
        {label}
        <select
          className={className}
          id={this.props.id}
          name={this.props.name}
          value={value}
          autoComplete={this.props.autoComplete}
          onChange={this.props.changeFunc}
          onBlur={this.props.blurFunc}
        >
          {items}
        </select>
        {this.helpText()}
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
