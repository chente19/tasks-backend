import models from "../models";

async function autoIncrementRecord() {
  try {
    let lastID = await models.Task.max("TASK_ID");
    if (lastID) {
      let oldSeq = parseInt(lastID);
      let newSeq = oldSeq + 1;
      return newSeq;
    } else {
      return 1;
    }
  } catch (error) {
    return 1;
  }
}

export default {
  add: async (req, res, next) => {
    try {
      req.body.TASK_ID = await autoIncrementRecord();
      req.body.FK_RECORD_CREATED_BY_USER = req.body.responsable_user;
      const reg = await models.Task.create(req.body);
      res.status(200).json({ new_task_id: req.body.TASK_ID });
    } catch (error) {
      res
        .status(500)
        .send({ message: "No es posible crear un registro de tarea." });
      next(error);
    }
  },
  // update one task
  update: async (req, res, next) => {
    try {
      console.log("AQUI EL PEX -->" + req.params.task_id);
      const reg = await models.Task.update(
        {
          title: req.body.title,
          content: req.body.content,
          task_status: req.body.task_status,
          record_modified_on_date: new Date(),
          record_updated_by_user: req.body.responsable_user,
        },
        {
          where: {
            TASK_ID: req.params.task_id,
            FK_RECORD_CREATED_BY_USER: req.body.responsable_user,
            task_status: req.body.task_status,
          },
        }
      );
      const filterReg = await models.Task.findOne({
        where: { TASK_ID: req.params.task_id },
      });
      res.status(200).json(filterReg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
};
