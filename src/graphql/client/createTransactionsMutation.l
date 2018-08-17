mutation create {
  createTransaction($transactions: TransactionInput!) {
    createTransaction(transactions: $transactions)
  }
}