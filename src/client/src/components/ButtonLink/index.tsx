/** @format */

import React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import to from 'helpers/to'
import { LocationDescriptor } from 'history'

type BtnProps = ButtonProps & { children: React.ReactNode }

interface Props extends BtnProps {
  to: LocationDescriptor
  replace?: boolean
}

export class ButtonLink extends React.PureComponent<Props> {
  render() {
    const { to: linkTo, replace, ...props } = this.props
    return <Button {...props} {...to(linkTo, replace)} />
  }
}
