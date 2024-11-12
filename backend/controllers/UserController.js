const User = require("../models/User");

const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async register(req, res) {
    const { nome, email, departamento, senha, confirmaSenha } = req.body;

    if (!nome) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!senha) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmaSenha) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (senha != confirmaSenha) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação precisam ser iguais!" });
      return;
    }

    const usuarioExiste = await User.findOne({ email: email });

    if (usuarioExiste) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = new User({
      nome: nome,
      email: email,
      departamento: departamento,
      senha: senhaHash,
    });

    try {
      const novoUsuario = await user.save();
      await createUserToken(novoUsuario, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};