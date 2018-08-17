/** @format */
// @flow

import React from 'react'
import { Route } from 'react-router-dom'
import RenderRoute from '/lib/renderRoute'
import Transactions from './Transactions'

type RouteProps<T> = {
  children: React.Node[] | (() => mixed),
  props: T,
}

export default <T>({ children, ...props }: RouteProps<T>) => (
  <Route
    path="/transactions"
    render={RenderRoute({
      Component: Transactions,
      children,
      props,
    })}
  />
)
