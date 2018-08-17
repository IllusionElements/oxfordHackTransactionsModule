/** @format */

import * as React from 'react'
import { Route } from 'react-router-dom'
import type { iLocation } from '../flowtyped/location.libdef'

interface PropRecord {
  location: iLocation;
  exact: boolean;
  strict: boolean;
  sensitive: boolean;
}

const { Node: ReactNode, SFC } = React

export interface RouteMap<T: {}> {
  path: string;
  component: ReactNode | SFC<T>;
  props: PropRecord;
}

interface Props<T: any> {
  routes: RouteMap<T>[];
}

const renderRoute = ({ component, path, props }: RouteMap): ReactNode => (
  <Route path={path} component={component} {...props} />
)

const RouteList: SFC<Props> = props => props.routes.map(renderRoute)

export default RouteList
