import * as React from 'react';
import actionKeys from '../../server/actions/actionKeys';

export default class App extends React.Component<{}, {}> {

  static actionKeys(): string[] {
    return [
      actionKeys.GET_UPCOMING_MATCHES
    ];
  };

  clickHandler() {
    console.log('clicking me');
  };

  render() {
    console.log('render App.tsx');
    return (
      <main>
        <button onClick={this.clickHandler.bind(this)}>Click me</button>
      </main>
    );
  }
};
