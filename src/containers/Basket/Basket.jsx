import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addProductToBasket,
  removeProductFromBasket
} from '../../actions/basketActions'
// eslint-disable-next-line css-modules/no-unused-class
import styles from './Basket.scss'

const Basket = (props) => {
  const { length, products } = props
  const [ toggle, setToggle ] = useState(false)
  return (
    <div className={styles.basket}>
      <h4>Basket: {length} items </h4>
      { length > 0 && <button type="button" onClick={() => setToggle(!toggle)}>{toggle ? 'close panel' : 'open panel'}</button>}
      {toggle
      && (
        <ul>
          {products.map(([product, amount]) => {
            const { productId, title, price, image } = product
            return (
              <li className={styles.basket__item } key={productId}>
                <img className={styles.basket__item__image } src={image} alt={title} />
                <p className={styles.basket__item__text }>{title}</p>
                <p className={styles.basket__item__text }>amount: {amount}</p>
                <p className={styles.basket__item__text }>£ {price}</p>
                <button type="button" onClick={() => props.addProductToBasket(product)}>add</button>
                <button type="button" onClick={() => props.removeProductFromBasket(product)}>remove</button>
              </li>
            )
          })}
        </ul>
      )
      }
    </div>
  )
}

const productShape = {
  productId: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
}

Basket.propTypes = {
  length: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.arrayOf(
    PropTypes.shape((
      PropTypes.objectOf(PropTypes.shape(productShape)),
      PropTypes.number
    ))
  )),
  addProductToBasket: PropTypes.func.isRequired,
  removeProductFromBasket: PropTypes.func.isRequired,
}

Basket.defaultProps = {
  products: [],
}


const organizedList = basket => basket.reduce((acc, current) => {
  const index = acc.findIndex(each => each[0] === current)
  if (index === -1) {
    acc.push([ current, 1 ])
  } else {
    acc[index] = [current, acc[index][1] + 1]
  }
  return acc
}, [])

const mapStateToProps = ({ basket }) => ({
  length: basket.length,
  products: organizedList(basket),
})

export default connect(
  mapStateToProps,
  {
    addProductToBasket,
    removeProductFromBasket,
  }
)(Basket)
