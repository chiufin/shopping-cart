import React from 'react'
import { shallowWrap } from '../../config/testUtils/contextWrap'
import { App } from '../App'

const defaultProps = {
  loadApp: jest.fn(),
}

describe('App.jsx Mocking', () => {
  it('App Mocks correctly', () => {
    const mockApp = shallowWrap(<App {...defaultProps} />)
    expect(mockApp).toHaveLength(1)
    expect(mockApp).toMatchSnapshot()
  })
})
