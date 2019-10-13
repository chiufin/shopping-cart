import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'

jest.mock('./Header.scss', () => ({
  header: 'header',
  'logo-container': 'logo-container',
}))

describe('Header', () => {
  let shallowHeader
  beforeEach(() => {
    shallowHeader = shallow(<Header />)
  })
  it('renders correctly', () => {
    expect(shallowHeader).toMatchSnapshot()
  })
  it('renders header', () => {
    expect(shallowHeader.find('.header')).toHaveLength(1)
  })
  it('renders argos logo', () => {
    expect(shallowHeader.find('.logo-container')).toHaveLength(1)
  })
})
