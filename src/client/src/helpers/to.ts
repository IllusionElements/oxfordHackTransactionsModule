/** @format */

import { Link } from 'react-router-dom'
import { LocationDescriptor } from 'history'

export default (to: LocationDescriptor, replace?: boolean) => ({
  to,
  component: Link as any,
  replace,
})
