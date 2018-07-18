import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Footer } from './components/Footer';
import { FormContainer } from './components/FormContainer';
import { Header } from './components/Header';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <FormContainer />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
