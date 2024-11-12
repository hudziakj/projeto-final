const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Ticket = mongoose.model(
  "Ticket",
  new Schema(
    {
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
        required: true,
      },
      requerente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Ticket;
