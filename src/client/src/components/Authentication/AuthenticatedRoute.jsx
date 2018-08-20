/** @format */

// @flow
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import checkLoginStatus from './loginQuery'

type User = {
  username: string,
}

interface iAuthenticationProps {
  status: boolean;
  children: React.Node[];
}

const AccountContext = React.createContext(null)

const { Consumer } = AccountContext

@checkLoginStatus
export class AuthenticatedRoute extends React.Component<iAuthenticationProps, {}> {
  componentDidMount() {
    import('meteor/meteor').then(({ Meteor }) => {
      const { status } = this.props
      if (status) {
        this.user = Meteor.user()
      }
    })
  }

  user: User

  renderRoute = () => {
    const { status, children } = this.props
    const { user } = this
    const { Provider } = AccountContext
    return status ? <Provider value={user}>{children}</Provider> : <Redirect to="/login" />
  }

  render() {
    return <Route render={this.renderRoute} />
  }
}

export const AccountsConsumer = Consumer
