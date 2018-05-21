// @flow
export type AppState = {
  currentPin: number[],
  displayText: string[],
  numberAttempts: number
}

export type AppActions = {
  numberTapped: (numberTapped: number) => void
}

export type AppStore = {
  actions: AppActions,
  state: AppState
}
