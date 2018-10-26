// @flow
import { redirect } from 'redux-first-router'
import type { AsyncParams } from '../core/types'

const dispatchAction = (method, shouldRedirect, data) =>
  shouldRedirect ? redirect({ type: method, data }) : { type: method, data }

const post = async ({
  url,
  body,
  success,
  failure,
  dispatch,
  shouldRedirect
}: AsyncParams) => {
  try {
    const res = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (data.errors) {
      dispatch(dispatchAction(failure, shouldRedirect, data))
    } else {
      dispatch(dispatchAction(success, shouldRedirect, data))
    }
  } catch (e) {
    dispatch(dispatchAction(failure, shouldRedirect, e))
  }
}

const get = async ({
  url,
  success,
  failure,
  dispatch,
  shouldRedirect
}: AsyncParams) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    dispatch(dispatchAction(success, shouldRedirect, data))
  } catch (e) {
    console.log(e)
    dispatch(dispatchAction(failure, shouldRedirect, {}))
  }
}

export { get, post }
