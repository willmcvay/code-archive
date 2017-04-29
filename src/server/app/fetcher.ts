import actionMap from '../actions/actionMap'

export default (component: any) => {
  return component.type.actionKeys().map((key: string) => {
    return actionMap[key]()
  })
}
