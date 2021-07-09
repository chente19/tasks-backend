import Sequelize from "sequelize";
import { myORM } from "../../database.js";
// Aqui las tablas que se requiere hacer join
import User from "./UsersModel.js";

const Role = myORM.define("roles", {
  ID_ROLE: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

Role.hasMany(User, { foreignKey: "FK_USER_ROLE", sourceKey: "ID_ROLE" });
User.belongsTo(Role, { foreignKey: "FK_USER_ROLE", sourceKey: "ID_ROLE" });

export default Role;
