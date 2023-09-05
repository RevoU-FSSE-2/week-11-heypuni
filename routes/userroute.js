import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createRecipe
} from "../controllers/users.js";
import { verifyUser, adminOnly } from "../middleware/authuser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, adminOnly, createUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);
router.post('/recipes', verifyUser, adminOnly, createRecipe);

export default router;
