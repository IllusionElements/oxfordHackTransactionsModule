// @flow
import type { Mixed } from '../../../flowtyped/mixed.flow'
import type { PropertyDescriptor } from '../../../flowtyped/PropertyDescriptor.flow'
type TypeEnum = 'class' | 'property' | 'method'

export default (type: TypeEnum, f: Mixed) => (target: any, propertyKey?: string, descriptor?: PropertyDescriptor): void | PropertyDescriptor => {
  switch(type) {
    case 'class': {
      const { name } = target.constructor
      return f({ [name]: target })
    }
    case 'method': return f({ target, propertyKey, descriptor })
    case 'property': return f({ target, propertyKey })
    default: return descriptor
  }
}
