// const handleRunListeners = (iterator, payload) => {
//   const { value: listener, done } = iterator.next()
//   if(typeof listener === 'function') {
//     listener(payload)
//   }

//   const cb = () => handleRunListeners(iterator, payload)

//   if(done) return;

//   if(Meteor) {
//     return Meteor.setTimeout(cb, 5)
//   }

//   try {
//     if(this === global) {
//       return process.nextTick(()=> handleRunListeners(iterator, payload))
//     }
//   } catch(e) {

//       return window.setTimeout(cb, 5)
//     }
//   }


// class ServerManager {
//   _listeners = new Map()

//   microservices = new Map()

//   // registerMicroservice(name, { db, resolvers }) {
//   //   this.microservices.set(name, { db })
//   //   import('graphql-load').then(({ load }) =>
//   //     load(resolvers)
//   //   )
//   // }

//   // findMicroservice(name) {
//   //   return this.microservices.get(name)
//   // }

//   // registerNewCollection(name) {
//   //   import { Mongo } from 'meteor/mongo'
//   //   const db = new Mongo.Collection(name)
//   //   this.microservices.set(name, { db })
//   //   return db
//   // }

//   // registerSchema(name, schema) {
//   //   import SimpleSchema from 'simpl-schema'

//   //   const Schema = new SimpleSchema(schema)

//   //   this.microservices.get(name).db.attachSchema(Schema)
//   // }

//   subscribe = (listener) => {
//     // const id = JSON.stringify(new Mongo.ObjectID())
//     this._listeners.set(this._listeners.size, listener)
//     return () => this._listeners.delete(id)
//   }


//   dispatch = (payload) => {
//     handleRunListeners(this._listeners.values(), payload)
//   }
// }
// const [{ entries, defineProperties: define }, { has }] = [Object, Reflect]
// const Enum = (fields) => entries(fields)
//   .reduce((_enum, [key, value], i)=>{
//     if(value === 1) {
//       define(_enum, {
//         [i]: {
//           value: key,
//           enumerable: false,
//         },
//          [key]: {
//           get() {
//             return key
//           },
//           enumerable: true
//       }
//       })
//     } else {
//       _enum[key] = has(value, 'value') && value.value
//     }
//     return _enum
//   },{})