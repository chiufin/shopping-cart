import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadApp } from '../actions/appActions'
import MainLayout from '../layouts/MainLayout'
import { HomeContainer } from '../containers'
import { homeRoute } from '../routes'

import './App.scss'

export class App extends Component {
  componentDidMount() {
    this.props.loadApp()
  }

  render() {
    return (
      <MainLayout>
        <Switch>
          <Route exact path={homeRoute.path} component={HomeContainer} />
        </Switch>
      </MainLayout>
    )
  }
}

App.propTypes = {
  loadApp: PropTypes.func,
}

export default withRouter(connect(null, {
  loadApp,
})(App))
