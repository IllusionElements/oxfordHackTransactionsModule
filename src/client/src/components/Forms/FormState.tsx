/** @format */

import React, { ComponentType } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const FORM_STATE_MUTATION = gql`
  mutation setFormState($form: String!, $field: String!, $data: String!) {
    saveFormValue(formName: $form, fieldName: $field, data: $data) @client
  }
`
type Mutator = ((...args: any[]) => any)

interface FieldMutationProps<T> {
  form?: string
  field?: string
  data?: T
  children: Mutator
  update?: Mutator
}
class MutationField<T> extends Mutation<any, Partial<FieldMutationProps<T>>> {}

export class FieldMutation<T> extends React.Component<FieldMutationProps<T>> {
  render() {
    const { form, field, data, children, update } = this.props
    const variables = {
      form,
      field,
      data: JSON.stringify(data),
    }
    return (
      <MutationField
        mutation={FORM_STATE_MUTATION}
        variables={variables}
        update={update}
      >
        {children}
      </MutationField>
    )
  }
}
