/** @format */

import AsyncValidatedMethod from '/lib/callPromiseMixin'

const cache: Map = new Map()

export default new AsyncValidatedMethod({
  name: 'accounts.loginStatus',
  async run({ status }) {
    if (status && status === cache.get('status')) {
      return cache.get('status')
    }
    import { Accounts } from 'meteor/accounts-base'

    const isLoggedIn = Accounts.isLoggedIn()

    cache.set('status', { isLoggedIn })

    return { isLoggedIn }
  },
})
