import express from "express";
import {
    getRecipe,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
} from "../controllers/recipes.js";
import { verifyUser } from "../middleware/authuser.js";

const router = express.Router();

router.get('/recipes',verifyUser, getRecipe);
router.get('/recipes/:id',verifyUser, getRecipeById);
router.post('/recipes',verifyUser, createRecipe);
router.patch('/recipes/:id',verifyUser, updateRecipe);
router.delete('/recipes/:id',verifyUser, deleteRecipe);

export default router;