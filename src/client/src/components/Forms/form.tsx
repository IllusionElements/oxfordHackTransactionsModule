/** @format */
// @flow

import React, { ReactNode as Node, SyntheticEvent } from 'react'
import { DocumentNode } from 'graphql'
import { Field } from './field'

interface iField {
  name: string
  query: DocumentNode
}
interface Props {
  mutation: DocumentNode
  name: string
  fields: iField[]
}

interface State {
  sample: string
}

type GenericObject<T = any> = {
  [field: string]: T
}
export class Form extends React.Component<Props, State> {
  onChange = (fieldName: string) => (
    setState: (
      {
        variables,
      }: {
        variables: GenericObject<GenericObject<string>>
      }
    ) => any
  ) => (e: SyntheticEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = e
    const { name } = this.props
    const variables = {
      [name]: {
        [fieldName]: value,
      },
    }

    setState({ variables })
  }

  Mutate = ({ fields, form }: { fields: iField[]; form: string }) =>
    fields.map<Node>(({ name, query }) => (
      <Field
        key={JSON.stringify(query)}
        form={{ name: form }}
        field={{ name }}
        change={this.onChange(name)}
        query={query}
      />
    ))

  renderMutation = (formMutation: any) => {
    const { Mutate } = this
    return (
      <>
        <Mutate fields={fields} form={name} />
        <Button onClick={formMutation}>Login</Button>
      </>
    )
  }

  render() {
    const { fields, name, mutation } = this.props
    return (
      <React.Fragment>
        <Mutation mutation={mutation}>{this.renderMutation}</Mutation>
      </React.Fragment>
    )
  }
}
