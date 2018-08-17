/** @format */
// @flow

import AsyncValidatedMethod from '/lib/callPromiseMixin'

type cacheArg = { [key: string]: boolean }

const cache: Map<string, cacheArg> = new Map()

export default new AsyncValidatedMethod({
  name: 'accounts.loginStatus',
  async run({ status }: { status: boolean }) {
    if (status && status === cache.get('status')) {
      return cache.get('status')
    }
    import { Accounts } from 'meteor/accounts-base'

    const isLoggedIn = Accounts.isLoggedIn()

    cache.set('status', { isLoggedIn })

    return { isLoggedIn }
  },
})
