import pool from "../../configs/conection.js";

export const postTransaction = async (req, res) => {
  const userId = req.usuario.id;
  const { tipo, descricao, valor, data, categoria_id } = req.body;

  try {
    const sqlPost = `
            insert into transacoes (tipo, descricao, valor, data, usuario_id, categoria_id) 
            values 
            ($1, $2, $3, $4, $5, $6) 
            returning *
        `;
    const paramsPost = [tipo, descricao, valor, data, userId, categoria_id];

    const postQuery = await pool.query(sqlPost, paramsPost);

    const user = postQuery.rows[0];
    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao cadastrar usuário: ", error);
    return res.status(500).json({ mensagem: error.message });
  }
};
