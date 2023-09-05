import sequelize from 'sequelize';

const db = new sequelize('foods', 'root', '1234', {
    host: "localhost",
    dialect: "mysql"
})

export default db;