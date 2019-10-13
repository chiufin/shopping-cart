import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadProductsData
} from '../../actions/appActions'
import {
  addProductToBasket
} from '../../actions/basketActions'
import styles from './HomeContainer.scss'
import Product from '../../components/Product/Product'
import Basket from '../../components/Basket/Basket'
export class HomeContainer extends Component {
  componentDidMount() {
    this.props.loadProductsData()
  }

  render() {
    const { products, basket, addProductToBasket } = this.props
    return (
      <Fragment>
        <h1>Products</h1>
        <Basket list={basket}/>   
        <div className={styles['products-container']}>
          {products.map(product => <Product key={product.productId} product={product} onProductClick={() => addProductToBasket(product)}/>)}
        </div>
      </Fragment>

    )
  }
}

const mapStateToProps = state => ({
  products: state.app.products,
  basket: state.basket
})

HomeContainer.propTypes = {
  loadProductsData: PropTypes.func,
  addProductToBasket: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
}

HomeContainer.defaultProps = {
  products: [],
}

export default connect(mapStateToProps, {
  loadProductsData,
  addProductToBasket
})(HomeContainer)
