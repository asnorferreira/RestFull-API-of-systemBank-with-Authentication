export const validateUsers = async (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ error: "A senha deverá conter no mínimo 6 caracteres" });
  }

  next();
};
