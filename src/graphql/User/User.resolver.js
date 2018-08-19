import { load } from 'meteor/cultofcoders:apollo'
import User from './User.gql'
/* eslint-disable */
class UserAccounts {
	static typeDefs = [ User ]
	static Query = class Query {
		static getUser = (root, { args }, { userId }) => Meteor.users.findOne(userId)
	}
}

export default UserAccounts
