import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadProductsData
} from '../../actions/appActions'

import styles from './HomeContainer.scss'
import Product from '../../components/Product/Product'

export class HomeContainer extends Component {
  componentDidMount() {
    this.props.loadProductsData()
  }

  render() {
    const { products } = this.props
    return (
      <Fragment>
        <h1>Products</h1>
        <div className={styles['products-container']}>
          {products.map(product => <Product key={product.productId} product={product} />)}
        </div>
      </Fragment>

    )
  }
}

const mapStateToProps = state => ({
  products: state.app.products,
})

HomeContainer.propTypes = {
  loadProductsData: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.object),
}

HomeContainer.defaultProps = {
  products: [],
}

export default connect(mapStateToProps, {
  loadProductsData,
})(HomeContainer)
