const Ticket = require("../models/Ticket"); // Importa o modelo de Ticket

// Função para criar um novo chamado
const create = async (req, res) => {
  try {
    const { titulo, descricao, categoria } = req.body;

    // Cria um novo chamado com os dados recebidos
    const newTicket = new Ticket({
      titulo,
      descricao,
      categoria,
    });

    // Salva o novo chamado no banco de dados
    await newTicket.save();

    // Retorna o chamado criado com status 201 (Created)
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error);
    // Em caso de erro, retorna um erro com status 500 (Internal Server Error)
    res.status(500).json({ error: "Erro ao criar o chamado." });
  }
};

const get = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};

module.exports = { create, get };
