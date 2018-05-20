// @flow
import * as React from 'react'
import { hot } from 'react-hot-loader'
import ChildComponent from '../components/child-component'

type Props = {}

const AppPage: React.StatelessFunctionalComponent<Props> = (props: Props) => (
  <ChildComponent />
)

export default hot(module)(AppPage)
