import React from 'react'
import { shallow } from 'enzyme'
import PageSkeleton from '../PageSkeleton'

const setup = () => {
  const component = shallow(<PageSkeleton />)
  return {
    getInstance: () => component,
    getPageSkeleton: () => component.find(PageSkeleton),
  }
}

describe('PageSkeleton', () => {
  it('should render', () => {
    const component = setup()
    expect(component).toBeDefined()
    expect(component).toMatchSnapshot()
  })
})
