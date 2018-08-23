import { db } from 'meteor/cultofcoders:grapher'
import { Mongo } from 'meteor/mongo'
import { CollectionManager } from './../CollectionManager';
/** @format */
type mixed = (...args: any[]) => any
type DB = {
  [name: string]: Mongo.Collection<{}>
}
const decoratorFactory = (f: mixed) => (_target: any, _propkey: string, descriptors: PropertyDescriptor) => ({
  ...descriptors,
  enumerable: true,
  value: (...args: any[]) => f(descriptors.value(...args)),
})

const resolve = decoratorFactory((collection: Mongo.Collection<{}>) => JSON.stringify(collection))

const decorateProperty = (f: (...args: any[]) => any) => (
  _root: any,
  args: any,
  { db }: { db: any },
  ast: any,
) => f({
  db,
  ast,
  params: args,
})

const mutate = (f: ((...args: any[]) => any)) => decorateProperty(({ params, db }) => f({ params, db }))

const Collections = new CollectionManager(Mongo, db)

export class Query {
  @resolve
  static getCollection(_root: any, { name }: { name: string }, { db }: { db: DB }) {
    const collection = db[name]
    return collection.find({}).fetch()
  }
}


export class Mutation {
  static createCollection = mutate(({ params: { name }}) => {
    Collections.registerCollection(name)
    return JSON.stringify(db[name].find({}).fetch())
  })

  static insertDocument = mutate(({db, params: { name, query }, }: {
    params: any,
    db: DB
  }) => {
    const collection = db[name]
    if(query) {
      return collection.find(JSON.parse(query)).fetch()
    }
    return collection.find({}).fetch()
  })

  static deleteDocument = mutate(({
    db,
    params: {
      _id,
      name
    }
  }) => db[name].remove(_id))
}