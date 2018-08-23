/** @format */

import React from 'react'

type InjectType = 'props' | 'state' | 'class'

const decorate = (cb: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => cb(target, propertyKey, descriptor)

function injectDecorator(this: any, value: any, type: InjectType) {
  switch (type) {
    case 'props':
      return value(this.props)
    case 'state':
      return value(this.state)
    case 'class': {
      const { ...props } = this.props as object
      const { ...state } = this.state as object
      return value({ props, state })
    }
    default:
      return value(this)
  }
}

export const inject = function injector(type: InjectType = 'props') {
  const decorator = function (
    target: React.ComponentType,
    _key: 'render',
    descriptor: PropertyDescriptor,
  ) {
    return {
      ...descriptor,
      value() {
        const value = descriptor.value.bind(target)
        return injectDecorator(value, type)
      },
    }
  }

  return decorate(decorator)
}
