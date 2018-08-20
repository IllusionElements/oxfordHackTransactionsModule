import User from './User.gql'
/* eslint-disable */
class UserAccounts {
	static typeDefs = [ User ]
	static Query = class Query {
		static getUser = (root, { args }, { userId }) => {
			console.log({ args, userId, user: Meteor.users.findOne(userId) })
			return Meteor.users.findOne(userId)
		}
	}
}

export default UserAccounts
