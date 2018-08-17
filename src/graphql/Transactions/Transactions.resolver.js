import { Query, TransactionQuery } from './Query'
import { Mutation, TransactionMutation } from './Mutation'

export const typedefs = [TransactionQuery, TransactionMutation]

export class TransactionResolver {
  static Query = Query
  static Mutation = Mutation
}