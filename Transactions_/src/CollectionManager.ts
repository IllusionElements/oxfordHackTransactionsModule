export class CollectionManager {
  constructor(public mongo: Mongo, private collections: { [name: string]: Mongo.Collection }) {}

  public set collection({ name, collection }) {
    if(!Reflect.has(name, this.collections)) {
      Reflect.set(name, collection)
    }
  }

  registerCollection = (name, options = {}) => {
    const collection = new this.mongo.Collection(name)
    this.collection = {
      name,
      collection
    }
  }
}