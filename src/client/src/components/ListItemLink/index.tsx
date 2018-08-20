/** @format */

import React from 'react'
import { ListItem } from '@material-ui/core'
import { ListItemProps } from '@material-ui/core/ListItem'
import { LocationDescriptor } from 'history'
import to from 'helpers/to'

interface Props extends ListItemProps {
  // ListItemProps and LinkProps both define an 'innerRef' property
  // which are incompatible. Therefore the props `to` and `replace` are
  // simply duplicated here.
  to: LocationDescriptor
  replace?: boolean
}

export class ListItemLink extends React.PureComponent<Props> {
  render() {
    const { to: TO, replace, ...props } = this.props
    return <ListItem {...props} {...to(TO, replace)} />
  }
}
