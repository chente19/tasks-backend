import Sequelize from "sequelize";
import { myORM } from "../../database.js";

const Task = myORM.define("tasks", {
  TASK_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  record_created_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  record_modified_on_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  record_updated_by_user: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "NA"
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  task_status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  FK_RECORD_CREATED_BY_USER: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

export default Task;
