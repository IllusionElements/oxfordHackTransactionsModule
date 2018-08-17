import MutationModel from './Mutation.resolver'
import { TransactionService } from '/src/services'

export { default as TransactionMutation } from './Mutation.gql'
export const Mutation = new MutationModel(TransactionService)