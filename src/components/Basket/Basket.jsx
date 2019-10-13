import React from 'react'
import PropTypes from 'prop-types'

const Basket = ({list}) => (
  <div>
    <p>Basket {list.length}</p>
  </div>
)


Basket.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
}

Basket.defaultProps = {
    list: []
}

export default Basket
