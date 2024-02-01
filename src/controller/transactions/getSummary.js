import pool from "../../configs/conection.js";

export const getSummary = async (req, res) => {
  const userId = req.usuario.id;

  try {
    const entryQuery = `
            select coalesce(sum(valor), 0) as entrada
            from transacoes
            where usuario_id = $1 and tipo = 'entrada'
        `;
    const entryParams = [userId];
    const entryResult = await pool.query(entryQuery, entryParams);
    const entrySum = entryResult.rows[0].entrada;

    const exitQuery = `
            select coalesce(sum(valor), 0) as saida
            from transacoes
            where usuario_id = $1 and tipo = 'saida'
        `;
    const exitParams = [userId];
    const exitResult = await pool.query(exitQuery, exitParams);
    const exitSum = exitResult.rows[0].saida;

    return res.status(200).json({ entrada: entrySum, saida: exitSum });
  } catch (error) {
    console.error("Erro ao obter o extrato de transações: ", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
