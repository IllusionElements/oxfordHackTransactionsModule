// @flow
import decoratorFactory from './decoratorFactory'
type EnumType = 'mutation' | 'query'
const apolloResolver =  (type: string) => decoratorFactory('method', ({ target, propertyKey, descriptor })=> {
  const { value } = descriptor
  const resolver = (handler: (...any[])=>mixed) => (root: any, args: any, ctx: any, ast: any) => {
    if(type === 'mutation') {
      return handler(args, ctx)
    } else if(type === 'query') {
      return handler(args, ctx, ast)
    }
    return handler(root, args, ctx, ast)
  }

  return {
    ...descriptor,
    value: resolver(value.bind(target))
  }
})

export const mutation = (target: any, key: string, descriptors: any) => {
  const value = descriptors.initializer()
  descriptors.initializer = () => (_, args, ctx, ast) => {
      console.log('ran')
      const context = ctx
      const arg = args
      return value(arg, context)
  }
}

export const query = apolloResolver('query')