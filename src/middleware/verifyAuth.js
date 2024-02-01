import pool from "../configs/conection.js";
import jwt from "jsonwebtoken";
import { config } from "../configs/env.js";

export const verifyAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, config.jwt_key);
    const sql = "select * from usuarios where id = $1";
    const params = [id];
    const verifyQuery = await pool.query(sql, params);

    if (verifyQuery.rows.length < 1) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    req.usuario = verifyQuery.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};
