import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { CalcadosController } from "./controllers/CalcadosController";

const routes = express.Router();
const calcadosController = new CalcadosController();

routes.get("/users", readAllUsers);
routes.post("/calcados", (req, res) => calcadosController.create(req, res));
routes.get("/calcados", (req, res) => calcadosController.read(req, res));
routes.get("/calcados/estoque", (req, res) => calcadosController.getEstoque(req, res));
routes.patch("/calcados/:id", (req, res) => calcadosController.update(req, res));
routes.delete("/calcados/:id", (req, res) => calcadosController.delete(req, res));

export default routes;
