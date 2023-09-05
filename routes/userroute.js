import express from "express";
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
} from "../controllers/users.js";
// import { verifyUser, adminOnly } from "../middleware/authuser.js";

const router = express.Router();

router.get( "/users", getUsers);

router.get("/users/:id", getUsersById);

router.post("/users", createUsers);

router.put("/users/:id", updateUsers);

router.delete("/users/:id", deleteUsers);

export default router;
