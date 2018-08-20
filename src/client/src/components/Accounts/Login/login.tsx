/** @format */
// @flow

import React, { Component, ComponentType } from 'react'
import { Mutation } from 'react-apollo'
import { Route } from 'react-router-dom'
import { TextField, Grid, Typography } from '@material-ui/core'
import { ButtonLink } from '../../ButtonLink'
import { Map } from 'immutable'
import { DocumentNode } from 'graphql'

// helpers
export type $Values<K, U = K[$Keys<K>]> = U
export type $Keys<T> = keyof T
export type $Union<T, V> = T | V
export type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
export type RenderProps = (...args: any[]) => React.ComponentType

interface LoginProps {
  errorComponent: ComponentType
  query: DocumentNode
  children: ComponentType | (() => ComponentType)
}

type User = {
  username: string
  password: string
}

interface Form {
  name: string
  map: tForm
  updateUser: (e: ChangeEvent) => void
}

const FormElement = ({ name, map, updateUser }: Form) => (
  <Grid item>
    <TextField
      label={name}
      value={map.getIn(map, ['user', name])}
      onChange={updateUser}
    />
  </Grid>
)

type Terms = Map<'checked', Boolean>

type tUser = Map<$Keys<User>, string>

type FormKeys = $Union<'user', 'checked'>

type FormValues = $Union<tUser, Terms>

type tForm = Map<FormKeys, FormValues>

interface State {
  error: boolean
  form: tForm
}

interface Render {
  form: State['form']
  fields: string[]
}
export class LoginForm extends Component<LoginProps, State> {
  state = {
    error: false,
    form: Map({
      user: Map({
        username: '',
        password: '',
      }) as tUser,
      terms: Map({
        checked: false,
      }) as Terms,
    }) as tForm,
  }

  onClick = ({ event, mutate }: { event: string; mutate: any }) => () => {
    if (event === 'checkTerms') {
      this.setState(({ form, ...state }) => ({
        ...state,
        form: form.updateIn(
          ['terms', 'isChecked'],
          (isChecked: boolean) => !isChecked
        ),
      }))
    } else {
      const { form } = this.state
      const variables = form.get('user').toJS()
      mutate({
        variables,
      })
    }
  }

  updateUser = (key: string) => (e: ChangeEvent) => {
    const { value } = e.target
    this.setState(({ form, ...s }) => ({
      ...s,
      form: form.updateIn(['user', key], () => value),
    }))
  }

  renderComponent = ({ form, fields }: Render) => (login: any) => (
    <>
      <Grid item xs={12}>
        <Typography>Login</Typography>
      </Grid>
      {fields.map(field => (
        <FormElement
          name={field}
          key={field}
          map={form}
          updateUser={this.updateUser(field)}
        />
      ))}
      <ButtonLink onClick={this.onClick(login)} to="/dashboard">
        Login
      </ButtonLink>
    </>
  )

  render() {
    const { query } = this.props
    const fields = {
      ...this.state,
      fields: ['username', 'password'],
    }
    return (
      <Route path="/login">
        <Grid container>
          <Mutation mutation={query}>{this.renderComponent(fields)}</Mutation>
        </Grid>
      </Route>
    )
  }
}
