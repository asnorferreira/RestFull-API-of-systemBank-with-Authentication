import pool from '../../configs/conection.js'

export const getCategories = async (req, res) => {
    try {
        const sql = "select * from categorias";

        const getQuery = await pool.query(sql);
        const categories = getQuery.rows;

        return res.status(200).json(categories);
    } catch (error) {
        console.error("Erro ao listar categorias: ", error);
        res.status(500).json({ mensagem: error.message });
    }
}