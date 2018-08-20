/** @format */

import gql from 'graphql-tag'

export const LoginResolver = async (_, { isLoggedIn: status }, { cache }) => {
  import AccountsLoginStatus from '/src/methods/accounts.loginStatus'

  const { isLoggedIn } = AccountsLoginStatus.callAsync({ status })

  cache.writeData({
    data: {
      isLoggedIn,
    },
  })
}

export const UPDATE_LOGIN_STATUS = gql`
  mutation updateLoginStatus($isLoggedIn: Boolean!) {
    updateLoginStatus($isLoggedIn: $isLoggedIn) @client
  }
`

export const QUERY_LOGIN_STATUS = gql`
  query LoginStatus {
    loginStatus {
      isLoggedIn
    }
  }
`
