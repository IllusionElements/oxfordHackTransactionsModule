/** @format */

import SimpleSchema from 'simpl-schema'
import Schema from './schema'
import Transactions from './collection'

Transactions.attachSchema(Schema(SimpleSchema))

export { Transactions }
