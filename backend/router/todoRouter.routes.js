import { Router } from "express";
import { registerTodos, fetchTodos, fetchTodoLists } from "../controllers/todo.controller.js";

const router = Router();

router.route("/registerTodo").post(registerTodos);
router.route("/fetchTodos").get(fetchTodos)
router.route("/fetchTodoLists").get(fetchTodoLists)

export default router;