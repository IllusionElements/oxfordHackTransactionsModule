import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'apollo-react'
import { client } from './config'
import App from './components'

export default (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)