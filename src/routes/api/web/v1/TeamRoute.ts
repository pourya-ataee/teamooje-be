import express from "express";
import { addUser, createTeam, deleteUser, fetchUsers } from "../../../../controllers/TeamController";

const router = express.Router();
router.post("/create", createTeam);
router.get("/:id/users", fetchUsers);
router.put("/:id/user/add", addUser);
router.delete("/:id/:user/delete", deleteUser);

export default router;
