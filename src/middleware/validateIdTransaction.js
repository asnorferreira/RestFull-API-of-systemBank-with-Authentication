import pool from "../configs/conection.js";

export const validateIdTransaction = async (req, res, next) => {
  const userId = req.usuario.id;
  const { id } = req.params;

  const transactionQuery = await pool.query(
    "select * from transacoes where id = $1",
    [id]
  );
  const transaction = transactionQuery.rows[0];

  if (!transaction) {
    return res.status(404).json({ mensagem: "Transação não encontrada." });
  }

  if (transaction.usuario_id !== userId) {
    return res
      .status(403)
      .json({
        mensagem: "Você não tem permissão para atualizar esta transação.",
      });
  }

  next();
};
