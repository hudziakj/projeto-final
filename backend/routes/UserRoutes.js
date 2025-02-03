const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

const upload = require("../config/multer-config");

router.post("/register", upload.single("avatar"), UserController.register);
router.post("/login", UserController.login);
router.get("/:id", UserController.getUser);

module.exports = router;
