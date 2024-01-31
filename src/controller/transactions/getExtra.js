import pool from "../../configs/conection.js";

export const getExtra = async (req, res) => {
  const userId = req.usuario.id;
  const { filtro } = req.query;

  try {
    let query = `
            SELECT
                t.id,
                t.tipo,
                t.descricao,
                t.valor,
                t.data,
                t.usuario_id,
                t.categoria_id,
                c.descricao as categoria_nome
            FROM
                transacoes t
            INNER JOIN
                categorias c ON t.categoria_id = c.id
            WHERE
                t.usuario_id = $1
        `;
    let params = [userId];

    if (filtro && Array.isArray(filtro) && filtro.length > 0) {
      const placeholders = filtro.map((_, index) => `$${index + 2}`).join(", ");
      query += ` AND c.descricao IN (${placeholders})`;
      params = params.concat(filtro);
    }
    const { rows } = await pool.query(query, params);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar transações: ", error);
    res.status(500).json({ mensagem: error.message });
  }
};
