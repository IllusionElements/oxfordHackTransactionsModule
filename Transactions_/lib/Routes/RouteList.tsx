/** @format */

import { PureComponent, ReactNode } from 'react'
import { RouteProps } from 'react-router-dom'
import { renderRoute } from './render'

export interface Route<T = {}> {
  path: string
  component: any
  props: Partial<RouteProps>
}

interface Props<T> {
  routes: Route<T>[]
}

export class RouteList extends PureComponent<Props<RouteProps>> {
  render(): ReactNode {
    const { routes } = this.props
    return routes.map(({ component, path, props }) => renderRoute({ component, path, ...props }))
  }
}
