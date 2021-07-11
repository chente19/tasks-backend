import routerx from "express-promise-router";
import userRouter from "./UserRoutes";
import taskRouter from "./TaskRoutes";

const router = routerx();

// configure the initial path endpoint for ...
router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
