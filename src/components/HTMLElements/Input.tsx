import * as React from 'react';

export interface Props {
  type: 'text' | 'number' | 'email' | 'tel';
  label?: string | JSX.Element;
  name: string;
  id: string;
  value: string;
  valid: boolean | string;
  placeholder: string;
  autoComplete?: string;
  maxLength?: number;
  changeFunc: (event: React.ChangeEvent<any>) => void;
  blurFunc?: (event: React.FocusEvent<any>) => void;
}

export class Input extends React.Component<Props> {

  public render() {

    let classes = 'form-control';
    if (typeof this.props.valid === 'string') {
      classes += ' is-invalid';
    } else if (this.props.valid === true) {
      classes += ' is-valid';
    }

    let label;
    if (typeof this.props.label === 'undefined') {
      label = null;
    } else {
      label = <label htmlFor={this.props.id}>{this.props.label}</label>;
    }

    return (
      <div className='form-group'>
        {label}
        <input
          className={classes}
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          value={this.props.value}
          placeholder={this.props.placeholder}
          autoComplete={this.props.autoComplete}
          maxLength={this.props.maxLength}
          onChange={this.props.changeFunc}
          onBlur={this.props.blurFunc}
        />
        {this.helpText()}
      </div>
    );
  }

  private helpText(): JSX.Element | null {
    if (this.props.valid === false) {
      return null;
    } else if (this.props.valid === true) {
      return <small className='form-text text-success'>✓</small>;
    } else {
      return <small className='form-text text-danger'>✖ {this.props.valid}</small>;
    }
  }

}
