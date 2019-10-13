import React from 'react'
import { mountWrap, shallowWrap } from '../../../config/testUtils/contextWrap'
import Status from '../Status'

const mockStatusProps = {
  code: 404,
  children: '<div />',
}

const setup = (props, renderer = shallowWrap) => {
  const component = renderer(<Status {...props} />)
  return {
    getInstance: () => component,
  }
}

describe('Status', () => {
  it('should render', () => {
    const component = setup()
    expect(component).toBeDefined()
    expect(component).toMatchSnapshot()
  })

  it('should mount content properly', () => {
    const component = mountWrap(<Status {...mockStatusProps} />)
    expect(component).toBeDefined()
    expect(component).toMatchSnapshot()
  })
})
