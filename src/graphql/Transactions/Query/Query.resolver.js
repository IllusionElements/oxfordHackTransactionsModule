export default class Query {
  constructor(transactionService) {
    Query.TransactionService = transactionService
  }

  transaction = (_, { id }, { db }, ast) => {
    const args = { _id: id }
    const query = db.transactions.astToQuery(ast, {
      embody({ body, getArgs }) {
        Object.assign(body.$filters, args)
      }
    }).fetch()
    return query[0]
  }

  allTransactions({ _id }, { db }, ast) {
    console.log(db)
    const query = db.transactions.astToQuery(ast)
    console.log(query)
    return query.fetch()
  }

  transactionAmount(_, { amount }, { db }, ast) {
    return db.astToQuery(ast, {
      $filters() {
        this.body.amount = amount
      }
    })
  }
}
