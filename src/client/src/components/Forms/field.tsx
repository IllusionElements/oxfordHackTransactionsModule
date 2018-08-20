/** @format */
// @flow

import React, { SyntheticEvent } from 'react'
import { DocumentNode } from 'graphql'
import TextField from '@material-ui/core/TextField'
import { FieldMutation } from './FormState'

interface Node {
  name: string
}

type Mutator = (e: SyntheticEvent) => void

interface Props {
  form: Node
  field: Node
  query: DocumentNode
  change(mutator: (...args: any[]) => any): Mutator
}

export class Field extends React.PureComponent<Props> {
  update = (cache: any, data: any) => {
    const {
      form: { name: formName },
      field: { name: fieldName },
      query,
    } = this.props
    cache.writeQuery({
      query,
      data: {
        [formName]: {
          [fieldName]: data[formName][fieldName],
        },
      },
    })
  }

  renderMutation = (name: string, { mutate }: any) => (
    <TextField label={name} onChange={this.props.change(mutate)} />
  )

  render() {
    const {
      form: { name: formName },
      field: { name: fieldName },
    } = this.props
    return (
      <FieldMutation update={this.update} form={formName} field={fieldName}>
        {this.renderMutation}
      </FieldMutation>
    )
  }
}
