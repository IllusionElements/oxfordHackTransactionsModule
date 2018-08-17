/** @format */
import { ValidatedMethod } from 'meteor/mdg:validated-method'

const CallPromiseMixin = {
  name: 'callPromise',
  mixin: function callAsync(args) {
    return new Promise((resolve, reject) => {
      this.call(args, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
}

export default ValidatedMethod.applyMixin(CallPromiseMixin)
