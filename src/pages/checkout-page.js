// @flow
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { redirect } from 'redux-first-router'
import ProductComponent from '../components/product-component'
import ProductCheckoutComponent from '../components/product-checkout-component'
import BasketCountComponent from '../components/basket-count-component'
import CheckoutFormComponent from '../components/checkout-form-component'
import type { AppState } from '../core/types'
import type { ProductState } from '../reducers/product-reducer'
import type { BasketState } from '../reducers/basket-reducer'
import Container from 'muicss/lib/react/container'
import { removeFromBasket } from '../actions/basket-actions'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'

type Props = {
	productState: ProductState,
	basketState: BasketState,
	removeFromBasket: (sku: number) => void
}

const mapStateToProps = (state: AppState) => ({
	productState: state.ProductState,
	basketState: state.BasketState
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	removeFromBasket: (sku: number) => dispatch(removeFromBasket(sku))
})

export const basketTotal = (basketState: BasketState, productState: ProductState) => {
	const { skus } = basketState
	const { products } = productState

	return skus.reduce((total, sku) => {
		const skuPrice = products.find((product) => product.sku === sku)
		if (skuPrice) {
			return total + skuPrice.price
		}

		return total
	}, 0)
}

export const CheckoutPage: React.StatelessFunctionalComponent<Props> = (props: Props) => {
	const { basketState, productState } = props
	return (
		<Container>
			<BasketCountComponent />
			{productState &&
				productState.products.map((product) => (
					<ProductCheckoutComponent
						removeFromBasket={props.removeFromBasket}
						basketState={basketState}
						{...product}
					/>
				))}
			<Panel>
				<Row>
					<Col md="6" className="mui--text-body2">
						Basket total
					</Col>
					<Col md="3" className="mui--text-body2">
						{`£${basketTotal(basketState, productState).toFixed(2)}`}
					</Col>
				</Row>
			</Panel>
			<CheckoutFormComponent />
		</Container>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
