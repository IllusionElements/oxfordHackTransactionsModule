// @flow
import { createDefaultState } from 'lib/createDefaultState'

const createDefaultLoginState = (user: string[]) => (...values) => {
  user: createDefaultState(...user)(...values.slice(0, 2),
  ...createDefaultState('terms')(...values.slice(2))
}

export const setDefaultLoginValues = ['username', 'password']
  |> createDefaultLoginState