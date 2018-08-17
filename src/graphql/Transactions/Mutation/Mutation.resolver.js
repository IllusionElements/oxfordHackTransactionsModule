import { VERIFY_TRANSACTION, LOGIN_STATUS } from '/src/api/constants'
import { verifyTransaction, checkLogin } from '/src/api/actions'
import { mutation } from '/src/lib/decorators/ApolloResolver'

const enumerable = (target, key, descriptor) => {
  descriptor.enumerable = true
}

export default class Mutation {
  constructor(transactionService) {
    Object.assign(Mutation, { transactionService })
  }


  addTransaction = (_, { transaction }, { db: { transactions } }) => {
    console.log('done')
    const $currentDate = {
      dateOfTransaction: {
        $type: "timestamp"
      }
    }
    return transactions.insert({ ...transaction, $currentDate }, (err) => console.error(err))
  }

  @mutation
  removeTransaction = ({ id }, { db: { transactions } }) => {
    return transactions.remove(id)
  }

  @mutation
  updateTransaction = ({ _id, transaction }, { db: { transactions }}) => {
    return transactions.update(_id, transactions)
  }

  @mutation
  changeTransactionType = ({ _id, type }) => {
    return Mutation.transactionService.update({ _id, type })
  }
}
