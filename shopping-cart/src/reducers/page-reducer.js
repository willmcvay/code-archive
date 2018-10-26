// @flow
import * as componentsPages from '../constants/components-pages'

const PageReducer = (state: string = 'DEFAULT', action: { type: string }) =>
  componentsPages[action.type] || state

export default PageReducer
