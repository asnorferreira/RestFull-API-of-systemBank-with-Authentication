import pool from "../../configs/conection.js";

export const getTransacById = async (req, res) => {
    const userId = req.usuario.id;
    const transactionId = req.params.id;
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
                c.descricao as categoria_nome
            from
                transacoes t
            inner join
                categorias c on t.categoria_id = c.id
            where
                t.id = $1 and t.usuario_id = $2
        `;
        const params = [transactionId, userId];
        const { rows } = await pool.query(query, params);
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Erro ao obter transação: ", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};
