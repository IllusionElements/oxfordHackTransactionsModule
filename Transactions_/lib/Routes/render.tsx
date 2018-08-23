/** @format */

import React, { SFC } from 'react'
import { Route, RouteProps } from 'react-router-dom'

export const renderRoute: SFC<RouteProps> = ({ component, path, ...props }) => (
  <Route path={path} component={component} {...props} />
)
