import Transaction from '/src/db/collection'
import TransactionModel from './TransactionModel'

export const TransactionService = new TransactionModel({ collection: Transaction })