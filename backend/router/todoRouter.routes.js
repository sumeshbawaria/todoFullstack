import { Router } from "express";
import { registerTodos, fetchTodos, fetchTodoLists, deleteTodoList, updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route("/registerTodo").post(registerTodos);
router.route("/fetchTodos").get(fetchTodos);
router.route("/fetchTodoLists").get(fetchTodoLists);
router.route("/deleteTodoList").post(deleteTodoList);
router.route("/updateTodo").post(updateTodo);

export default router;