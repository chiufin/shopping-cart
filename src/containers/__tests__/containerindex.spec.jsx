import React from 'react'
import { shallow } from 'enzyme'
import { HomeContainer } from '..'

describe('Container Mocking', () => {
  it('HomeContainer Mocks correctly', () => {
    expect(HomeContainer).toMatchSnapshot()
    const shallowHomeContainer = shallow(<HomeContainer />)
    expect(shallowHomeContainer).toHaveLength(1)
  })
})
