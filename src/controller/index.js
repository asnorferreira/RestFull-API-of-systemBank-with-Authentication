import { postLogin } from './users/postLogin.js'
import { postUser } from './users/postUser.js'
import { getUser } from './users/getUser.js'
import { putUser } from './users/putUser.js'
import { getCategories } from './categories/getCategories.js'
import { getTransactions } from './transactions/getTransactions.js'
import { getTransacById } from './transactions/getTransacById.js'
import { postTransaction } from './transactions/postTransaction.js'
import { putTransaction } from './transactions/putTransaction.js'
import { deleteTransaction } from './transactions/deleteTransaction.js'
import { getSummary } from './transactions/getSummary.js'
import { getExtra } from './transactions/getExtra.js'

export default {
    postLogin,
    postUser,
    getUser,
    putUser,
    getCategories,
    getTransactions,
    getTransacById,
    postTransaction,
    putTransaction,
    deleteTransaction,
    getSummary,
    getExtra
}