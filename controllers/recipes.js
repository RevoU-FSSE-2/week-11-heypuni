import Recipes from "../models/recipemodel.js";
import User from "../models/usermodel.js";
import { Op } from "sequelize";

export const getRecipe = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Recipes.findAll({
                attributes:['uuid','title', 'ingredients','steps'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        } else {
            response = await Recipes.findAll({
                attributes:['uuid','title', 'ingredients','steps'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getRecipeById = async(req, res) =>{
    try {
        const recipe = await Recipes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!recipe) return res.status(404).json({msg: "Recipe not found"});
        let response;
        if(req.role === "admin"){
            response = await Recipes.findOne({
                attributes:['uuid','title', 'ingredients','steps'],
                where:{
                    id: recipe.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        } else {
            response = await Recipes.findOne({
                attributes:['uuid','title', 'ingredients','steps'],
                where:{
                    [Op.and]:[{id: recipe.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createRecipe = async(req, res) =>{
    const {title, ingredients, steps} = req.body;
    try {
        await Recipes.create({
            title: title,
            ingredients: ingredients,
            steps: steps,
            userId: req.userId
        });
        res.status(201).json({msg: "Recipe Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateRecipe = async(req, res) =>{
    try {
        const recipe = await Recipes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!recipe) return res.status(404).json({msg: "Recipe not found"});
        const {title, ingredients, steps} = req.body;
        if(req.role === "admin"){
            await Recipes.update({title, ingredients, steps},{
                where:{
                    id: recipe.id
                }
            });
        } else {
            if(req.userId !== recipe.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Recipes.update({title, ingredients, steps},{
                where:{
                    [Op.and]:[{id: recipe.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Recipe updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteRecipe = async(req, res) =>{
    try {
        const recipe = await Recipes.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!recipe) return res.status(404).json({msg: "Recipe not found"});
        const {title, ingredients, steps} = req.body;
        if(req.role === "admin"){
            await Recipes.destroy({
                where:{
                    id: recipe.id
                }
            });
        } else {
            if(req.userId !== recipe.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Recipes.destroy({
                where:{
                    [Op.and]:[{id: recipe.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Recipe deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}