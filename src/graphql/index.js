import { load } from 'graphql-load'
import { typedefs, TransactionResolver as resolvers } from './Transactions/Transactions.resolver'
import Node from './node.gql'
import TransactionSchema from './Transactions/transaction.gql'

const { Query } = resolvers

export const TransactionResolver = {
  typeDefs: [Node, TransactionSchema, ...typedefs],
  resolvers: {
    ...resolvers,
    Query: {
      ...Query,
      allTransactions: (_, arg, { db }, ast) => {
        const database = db
        const ctx = { db: database }
        try {
          const query = Query.allTransactions(arg, ctx, ast)
          console.log(query)
        } catch (e) {
          console.error(e)
        }
        return db.transactions.astToQuery(ast).fetch()
      },
    },
    Node: {
      __resolveType: obj => obj._id,
    },
  },
}

export { default as UserResolver } from './User/User.resolver'
