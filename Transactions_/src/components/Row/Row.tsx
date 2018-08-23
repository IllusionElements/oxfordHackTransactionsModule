/** @format */

import React, { Component, ComponentType } from 'react'
import { Grid } from '@material-ui/core'
import { GridProps } from '@material-ui/core/Grid'

interface RowProps {
  gridProps?: GridProps[],
  children: ComponentType[]
}

type Union<T, P> = T & P

type Spread = {
  children?: React.ReactChild,
  gridProps?: GridProps[],
  [prop: string]: any,
}

export class Row<Props extends object = {}> extends Component<Union<RowProps, Props>, {}> {
  __index: number = 0

  renderChildren = (gridProps?: GridProps[], extraProps?: Props) => (child: React.ReactChild, i: number) => {
    if(!gridProps) {
      return <Grid key={JSON.stringify(child)} direction='row' item>{child}</Grid>
    }

    if(gridProps && gridProps[i]) {
      this.__index = i
      return (
        <Grid key={JSON.stringify(child)} direction='row' {...gridProps[i]} item>
          {React.cloneElement(child as React.ReactElement<Props>, extraProps)}
        </Grid>
      )
    }
    const props = gridProps[this.__index]
    return props.direction ? (
      <Grid key={JSON.stringify(child)} {...props} item>
        {child}
      </Grid>
    ):(
      <Grid key={JSON.stringify(child)} {...props} direction='row' item>
        {React.cloneElement(child as React.ReactElement<Props>, extraProps)}
      </Grid>
    )

  }

  render() {
    const { children, gridProps, ...props } = this.props as Spread
    return React.Children.map(children, this.renderChildren(gridProps, props as Props))
  }
}
