/** @format */

import { GraphQLScalarType } from 'graphql'
import { Kind, ValueNode } from 'graphql/language'

function identity(value: any): any {
  return value
}

function parseLiteral(ast: ValueNode): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)
    case Kind.OBJECT: {
      const value = Object.create(null)
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value)
      })

      return value
    }
    case Kind.LIST:
      return ast.values.map(n => parseLiteral(n))
    case Kind.NULL:
      return null
    case Kind.VARIABLE:
      return ast.name.value
    default:
      return undefined
  }
}

export const JSONScalar = new GraphQLScalarType({
  parseLiteral,
  name: 'JSON',
  description:
    'The `JSON` scalar type represents JSON values as specified by '
    + '[ECMA-404](http://www.ecma-international.org/'
    + 'publications/files/ECMA-ST/ECMA-404.pdf).',
  serialize: identity,
  parseValue: identity,
})
