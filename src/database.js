// import mongoose from "mongoose";

import Sequelize from "sequelize";

export const myORM = new Sequelize("notesdatabase", "root", "somerootpassword", {
  host: "0.0.0.0",
  port: "3306",
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
  timezone: "-05:00",
});
async function testDb() {
  try {
    await myORM.authenticate();
    console.log("Conexión a sql-server db exitosa.");
  } catch (error) {
    console.error("ERROR AL CONECTAR A SQL-SERVER:", error);
  }
}

testDb();
