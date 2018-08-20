/** @format */

import { load } from 'graphql-load'
import { initAccounts } from 'meteor/cultofcoders:apollo-accounts'
import { TransactionResolver, UserResolver } from '../../graphql'

const socialMedia = 'facebook,google,linked.in'
const capitalize = ([ head, ...tail ]) => `${head.toUpperCase()}${tail.join('')}`
const logins = socialMedia.split(',').map((k) => k.split('.')).reduce((sm, key) => {
	if (Array.isArray(key)) {
		const name = key.map((k) => capitalize(k)).join('')
		return {
			...sm,
			[`loginWith${name}`]: false
		}
	}
	return {
		...sm,
		[`loginWith${key}`]: false
	}
}, {})

load(
	initAccounts({
		loginWithPassword: true,
		...logins
	})
)

load(TransactionResolver)
const { Query, ...rest } = UserResolver
load({ ...rest, Query: { ...Query } })
