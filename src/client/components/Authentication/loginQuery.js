/** @format */
import gql from 'graphql-tag'

const IS_LOGGED_IN = gql`
  query getLoginStatus @client {
    loginStatus
  }
`

export default (Component) => {
  import getName from '/lib/getName'
  import { Query } from 'react-apollo'
  import LoginStatus from './loginStatus'

  return LoginStatus({ name: getName, query: IS_LOGGED_IN, Query })(Component)
}
