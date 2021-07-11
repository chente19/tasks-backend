import Sequelize from "sequelize";
import { myORM } from "../../database.js";
// join tables
import Task from "../Tasks/TasksModels";

const User = myORM.define(
  "user",
  {
    USER_NUMBER: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_first_lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_second_lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    user_creation_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    user_modified_on_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    user_created_by: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "999",
    },
    user_modified_by: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NA",
    },
    FK_USER_ROLE: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Join to TaskModels
User.hasMany(Task, {
  foreignKey: "FK_RECORD_CREATED_BY_USER",
  sourceKey: "USER_NUMBER",
});

export default User;
