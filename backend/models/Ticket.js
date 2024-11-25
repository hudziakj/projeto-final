const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Ticket = mongoose.model(
  "Ticket",
  new Schema(
    {
      id: {
        type: Number,
        required: true,
      },
      titulo: {
        type: String,
        required: true,
      },
      descricao: {
        type: String,
        required: true,
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
        type: String,
        required: true,
      },
      comentarios: [
        {
          usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referência ao usuário que fez o comentário
            required: true,
          },
          comentario: {
            type: String,
            required: true,
          },
          data: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    { timestamps: true } // Garante que o mongoose armazene as datas de criação e atualização automaticamente
  )
);

module.exports = Ticket;
