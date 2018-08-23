/** @format */

import React from 'react'
import gql from 'graphql-tag'

const GET_COLLECTIONS = gql`
  query CollectionList {
    getCollections {
      _id
      name
    }
  }
`
