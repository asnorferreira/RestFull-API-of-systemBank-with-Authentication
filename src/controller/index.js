import { postLogin } from './users/postLogin.js'
import { postUser } from './users/postUser.js'
import { getUser } from './users/getUser.js'
import { putUser } from './users/putUser.js'
import { getCategories } from './categories/getCategories.js'
import { getTransactions } from './transactions/getTransactions.js'
import { getTransacById } from './transactions/getTransacById.js'
import { postTransaction } from './transactions/postTransaction.js'

export default {
    postLogin,
    postUser,
    getUser,
    putUser,
    getCategories,
    getTransactions,
    getTransacById,
    postTransaction,
}