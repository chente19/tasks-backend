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
    console.log("Connection to MYSQL-SERVER db success.");
  } catch (error) {
    console.error("ERROR: MYSQL-SERVER connection --> ", error);
  }
}

testDb();
