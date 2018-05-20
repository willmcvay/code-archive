// @flow
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { redirect, RouteAction } from 'redux-first-router'
import ProductComponent from '../components/product-component'
import BasketCountComponent from '../components/basket-count-component'
import type { AppState } from '../core/types'
import type { ProductState } from '../reducers/product-reducer'
import Container from 'muicss/lib/react/container'
import { addToBasket, removeFromBasket } from '../actions/basket-actions'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import type { BasketState } from '../reducers/basket-reducer'

type Props = {
	productState: ProductState,
	basketState: BasketState,
	addToBasket: (sku: number) => void,
	redirect: (to: RouteAction) => void
}

const mapStateToProps = (state: AppState) => ({
	productState: state.ProductState,
	basketState: state.BasketState
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	addToBasket: (sku: number) => dispatch(addToBasket(sku)),
	redirect: (to: RouteAction) => dispatch(redirect(to))
})

export const ProductsPage: React.StatelessFunctionalComponent<Props> = (props: Props) => {
	return (
		<Container>
			<BasketCountComponent />
			{props.productState.products.map((product) => (
				<ProductComponent addToBasket={props.addToBasket} {...product} />
			))}
			<Panel>
				<Row>
					<Col md="8" />
					<Col md="4">
						{!!props.basketState.skus.length && (
							<Button onClick={() => props.redirect({ type: 'CHECKOUT_PAGE' })} color="accent">
								Proceed checkout
							</Button>
						)}
					</Col>
				</Row>
			</Panel>
		</Container>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
