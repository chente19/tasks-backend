import routerx from 'express-promise-router';
import taskController from '../controllers/TaskControllers';

const router = routerx();

router.post('/add',  taskController.add);
router.put('/update/:task_id', taskController.update);

export default router;