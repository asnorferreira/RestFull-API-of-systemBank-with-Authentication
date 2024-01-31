import pool from '../../configs/conection.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../../configs/env.js"

export const postLogin = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const userQuery = await pool.query("select * from usuarios where email = $1", [email]);
        if (userQuery.rowCount === 0) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }
        const user = userQuery.rows[0];

        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." });
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            config.jwt_key,
            {
                expiresIn: "8h",
            }
        );

        const { senha: _, ...usuarioLogado } = user;

        return res.status(200).json({ usuario: usuarioLogado, token });
    } catch (error) {
        console.error("Erro efetuar login do usuário: ", error);
        return res.status(500).json({ message: error.message });
    }
};


