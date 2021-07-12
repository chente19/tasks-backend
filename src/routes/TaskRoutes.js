import routerx from 'express-promise-router';
import taskController from '../controllers/TaskControllers';

const router = routerx();

router.post('/add',  taskController.add);
router.get('/list/:responsable_user',  taskController.list);
router.put('/update/:task_id', taskController.update);
router.put('/deactivate/:task_id', taskController.deactivate);

export default router;