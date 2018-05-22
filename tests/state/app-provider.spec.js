import React from 'react'
import { shallow } from 'enzyme'
import AppProvider from '../../src/state/app-provider'
import { DEFAULT_STATE } from '../../src/constants/state'
import { LOCKED_TIME } from '../../src/constants/pin-constants'
import * as stateUtils from '../../src/state/state-utils'

describe('AppProvider', () => {
  describe('properties', () => {
    it('should match a DOM snapshot', () => {
      expect(shallow(<AppProvider />)).toMatchSnapshot()
    })

    it('should create a default state', () => {
      expect(shallow(<AppProvider />).state()).toEqual(DEFAULT_STATE)
    })

    it('should return an actions object', () => {
      const componentInstance = shallow(<AppProvider />).instance()

      expect(componentInstance.actions).toEqual({
        numberTapped: componentInstance.numberTapped
      })
    })
  })

  describe('numberTapped', function() {
    const numberTapped = 2

    beforeEach(() => {
      this.getCurrentPinSpy = jest.spyOn(stateUtils, 'getCurrentPin')
      this.getDisplayTextSpy = jest.spyOn(stateUtils, 'getDisplayText')
      this.getNumberAttemptsSpy = jest.spyOn(stateUtils, 'getNumberAttempts')
    })

    it('should call state setters correctly if not disabled', () => {
      this.getIsDisabledSpy = jest
        .spyOn(stateUtils, 'getIsDisabled')
        .mockReturnValue(false)

      const componentInstance = shallow(<AppProvider />).instance()

      componentInstance.numberTapped(numberTapped)

      expect(this.getCurrentPinSpy).toHaveBeenCalledTimes(1)
      expect(this.getCurrentPinSpy).toHaveBeenCalledWith(
        DEFAULT_STATE,
        numberTapped
      )

      expect(this.getDisplayTextSpy).toHaveBeenCalledTimes(1)
      expect(this.getDisplayTextSpy).toHaveBeenCalledWith(
        DEFAULT_STATE,
        numberTapped
      )

      expect(this.getNumberAttemptsSpy).toHaveBeenCalledTimes(1)
      expect(this.getNumberAttemptsSpy).toHaveBeenCalledWith(
        DEFAULT_STATE,
        numberTapped
      )
    })

    it('should not call state setters if disabled', () => {
      this.getIsDisabledSpy = jest
        .spyOn(stateUtils, 'getIsDisabled')
        .mockReturnValue(true)

      const componentInstance = shallow(<AppProvider />).instance()

      componentInstance.numberTapped(numberTapped)

      expect(this.getCurrentPinSpy).not.toHaveBeenCalled()

      expect(this.getDisplayTextSpy).not.toHaveBeenCalled()

      expect(this.getNumberAttemptsSpy).not.toHaveBeenCalled()
    })

    afterEach(() => {
      this.getCurrentPinSpy.mockClear()
      this.getDisplayTextSpy.mockClear()
      this.getNumberAttemptsSpy.mockClear()
      this.getIsDisabledSpy.mockClear()
    })
  })

  describe('locked timer', function() {
    jest.useFakeTimers()

    it('should reset the state to default after 30sec timer if disabled', () => {
      this.getIsDisabledSpy = jest
        .spyOn(stateUtils, 'getIsDisabled')
        .mockReturnValue(true)

      const componentInstance = shallow(<AppProvider />)

      componentInstance.setState({
        currentPin: [1, 2, 3, 4]
      })

      jest.runAllTimers()

      expect(componentInstance.state().currentPin).toEqual(
        DEFAULT_STATE.currentPin
      )
    })

    it('should not reset the state if not disabled', () => {
      this.getIsDisabledSpy = jest
        .spyOn(stateUtils, 'getIsDisabled')
        .mockReturnValue(false)

      const componentInstance = shallow(<AppProvider />)
      const newPin = [1, 2, 3, 4]

      componentInstance.setState({
        currentPin: newPin
      })

      jest.runAllTimers()

      expect(componentInstance.state().currentPin).toEqual(newPin)
    })

    afterEach(() => {
      this.getIsDisabledSpy.mockClear()
    })
  })
})
