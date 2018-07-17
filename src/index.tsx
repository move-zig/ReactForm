import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FormContainer } from './components/FormContainer';
import { Header } from './components/header';

export class App extends React.Component {
  public render() {
    return (
      <div className='container'>
        <Header />
        <FormContainer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
