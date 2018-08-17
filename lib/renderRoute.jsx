/** @format */

import React from 'react'

const renderRoute = ({ Component, children, props }) => <Component {...props}>{children}</Component>

export default renderRoute
