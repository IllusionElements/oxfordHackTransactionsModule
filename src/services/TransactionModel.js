/** @format */

export default class TransactionService {
  constructor({ collection }) {
    this.collection = collection
  }

  getTransaction(ast, _id) {
    return this.collection.astToQuery(ast, {
      $filter() {
        this.body._id = _id
      },
    })
  }

  addTransaction(doc) {
    return this.collection.insert(doc)
  }
}
