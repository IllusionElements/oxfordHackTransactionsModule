/** @format */

import { GraphQLScalarType } from 'graphql'
import { EJSON } from 'meteor/ejson'
import { Kind as KIND, ValueNode } from 'graphql/language'

const isValidEJSON = (value: any) => {
  try {
    return EJSON.parse(value)
  } catch (e) {}
  return null
}

const idx = <T>(value: T): T => value

class EJSONScalarType {
  get [Symbol.toStringTag]() {
    return 'EJSON'
  }
  // @ts-ignore
  static name = 'EJSON'

  static description = `
  EJSON is an extension of JSON to support more types. It supports all JSON-safe types, as well as:
    - Date (JavaScript Date)
    - Binary (JavaScript Uint8Array or the result of EJSON.newBinary)
    - User-defined types (For example, Mongo.ObjectID is implemented EJSONScalarType way.)
  `

  static serialize = (value: string) => idx<string>(value)

  static parseValue = (value: string) => isValidEJSON(value)

  static parseLiteral(ast: ValueNode): any {
    switch (ast.kind) {
      case KIND.STRING:
      case KIND.BOOLEAN:
        return ast.value
      case KIND.INT:
        return parseInt(ast.value, 10)
      case KIND.FLOAT:
        return parseFloat(ast.value)
      case KIND.OBJECT: {
        return ast.fields.reduce(
          (AST, { value: field, name: { value } }) => ({
            ...AST,
            [value]: EJSONScalarType.parseLiteral(field),
          }),
          {}
        )
      }
      case KIND.LIST:
        return ast.values.map(n => EJSONScalarType.parseLiteral(n))
      case KIND.NULL:
        return null
      case KIND.VARIABLE: {
        return ast.name.value
      }
      default:
        return undefined
    }
  }
}

export const EJSONResolver = {
  EJSON: new GraphQLScalarType(EJSONScalarType),
}
