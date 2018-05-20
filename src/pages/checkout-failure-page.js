// @flow
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { redirect, RouteAction } from 'redux-first-router'
import type { AppState } from '../core/types'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import type { CardState } from '../reducers/card-reducer'

type Props = {
  redirect: (to: RouteAction) => void,
  cardState: CardState
};

const mapStateToProps = (state: AppState) => ({
  cardState: state.CardState
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  redirect: (to: RouteAction) => dispatch(redirect(to))
})

export const CheckoutFailurePage = (props: Props) => {
  const hasErrors = props.cardState && !!props.cardState.paymentErrors.length
  return (
    <Container>
      <Panel>
        <div className="mui--text-title">
          Checkout failure {hasErrors && ' - you have the following errors:'}
        </div>
        {hasErrors &&
          props.cardState.paymentErrors.map(err => (
            <div className="mui--text-body2">{err.msg}</div>
					))}
					<Button
						onClick={() => props.redirect({ type: 'CHECKOUT_PAGE' })}
						color="accent"
					>
						Return to checkout
					</Button>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CheckoutFailurePage
)
