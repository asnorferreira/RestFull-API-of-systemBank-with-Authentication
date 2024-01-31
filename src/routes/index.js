import express from 'express'
import controller from '../controller/index.js'
import middleware from '../middleware/index.js'

const router = express();

router.post('/login', controller.postLogin)

router.use(middleware.verifyAuth);

router.post('/usuario',
    middleware.validateUsers,
    middleware.validateEmail,
    controller.postUser)
router.post('/transacao',
    middleware.validateTransaction,
    controller.postTransaction)

router.get('/usuario', controller.getUser)
router.get('/categorias', controller.getCategories)
router.get('/transacao', controller.getTransactions)
router.get('/transacao/:id', controller.getTransacById)

router.put('/usuario', middleware.validateUsers, controller.putUser)

export default router;

