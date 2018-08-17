/** @format */
import React from 'react'
import type { Node } from '/flowtyped/Node.flow'
import type { GraphQLAST } from '/flowtyped/graphqlAST.libdef'

interface Data {
  loginStatus: boolean;
}

interface RouteProps {
  loading: boolean;
  error: boolean;
  data: Data;
}

type getNameType = (target: React) => Node

export default ({
  name: getName,
  query,
  Query,
}: {
  name: getNameType,
  query: GraphQLAST,
  Query: Node,
}) => {
  const LoginStatusSFC = Component => class LoginStatus extends React.PureComponent<any> {
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
        return <Query query={query}>{this.PrivateRoute}</Query>
      }
  }
  return LoginStatusSFC
}
