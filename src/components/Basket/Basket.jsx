import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  addProductToBasket,
  removeProductFromBasket
} from '../../actions/basketActions'



const Basket = ({length, products, addProductToBasket, removeProductFromBasket}) => {
  return (
    <div>
      <p>Basket {length}</p>
      <ul>
      {products.map(([product, amount]) => 
        <li key={product.productId}>{product.title}
          <p>{amount}</p>
          <button onClick={() => addProductToBasket(product)}>add</button>
          <button onClick={() => removeProductFromBasket(product)}>remove</button>
        </li>)}
      </ul>
    </div>
  )
}

const organizedList = basket => 
  basket.reduce((acc, current)=> {
    const index = acc.findIndex(each => each[0] === current)
    if(index === -1){
      acc.push([ current, 1 ])
    }else{
      acc[index]=[current, acc[index][1]+1]
    }
    return acc
  }, [])

const mapStateToProps = ({basket}) => ({
  length: basket.length,
  products: organizedList(basket)
})

export default connect(
  mapStateToProps,
  {
    addProductToBasket,
    removeProductFromBasket
  }
)(Basket)