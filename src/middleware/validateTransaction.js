import pool from "../configs/conection.js";

export const validateTransaction = async (req, res, next) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;

  if (!tipo || !descricao || !valor || !data || !categoria_id) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res
      .status(400)
      .json({ mensagem: "O tipo deve ser 'entrada' ou 'saida'." });
  }

  const sql = "select * from categorias where id = $1";
  const params = [categoria_id];

  const categoryQuery = await pool.query(sql, params);
  if (categoryQuery.rows.length === 0) {
    return res.status(404).json({ mensagem: "Categoria não encontrada." });
  }

  next();
};
