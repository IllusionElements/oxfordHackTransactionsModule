/** @format */
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, RouteList } from './RouteList'

type Props = {
  path?: string
  json: boolean
}

class RouteHandler extends React.Component<Props> {
  routes?: Route[]

  static defaultProps = {
    path: null,
    json: false,
  }

  async componentDidMount() {
    const { path, json } = this.props
    if (path) {
      const routes: Route[] = await import(`${path}${json && '.json'}`)
      this.routes = routes
    }
  }

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
