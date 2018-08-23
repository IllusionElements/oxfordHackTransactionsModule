/** @format */

declare module 'meteor/cultofcoders:grapher' {
  import { Mongo } from 'meteor/mongo'

  type DB = {
    [name: string]: Mongo.Collection<{}>
  }
  export const db: DB
}
