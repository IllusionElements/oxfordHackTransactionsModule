import QueryModel from './Query.resolver'
import { TransactionService } from '/src/services'

export { default as TransactionQuery } from './Query.gql'
export const Query = new QueryModel(TransactionService)