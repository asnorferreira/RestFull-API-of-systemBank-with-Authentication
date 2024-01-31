import pool from "../../configs/conection.js"
import bcrypt from "bcrypt"

export const putUser = async (req, res) => {
    const userId = req.usuario.id;
    const { nome, email, senha } = req.body;
    try {

        const otherSql = "select * from usuarios where email = $1 and id != $2";
        const otherParams = [email, userId];

        const emailQuery = await pool.query(otherSql, otherParams);

        if (emailQuery.rows.length > 0) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        const ecryPass = await bcrypt.hash(senha, 10);

        const query =
            "update usuarios set nome = $1, email = $2, senha = $3 where id = $4 returning *";
        const params = [nome, email, ecryPass, userId];

        const putQuery = await pool.query(query, params);
        const putUser = putQuery.rows[0];

        if (putQuery.rows.length === 0) {
            return res.status(404).json({ message: "ID não encontrado" });
        }

        return res.status(200).json(putUser);
    } catch (error) {
        console.error("Erro ao atualizar dados: ", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

