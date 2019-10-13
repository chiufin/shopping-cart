import React from 'react'
import PropTypes from 'prop-types'

import styles from './Product.scss'

const Product = ({ onProductClick, product: { productId, price, title, image }}) => {
  return (
    <div className={styles.product} data-product-id={productId}>
      <img
        className={styles.image}
        src={image}
        alt={title}
      />
      <p>{title}</p>
      <p className={styles.price}><strong>&pound;{price}</strong></p>
      <button onClick={onProductClick} type="button">add to basket</button>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onProductClick: PropTypes.func.isRequired,
  }),
}

export default Product
