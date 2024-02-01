import express from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

const router = express();

router.post("/login", controller.postLogin);

router.post(
  "/usuario",
  middleware.validateUsers,
  middleware.validateEmail,
  controller.postUser
);

router.use(middleware.verifyAuth);

router.post(
  "/transacao",
  middleware.validateTransaction,
  controller.postTransaction
);

router.get("/usuario", controller.getUser);
router.get("/categorias", controller.getCategories);
router.get("/transacao", controller.getTransactions);
router.get("/extra", controller.getExtra);
router.get("/transacao/extrato", controller.getSummary);
router.get("/transacao/:id", controller.getTransacById);

router.put("/usuario", middleware.validateUsers, controller.putUser);
router.put(
  "/transacao/:id",
  middleware.validateTransaction,
  middleware.validateIdTransaction,
  controller.putTransaction
);

router.delete(
  "/transacao/:id",
  middleware.validateIdTransaction,
  controller.deleteTransaction
);

export default router;
