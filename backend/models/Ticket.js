const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Ticket = mongoose.model(
  "Ticket",
  new Schema(
    {
      titulo: {
        type: String,
        required: true, // Título do chamado é obrigatório
      },
      descricao: {
        type: String,
        required: true, // Descrição do chamado é obrigatória
      },
      andamento: {
        type: String,
        enum: ["Aberto", "Em Progresso", "Fechado"], // Status do chamado
        default: "Aberto", // Status inicial
        required: true,
      },
      categoria: {
        type: String,
        required: true, // Categoria do chamado (ex: "Suporte", "Manutenção")
      },
      requerente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referência ao usuário responsável
        default: null, // Inicialmente o responsável pode ser null
      },
    },
    { timestamps: true } // Garante que o mongoose armazene as datas de criação e atualização automaticamente
  )
);

module.exports = Ticket;
