import * as React from 'react'

export class MatchesUpcoming extends React.Component<{}, {}> {

  clickHandler () {
    console.log('clicking me')
  }

  render () {
    console.log('render MatchesUpcoming.tsx')
    return (
      <main>
        <button onClick={this.clickHandler.bind(this)}>Click me</button>
      </main>
    )
  }
}
