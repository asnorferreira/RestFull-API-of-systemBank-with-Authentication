import pool from "../../configs/conection.js";

export const getExtra = async (req, res) => {
    const userId = req.usuario.id;
    const { filtro } = req.query;

    try {
        let query = "SELECT * FROM transacoes WHERE usuario_id = $1";
        const values = [userId];

        if (filtro) {
            const filterArray = Array.isArray(filtro) ? filtro : [filtro];
            query = `
      SELECT * FROM transacoes 
      WHERE 
      usuario_id = $1 AND categoria_id 
      IN (SELECT id FROM categorias 
        WHERE 
        descricao = ANY($2::text[]))`;
            values.push(filterArray);
        }

        const { rows } = await pool.query(query, values);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar transações: ", error);
        res.status(500).json({ mensagem: error.message });
    }
};