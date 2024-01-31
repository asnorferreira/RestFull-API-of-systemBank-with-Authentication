import pool from "../configs/conection.js";

export const validateEmail = async (req, res, next) => {
    const { email } = req.body;

    const sqlEmail = "select * from usuarios where email = $1";
    const paramsEmail = [email];

    try {
        const emailQuery = await pool.query(sqlEmail, paramsEmail);

        if (emailQuery.rowCount > 0) {
            return res.status(400).json({ mensagem: "E-mail já existe!" });
        }
        next();
    } catch (error) {
        console.error("Error validating email:", error);
        return res.status(500).json({ mensagem: "Internal Server Error" });
    }
};