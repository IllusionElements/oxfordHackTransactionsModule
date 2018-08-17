/** @format */

import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {
  import { AccountsServer } from 'meteor/accounts-base'
  import { ValidatedMethod } from 'meteor/mdg:validated-method'

  AccountsServer.prototype.isLoggedIn = function isLoggedIn() {
    return Boolean(this.userId())
  }


  ValidatedMethod.applyMixins = function Mixin(...mixins) {
    const mixinDecorator = mixins.map(({ name, mixin }) => (
      (methodOptions) => {
          methodOptions[name] = mixin // eslint-disable-line
        return methodOptions
      }))

    return options => new ValidatedMethod({
      ...options,
      mixins: [options.mixins, ...mixinDecorator],
    })
  }
})
