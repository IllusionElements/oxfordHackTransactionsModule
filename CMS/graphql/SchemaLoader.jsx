// class Observable {
//   constructor(observer) {
//     if (observer) {
//       this.observer = observer
//     }
//   }

//   observer = ({ next, error, complete }) =>
//     setTimeout(() => Promise.resolve(next()).then(() => complete()), 2000)

//   subscribe = ({ next, error, complete }) => {
//     return this.observer({ next, error, complete })
//   }

//   map = mapper =>
//     new Observable(observer =>
//       this.subscribe({
//         next: val => observer.next(mapper(val)),
//         error: e => observer.error(e),
//         complete: observer.complete()
//       })
//     )

//     mergeMap(anotherFunctionThatThrowsValues) {
//       return new Observable(observer => {
//         return this.subscribe({
//           next(val) {
//             anotherFunctionThatThrowsValues(val).subscribe({
//               next(val) { observer.next(val) },
//               error(e) { observer.error(e) } ,
//               complete() { observer.complete() }
//             });
//           },
//           error(e) { observer.error(e) } ,
//           complete() { observer.complete() }
//         });
//       });
//   }

//   unsubscribe = observer => observer.complete()
// }

Symbol.Observable = Symbol("@@Observable")
class Observable {
  constructor(watch) {
    this[Symbol.Observable] = watch
    this._initialValue = watch().value()
  }

  subscribe = (observer, time = 2000) => {
    const interval = setInterval(() => {
      const { value } = this.watch()
      if (this._initialValue !== value()) {
        observer.next({
          observable: this.watch(),
          initial: this._initialValue
        })
      }
    }, time)
    return () => clearInterval(interval)
  }
}
export class SchemaLoader {
  schema = new Set()

  schemas = new Observable(() => ({
    value: () => this.schema.size,
    observable: () => [...this.schema][this.schema.size - 1]
  }))

  subscribed = false

  constructor(load) {
    this.subscribe = () => {
      if (this.subscribed === false) {
        this.subscribed = true
      }
      this.schemas.subscribe(
        {
          next: ({ observable: { observable } }) => {
            const { schema } = observable()
            load({ ...schema })
          }
        },
        5000
      )
    }
  }

  load = schema => {
    if (!this.subscribed) {
      this.unsubscribe = this.subscribe()
    }
    this.schema.add({ schema })
  }

  run = getSchema => makeExecutableSchema(getSchema())
}
import { load } from "meteor/cultofcoder:graphql-load"
export const ApolloSchemaLoader = new SchemaLoader(load)

import { BrowserRoute } from "react-router-dom"
import { Mutation } from "react-apollo"
const compose = (value, f, g) => f(g(value))
const pipe = x => (f, ...g) =>
  !f
    ? x
    : compose(
        x,
        pipe,
        f
      )(...g)

// class MutationWrapper extends React.PureComponent {
//   mutationRender = (mutate, mutationProps) => {
//     const { children } = this.props
//     const { Children, cloneElement } = React
//     return cloneElement(Children(children), {
//       mutate: mutate,
//       ...mutationProps
//     })
//   }

//   render() {
//     const { update } = this.props
//     return (
//       <Mutation mutation="" update={update}>
//         {this.mutationRender}
//       </Mutation>
//     )
//   }
// }

const formMutation = gql`
  input possibleDataTypes {
    data: string
    results: boolean
  }

  mutation updateFormValues(
    $formName: string
    $field: string
    $data: possibleDataTypes
  ) {
    updateForm(form: $formName, field: $field, data: $data) {
      __typeName
    }
  }
`
class ApolloFormMutation extends React.Component {
  onChange = type => e => {
    const { mutate } = this.props
    const {
      target: { value }
    } = e
    mutate({
      [type]: value
    })
  }

  mapFields = ({ name, ...props }) => (
    <TextField
      key={name}
      label={name}
      onChange={this.onChange(name)}
      {...props}
    />
  )

  renderField = fields => {
    const stringField = fields.map(JSON.stringify)
    const stringSet = new Set(stringField)
    return [...stringSet].map(this.mapFields)
  }

  renderMappedFields = fields => this.mapFields(this.renderField(fields))

  render() {
    const { fields, handleSubmit } = this.props
    return (
      <>
        {fields.map(this.renderField(fields))}
        <Button onSubmit={handleSubmit}>Submit</Button>
      </>
    )
  }
}

const mutator = (mutate, formName) => field =>
  mutate({
    variables: {
      data: {
        [formName]: {
          ...field
        }
      }
    }
  })
const withMutation = (props, formName) => (mutate, mutationProps) => (
  <ApolloFormMutation
    mutate={mutate}
    mutationProps={mutationProps}
    {...props}
  />
)

export default ({ update, ...props }) => (
  <Mutation update={update} mutation={formMutation}>
    {withMutation(props)}
  </Mutation>
)
