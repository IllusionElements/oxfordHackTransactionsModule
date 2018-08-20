/* eslint-disable no-underscore-dangle */

const invariant = (msg) => {
  throw new Error(msg)
}

export default class DDPUser {
	linkBounce = false

	invariant = () => invariant('abstract method, please overwrite')

	connected() {
	  return this.invariant()
	}

	disconnected() {
	  return this.invariant()
	}

	setupServerConnectionListeners() {
	  // set some listeners for websocket connection status
	  this.subscriptionClient.onConnected(this._connected)
	  this.subscriptionClient.onReconnected(this._connected)
	  this.subscriptionClient.onDisconnected(this._disconnected)

	  // bounce websocket link in subscription client to reconnect so that our listeners are active
	  console.log('bouncing websocket link')
	  this.linkBounce = true
	  this.subscriptionClient.close(false, false)
	}
}
