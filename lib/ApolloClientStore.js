/** @format */
import { List } from './List'
const getType = (resolverType, ctx) =>
  ctx[resolverType].toArray().reduce(
    (Mutation, mutation) => ({
      ...Mutation,
      ...mutation,
    }),
    {}
  )

type Resolver = (obj: any, args: any, cache: any) => void

interface FieldResolver {
  [field: string]: Resolver
}

const MUTATION = 'Mutation'
const QUERY = 'Query'
const DEFAULTS = 'Defaults'
type Alias = {
  key: string,
  bound: boolean
}

const bind = (ctx, f) => f::ctx
const alias = ({
  key,
  bound,
}: Alias) => (ctx, key, descriptor) => {
  const { initalizer = null, value = null, ...descriptors } = descriptor
  Reflect.deleteProperty(ctx, key)
  Reflect.defineProperty(ctx, key, {
    ...descriptors,
    value: bound ? bind(ctx, ctx[key]):ctx[key]
  })
}

export class ApolloStore {
  stores = new Map()

  Mutation = new List<FieldResolver>()

  Query = new List<FieldResolver>()

  Defaults = new List<FieldResolver>()

  constructor(cache) {
    this.cache = cache
  }

  resolve = withClientState => {
    const { mutations, queries, defaults, cache } = this
    return withClientState({
      cache,
      defaults,
      resolvers: {
        Mutation: mutations,
        Query: queries,
      },
    })
  }

  @bound
  addStore<T>(Store: T) {
    const store = new Store(this.cache)
    this.stores.set(name, store)
  }

  @alias({
      key: 'addStore',
      bound: true,
    })
  registerStore = () => ''

  registerStores = () => {
    this.stores.forEach(({ mutation, query, defaults }) => {
      this.Mutations.add(mutation)
      this.Query.add(query)
      this.Defaults.add(defaults)
    })
  }

  get mutations() {
    return getType(MUTATION, this)
  }

  get queries() {
    return getType(QUERY, this)
  }

  get defaults() {
    return getType(DEFAULTS, this)
  }
}

const getter = (f: (...args: any[]) => mixed) => {
  return (ctx, propKey) => {
    Reflect.delete(ctx, propKey)
    Reflect.defineProperty(ctx, propKey, {
      get: function meta() {
        return f(ctx, propKey)
      },
      enumerable: true,
    })
  }
}

const getMetadata = (ctx, type) => ctx.metadata.get(type)

const metadataGetter = getter(getMetadata)

class Store {
  [field: string]: any

  metadata = new Map()


  @metadataGetter mutation = () => ''

  @metadataGetter defaults = () => ''

  @metadataGetter query = () => ''
}

// functional version

export const createApolloStore = (cache, stores: Store[]) => {
  const apolloStore = new ApolloStore(cache)

  stores.forEach(store => (
    apolloStore.registerStore(store)
  ))

  apolloStore.registerStores()

  return withClientState => apolloStore.resolve(withClientState)
}