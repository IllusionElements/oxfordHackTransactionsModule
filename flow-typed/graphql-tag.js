/** @format */

// @flow

declare module 'graphql-tag' {
  import type { DocumentNode } from 'graphql'

  declare export default function gql(
    literals: any,
    ...placeholders: any[]
  ): DocumentNode
}
