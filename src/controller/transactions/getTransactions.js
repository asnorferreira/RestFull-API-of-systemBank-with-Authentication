import pool from '../../configs/conection.js'

export const getTransactions = async (req, res) => {
    const userId = req.usuario.id;
    try {
        const query = `
            select
                t.id,
                t.tipo,
                t.descricao,
                t.valor,
                t.data,
                t.usuario_id,
                t.categoria_id,
                c.descricao AS categoria_nome
            from
                transacoes t
            inner join
                categorias c on t.categoria_id = c.id
            where
                t.usuario_id = $1
        `;
        const params = [userId];
        const { rows } = await pool.query(query, params);
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao listar transações: ", error);
        res.status(500).json({ mensagem: error.message });
    }
};