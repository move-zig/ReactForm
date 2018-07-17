import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
  foo?: string;
  bar?: string;
}

export const BLUE = '#0000ff';
export const RED = '#ff0000';

export class Hello extends React.Component<HelloProps, { color: string }> {

  private static defaultProps = {
    foo: 'foo',
    bar: 'bar',
  };

  public constructor(props: any) {
    super(props);
    this.state = { color: BLUE };
  }

  public toggleColor = () => {
    const newColor = this.state.color === BLUE ? RED : BLUE;
    this.setState({ color: newColor });
  }

  public render() {
    return (
      <div>
        <h1 style={{color: this.state.color}}>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
        <p>{this.props.foo}</p>
        <button onClick={this.toggleColor}>Toggle</button>
      </div>
    );
  }
}
