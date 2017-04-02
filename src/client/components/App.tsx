import * as React from 'react';

export default class App extends React.Component<{}, {}> {

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
