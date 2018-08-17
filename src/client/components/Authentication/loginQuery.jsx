/** @format */
// @flow
import React from 'react'
import gql from 'graphql-tag'

const IS_LOGGED_IN = gql`
  query getLoginStatus @client {
    loginStatus
  }
`

interface Data {
  loginStatus: boolean;
}

interface RouteProps {
  loading: boolean;
  error: boolean;
  data: Data;
}

export default (Component) => {
  // $FlowFixMe
  import getName from '/lib/getName'

  class LoginStatus extends React.PureComponent {
    static displayName = getName(Component)

    PrivateRoute = ({ loading, error, data: { loginStatus } }: RouteProps) => {
      if (loading) {
        return <h1>...Loading</h1>
      }

      if (error) {
        return <h1>Error</h1>
      }

      return <Component status={loginStatus} {...this.props} />
    }

    render() {
      import { Query } from 'react-apollo'

      return <Query query={IS_LOGGED_IN}>{this.PrivateRoute}</Query>
    }
  }
  return LoginStatus
}
