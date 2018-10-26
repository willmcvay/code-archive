// @flow
import type { AppState } from '../core/types'
import {
  MAX_ATTEMPTS,
  PIN_LENGTH,
  CORRECT_PIN,
  SUCCESS_MESSAGE,
  LOCKED_MESSAGE,
  ERROR_MESSAGE
} from '../constants/pin-constants'
import { DEFAULT_STATE } from '../constants/state'

const checkPinCorrect = (currentPin: number[]): boolean =>
  currentPin.length === PIN_LENGTH

const isCorrectPin = (currentPin: number[]): boolean =>
  Number(currentPin.join('')) === CORRECT_PIN

const getIsDisabled = (state: AppState): boolean =>
  state.numberAttempts === MAX_ATTEMPTS

const getCurrentPin = (state: AppState, numberTapped: number): number[] =>
  state.currentPin.length < PIN_LENGTH
    ? [...state.currentPin, numberTapped]
    : [numberTapped]

const getNumberAttempts = (state: AppState, numberTapped: number): number =>
  !checkPinCorrect(getCurrentPin(state, numberTapped))
    ? state.numberAttempts
    : isCorrectPin(getCurrentPin(state, numberTapped))
      ? 0
      : state.numberAttempts < MAX_ATTEMPTS
        ? state.numberAttempts + 1
        : state.numberAttempts

const getPinDisplayString = (currentPin: number[]): string[] =>
  !currentPin.length
    ? DEFAULT_STATE.displayText
    : DEFAULT_STATE.displayText.map(
        (item, index) =>
          index === currentPin.length - 1 ? String(currentPin[index]) : item
      )

const getDisplayText = (state: AppState, numberTapped: number): string[] =>
  isCorrectPin(getCurrentPin(state, numberTapped))
    ? SUCCESS_MESSAGE.split('')
    : getNumberAttempts(state, numberTapped) === MAX_ATTEMPTS
      ? LOCKED_MESSAGE.split('')
      : checkPinCorrect(getCurrentPin(state, numberTapped)) &&
        !isCorrectPin(getCurrentPin(state, numberTapped))
        ? ERROR_MESSAGE.split('')
        : getPinDisplayString(getCurrentPin(state, numberTapped))

export {
  getCurrentPin,
  isCorrectPin,
  getDisplayText,
  getIsDisabled,
  getNumberAttempts,
  checkPinCorrect,
  getPinDisplayString
}
