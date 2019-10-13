import React from 'react'
import PropTypes from 'prop-types'

import styles from './Product.scss'

const Product = (props) => {
  const { productId, price, title, image } = props.product
  return (
    <div className={styles.product} data-product-id={productId}>
      <img
        className={styles.image}
        src={image}
        alt={title}
      />
      <p>{title}</p>
      <p className={styles.price}><strong>&pound;{price}</strong></p>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
}

export default Product
