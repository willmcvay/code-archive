// @flow
export type AppState = {
  currentPin: number[],
  lastSelected: number | null
}

export type AppActions = {
  numberTapped: (numberTapped: number) => void
}

export type AppStore = {
  actions: AppActions,
  state: AppState
}
