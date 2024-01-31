import pool from '../../configs/conection.js'
import bcrypt from "bcrypt"

export const postUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const ecryPass = await bcrypt.hash(senha, 10);

        const sqlPost = "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email";
        const paramsPost = [nome, email, ecryPass];

        const postQuery = await pool.query(sqlPost, paramsPost);

        const user = postQuery.rows[0];
        return res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error);
        return res.status(500).json({ mensagem: error.message });
    }
}