import React from 'react'
import { shallow } from 'enzyme'
import ImageCarousel from '../ImageCarousel'

const defaultProps = {
  images: [
    'test',
    'test2',
  ],
  imageAltText: 'Test Text',
}

const setup = () => {
  const component = shallow(<ImageCarousel {...defaultProps} />)
  return {
    getInstance: () => component,
    getImageCarousel: () => component.find(ImageCarousel),
  }
}

describe('ImageCarousel', () => {
  it('should render', () => {
    const component = setup()
    expect(component).toBeDefined()
    expect(component).toMatchSnapshot()
  })
})
