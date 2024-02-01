import pool from "../../configs/conection.js";

export const putTransaction = async (req, res) => {
  const userId = req.usuario.id;
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  try {
    const query = `update transacoes 
        set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 
        where id = $6 
        returning *
        `;
    const params = [descricao, valor, data, categoria_id, tipo, id];

    const putQuery = await pool.query(query, params);
    const putTransaction = putQuery.rows[0];

    return res.status(204).json(putTransaction);
  } catch (error) {
    console.error("Erro ao atualizar dados: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
