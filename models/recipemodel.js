import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Recipes = db.define('recipes',{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cooking_time_seconds:{
        type: DataTypes.INTEGER,
        allowNull: false
},
    freezeTableName: true
});

export default Recipes;