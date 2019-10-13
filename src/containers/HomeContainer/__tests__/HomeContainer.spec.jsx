import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import ConnectedHomeContainer, { HomeContainer } from '../HomeContainer'
import storeFake from '../../../config/testUtils/__mocks__/redux/storeFake'

jest.mock('./HomeContainer.scss', () => ({
  'products-container': 'products-container',
}))

const defaultProps = {
  loadProductsData: jest.fn(),
  products: [
    {
      productId: '1234',
      price: '499.00',
      title: 'Test Product',
      image: 'https://media.4rgos.it/s/Argos/9805244_R_SET?$Web$&w=110&h=130',
    },
  ],
}

const defaultStoreProps = {
  app: {
    products: [...defaultProps.products],
  },
}

const store = storeFake({
  ...defaultStoreProps,
})

describe('HomeContainer', () => {
  it('Renders correctly', () => {
    const shallowHomeContainer = shallow(<HomeContainer {...defaultProps} />)
    expect(shallowHomeContainer).toHaveLength(1)
    expect(shallowHomeContainer).toMatchSnapshot()
  })

  it('Renders the wrapped component', () => {
    const mountedHomeContainer = mount(<Provider store={store}><MemoryRouter><ConnectedHomeContainer /></MemoryRouter></Provider>)
    expect(mountedHomeContainer).toHaveLength(1)
  })
})
