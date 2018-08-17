import { VERIFY_TRANSACTION, LOGIN_STATUS } from './constants'
import actionCreator from './actionCreator'

const verifyTransaction = actionCreator(VERIFY_TRANSACTION)
const checkLogin = actionCreator(LOGIN_STATUS)