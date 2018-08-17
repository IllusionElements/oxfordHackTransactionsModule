/** @format */

// @flow
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import type { RouteMap } from './RouteList'
import RouteList from './RouteList'

type Props = {
  path?: string,
  json?: boolean,
}

class RouteHandler extends React.Component<Props> {
  static defaultProps = {
    path: null,
    json: false
  }

  async componentDidMount() {
    const { path, json } = this.props
    if (path) {
      const routes: RouteMap[] = await import(`${path}${this.props.json && '.json'}`)
      this.routes = routes
    }
  }

  routes: RouteMap[]

  render() {
    if (!this.routes) {
      return <h1>...Loading Please Wait</h1>
    }
    return (
      <Router>
        <RouteList routes={this.routes} />
      </Router>
    )
  }
}

export default RouteHandler
