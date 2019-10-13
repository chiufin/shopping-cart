import React from 'react'
import PropTypes from 'prop-types'

import styles from './MainLayout.scss'
import Header from '../components/Header/Header'

const MainLayout = ({ children }) => (
  <div data-e2e="app" className="app">
    <a href="#app-content" className={styles['sr-only']}>
      Skip to main content
    </a>
    <Header />
    <div id="app-content" className="app-content">
      <main>
        {children}
      </main>
    </div>
  </div>
)

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired,
}

export default MainLayout
