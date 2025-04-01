import { Router } from "express";
import { registerTodos, fetchTodos } from "../controllers/todo.controller.js";

const router = Router();

router.route("/registerTodo").post(registerTodos);
router.route("/getTodos").post(fetchTodos)

export default router;