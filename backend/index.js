const express = require("express");
const cors = require("cors");
const app = express();

const coon = require("./db/conn.js");

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

app.use(express.static("public"));

const UserRoutes = require("./routes/UserRoutes");
const TicketRoutes = require("./routes/TicketRoutes.js");

app.use("/users", UserRoutes);
app.use("/tickets", TicketRoutes);

app.listen(5000);
