import routerx from "express-promise-router";
import userRouter from "./UserRoutes";

const router = routerx();

// configure the initial path endpoint for ...
router.use("/user", userRouter);

export default router;
