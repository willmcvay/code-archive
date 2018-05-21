// @flow
import type { AppState } from '../core/types'
import * as pinConstants from '../constants/pin-constants'

export const getLastSelected = (
  state: AppState,
  numberTapped: number
): number | null =>
  state.currentPin.length < pinConstants.PIN_LENGTH
    ? numberTapped
    : state.lastSelected

export const getCurrentPin = (
  state: AppState,
  numberTapped: number
): number[] =>
  state.currentPin.length < pinConstants.PIN_LENGTH
    ? [...state.currentPin, numberTapped]
    : state.currentPin
