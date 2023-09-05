import Users from "../models/usermodel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsersById = async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'], 
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUsers = async(req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    if(password !== confPassword){
        return res.status(400).json({ message: "Password not match" });
        const hashPassword = await argon2.hash(password);
        try {
            await Users.create({
                name: name,
                email: email,
                password: hashPassword,
                role: role
            });
            res.status(201).json({ message: "Registration success" });
        } catch (error) {
            res.status(500).json({ message: "Registration failed" });
        }
    }
}

export const updateUsers = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }
    const { name, email, password, confPassword, role } = req.body;
    let hashPassword;
    if(password === "" || password === null) {
        hashPassword = user.password;
    } else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword){
        return res.status(400).json({ message: "Password not match" });
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where:{
                id: user.id
            }
        });
        res.status(200).json({ message: "User updated" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
}}

export const deleteUsers = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Nuh uh" });
    }
};