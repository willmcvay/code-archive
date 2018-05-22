import {
  MAX_ATTEMPTS,
  PIN_LENGTH,
  CORRECT_PIN,
  SUCCESS_MESSAGE,
  LOCKED_MESSAGE,
  ERROR_MESSAGE
} from '../../src/constants/pin-constants'

import { DEFAULT_STATE } from '../../src/constants/state'

import {
  getCurrentPin,
  isCorrectPin,
  getDisplayText,
  getIsDisabled,
  getNumberAttempts,
  checkPinCorrect,
  getPinDisplayString
} from '../../src/state/state-utils'

const correctPin = [1, 3, 7, 9]
const incorrectPin = [1, 3, 7, 0]

describe('state utils', () => {
  describe('checkPinCorrect', () => {
    it('should return true if pin is of correct length', () => {
      expect(checkPinCorrect(correctPin)).toBe(true)
    })

    it('should return false if pin is not correct length', () => {
      expect(checkPinCorrect([])).toBe(false)
    })
  })

  describe('isCorrectPin', () => {
    it('should return true if pin is correct', () => {
      expect(isCorrectPin(correctPin)).toBe(true)
    })

    it('should return false if pin is incorrect', () => {
      expect(isCorrectPin(incorrectPin)).toBe(false)
    })
  })

  describe('getIsDisabled', () => {
    it('should return true if reached max attempts', () => {
      expect(
        getIsDisabled({
          numberAttempts: MAX_ATTEMPTS
        })
      ).toBe(true)
    })

    it('should return false if not reached max attempts', () => {
      expect(
        getIsDisabled({
          numberAttempts: 0
        })
      ).toBe(false)
    })
  })

  describe('getCurrentPin', () => {
    it('should add numberTapped to pin if not at max length', () => {
      const numberTapped = 1
      expect(
        getCurrentPin(
          {
            currentPin: [1]
          },
          numberTapped
        )
      ).toEqual([1, numberTapped])
    })

    it('should replace pin with numberTapped if at max length', () => {
      const numberTapped = 1
      expect(
        getCurrentPin(
          {
            currentPin: correctPin
          },
          numberTapped
        )
      ).toEqual([numberTapped])
    })
  })

  describe('getNumberAttempts', () => {
    it('should return current numberAttempts if new pin less than correct length', () => {
      expect(
        getNumberAttempts(
          {
            currentPin: [1, 1],
            numberAttempts: 1
          },
          1
        )
      ).toEqual(1)
    })

    it('should return 0 if new pin is correct', () => {
      expect(
        getNumberAttempts(
          {
            currentPin: [1, 3, 7],
            numberAttempts: 1
          },
          9
        )
      ).toEqual(0)
    })

    it('should increment number of attempts if less than max attempts', () => {
      expect(
        getNumberAttempts(
          {
            currentPin: [1, 3, 7],
            numberAttempts: 1
          },
          1
        )
      ).toEqual(2)
    })

    it('should not number of attempts if at max attempts', () => {
      expect(
        getNumberAttempts(
          {
            currentPin: [1, 3, 7],
            numberAttempts: 3
          },
          1
        )
      ).toEqual(3)
    })
  })

  describe('getPinDisplayString', () => {
    it('should return default text if current pin is of length 0', () => {
      expect(getPinDisplayString([])).toEqual(DEFAULT_STATE.displayText)
    })

    it('should show the last item if the pin has length', () => {
      expect(getPinDisplayString([1, 2, 3])).toEqual(['*', '*', '3', '*'])
    })
  })

  describe('getDisplayText', () => {
    it('should return split success message if pin is correct', () => {
      expect(
        getDisplayText(
          {
            currentPin: [1, 3, 7],
            numberAttempts: 1
          },
          9
        )
      ).toEqual(['S', 'U', 'C', 'C', 'E', 'S', 'S'])
    })

    it('should return split locked message if pin is incorrect and at max attempts', () => {
      expect(
        getDisplayText(
          {
            currentPin: [1, 3, 7],
            numberAttempts: 2
          },
          1
        )
      ).toEqual(['L', 'O', 'C', 'K', 'E', 'D'])
    })

    it('should return split error message if pin is incorrect and not at max attempts', () => {
      expect(
        getDisplayText(
          {
            currentPin: [1, 3, 7],
            numberAttempts: 1
          },
          1
        )
      ).toEqual(['E', 'R', 'R', 'O', 'R'])
    })

    it('should return pin with last digit showing if not at pin length', () => {
      expect(
        getDisplayText(
          {
            currentPin: [1, 3],
            numberAttempts: 1
          },
          7
        )
      ).toEqual(['*', '*', '7', '*'])
    })
  })
})
