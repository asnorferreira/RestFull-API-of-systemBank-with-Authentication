import pool from "../../configs/conection.js";

export const deleteTransaction = async (req, res) => {
  const userId = req.usuario.id;
  const { id } = req.params;
  try {
    const sql = "delete from transacoes where id = $1";
    const params = [id];

    const deleteQuery = await pool.query(sql, params);

    return res.status(204).send(deleteQuery);
  } catch (error) {
    console.error("Erro ao excluir transação:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
