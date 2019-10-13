import React from 'react'
import { shallow } from 'enzyme'
import MainLayout from '../MainLayout'

jest.mock('./Header.scss', () => ({
  header: 'header',
}))

describe('MainLayout', () => {
  let mountedMainLayout

  beforeEach(() => {
    mountedMainLayout = shallow((
      <MainLayout>
        HELLO
      </MainLayout>
    ))
  })

  it('Renders correctly', () => {
    expect(mountedMainLayout.find('[data-e2e="app"]')).toMatchSnapshot()
  })
})
