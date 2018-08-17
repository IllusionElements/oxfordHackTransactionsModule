query transactionById($id: ID!) {
  transactions(_id: $id) {
    _id
    name
    type
    amount
    store
  }
}