import models from "./../models";
import bcrypt from "bcryptjs";
import token from "./../services/token";
import dayjs from "dayjs";
import Sequelize from "sequelize";
import { Op } from "sequelize";

async function takeIDRole(role_name_request) {
  try {
    const regRole = await models.Role.findOne({
      where: {
        role_name: role_name_request,
      },
    });
    if (regRole) {
      return regRole.ID_ROLE;
    } else {
      return "Error";
    }
  } catch (error) {
    return "Error";
  }
}

async function autoIncrementUserCheck() {
  try {
    let lastID = await models.User.max("USER_NUMBER");
    // Si no existe el numero inicial se regresa number NaN == false
    if (lastID) {
      let oldSeq = parseInt(lastID);
      let newSeq = oldSeq + 1;
      return newSeq;
    } else {
      return 1000;
    }
  } catch (error) {
    return 1000;
  }
}

async function emailExist(a_user_email) {
  try {
    const regUser = await models.User.findOne({
      where: {
        user_email: a_user_email,
      },
    });
    if (regUser.user_email == null) {
      return false;
    } else if (regUser.user_email == a_user_email) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function checkIsSameLastEmail(a_user_number, a_user_email) {
  try {
    const regUser = await models.User.findOne({
      where: {
        USER_NUMBER: a_user_number,
        user_email: a_user_email,
      },
    });
    if (regUser.user_email == a_user_email) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function createIDIfNullEmail(a_email) {
  let newMail = Sequelize.literal("newid()");
  if (a_email == "noemail@noemail.com") {
    return newMail;
  } else {
    console.log("Debe entar aqui");
    return a_email;
  }
}

export default {
  // LOGIN a one user
  login: async (req, res, next) => {
    try {
      let aUser = await models.User.findOne({
        include: [models.Role],
        where: {
          USER_NUMBER: req.body.user_number,
          user_status: 1,
        },
      });
      if (aUser) {
        let match = await bcrypt.compare(
          req.body.user_password,
          aUser.user_password
        );
        if (match) {
          let tokenReturn = await token.encode(
            aUser.role.role_name,
            aUser.USER_NUMBER
          );
          let aUserReturn = await models.User.findOne({
            include: [
              {
                model: models.Role,
                attributes: ["role_name"],
                required: false,
              },
            ],
            where: { USER_NUMBER: req.body.user_number },
            attributes: [
              "user_email",
              "USER_NUMBER",
              "user_name",
              "user_first_lastname",
              "user_second_lastname",
              "user_status",
            ],
          });
          res.status(200).json({ aUserReturn, tokenReturn });
        } else {
          res.status(403).send({ message: "ERROR !!, password incorrecto" });
        }
      } else {
        res.status(404).send({ message: "El usuario no existe !!" });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error en servidor",
      });
      next(e);
    }
  },
  // Create a user with autoincrement user_number
  add: async (req, res, next) => {
    try {
      req.body.user_password = await bcrypt.hash(req.body.user_password, 10);
      req.body.USER_NUMBER = await autoIncrementUserCheck();
      req.body.FK_USER_ROLE = await takeIDRole(req.body.user_role);
      let sameEmail = false;
      // verifico que la peticion sea con email o sin email
      if (req.body.user_email) {
        sameEmail = await emailExist(req.body.user_email);
      } else {
        sameEmail = false;
      }
      if (sameEmail) {
        res
          .status(409)
          .send({ message: "No es posible registrar, email ya en uso." });
      } else {
        const reg = await models.User.create(req.body);
        res.status(200).json({ new_user_number: reg.USER_NUMBER });
      }
    } catch (error) {
      res.status(500).send({ message: "No es posible crear el usuario" });
      next(error);
    }
  },
  // Get one user
  query: async (req, res, next) => {
    try {
      /* const reg = await models.TheUser.findOne({
        user_number: req.params.user_number,
      });
      if (!reg) {
        res.status(404).send({
          message: "El usuario no existe",
        });
      } else {
        res.status(200).json(reg);
      } */
      res.status(404).send({
        message: "Pagina no existente por el momento",
      });
    } catch (e) {
      res.status(500).send({
        message: "Error al ejecutar la consulta",
      });
      next(e);
    }
  },
  // Get all users, this only for admins
  list: async (req, res, next) => {
    try {
      const reg = await models.TheUser.find({}).select({
        _id: 0,
        user_password: 0,
        user_creation_date: 0,
      });
      if (!reg) {
        res.status(404).send({
          message: "No hay usuarios todavia",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error en el servidor",
      });
      next(e);
    }
  },
  // Paginacion de usuarios de 25 en 25 a partir del numeor de usuario
  paginateUsers: async (req, res, next) => {
    try {
      const leftSide = parseInt(req.params.paginate_init);
      let rightSide = leftSide + 25;
      const reg = await models.User.findAll({
        attributes: { exclude: ["FK_USER_ROLE"] },
        where: {
          USER_NUMBER: { [Op.between]: [leftSide, rightSide] },
        },
        include: [
          {
            model: models.Role,
            attributes: ["role_name"],
          },
        ],
      });
      if (!reg) {
        res.status(404).send({
          message: "Datos no encontrados",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (error) {
      res.status(500).send({
        message: "Error al ejecutar la consulta",
      });
      next(error);
    }
  },
  // update one user
  update: async (req, res, next) => {
    try {
      let pass = req.body.user_password;
      let fkNumberRole = await takeIDRole(req.body.user_role);
      let sameEmail = await emailExist(req.body.user_email);
      let lastEmailIsTheSame = await checkIsSameLastEmail(
        req.params.user_number,
        req.body.user_email
      );
      req.body.user_email = await createIDIfNullEmail(req.body.user_email);
      // reg0 == before the real reg to return, ineed for take the password
      const reg0 = await models.User.findOne({
        where: { USER_NUMBER: req.params.user_number },
      });
      if (pass != "") {
        req.body.user_password = await bcrypt.hash(pass, 10);
      }
      if (lastEmailIsTheSame) {
        sameEmail = false;
      }
      if (sameEmail) {
        res.status(409).send({
          message: "No es posible registrar, email ya en uso por otro usuario.",
        });
      } else {
        const reg = await models.User.update(
          {
            user_name: req.body.user_name,
            user_first_lastname: req.body.user_first_lastname,
            user_second_lastname: req.body.user_second_lastname,
            user_email: req.body.user_email,
            user_password:
              pass != "" ? req.body.user_password : reg0.user_password,
            FK_USER_ROLE: fkNumberRole,
            user_status: req.body.user_status,
            user_modified_on_date: new Date(),
            user_modified_by: req.body.user_modified_by,
          },
          { where: { USER_NUMBER: reg0.USER_NUMBER } }
        );
        const filterReg = await models.User.findOne({
          where: { USER_NUMBER: req.params.user_number },
        });
        res.status(200).json(filterReg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  // status in activate for one user
  activate: async (req, res, next) => {
    try {
      let currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      req.body.FK_USER_ROLE = await takeIDRole(req.body.user_role);
      const reg = await models.User.update(
        {
          user_status: 1,
          user_modified_by: req.body.user_modified_by,
          user_modified_on_date: currentDateTime,
        },
        {
          where: { USER_NUMBER: req.body.user_number },
        }
      );
      res.status(200).json({
        user_number: req.body.user_number,
        user_status: "activado",
        user_modified_by: req.body.user_modified_by,
        user_modified_on_date: currentDateTime,
      });
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
  // status in deactivate for one user
  deactivate: async (req, res, next) => {
    try {
      let currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      req.body.FK_USER_ROLE = await takeIDRole(req.body.user_role);
      const reg = await models.User.update(
        {
          user_status: 0,
          user_modified_by: req.body.user_modified_by,
          user_modified_on_date: currentDateTime,
        },
        {
          where: { USER_NUMBER: req.body.user_number },
        }
      );
      res.status(200).json({
        user_number: req.body.user_number,
        user_status: "desactivado",
        user_modified_by: req.body.user_modified_by,
        user_modified_on_date: currentDateTime,
      });
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
  // Delete a one user
  remove: async (req, res, next) => {
    try {
      let someUserNumner = await req.body.user_number;
      const reg = await models.TheUser.findOneAndDelete({
        user_number: someUserNumner,
      });
      res
        .status(200)
        .json({ user_number: someUserNumner, user_status: "Eliminado" });
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
};
