import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from './../middlewares/auth';

const router = routerx();

// only for production

/* router.post('/add', auth.verifyAdmin, userController.add); */

// only for development environment

// Inicio de sesion
router.post('/login', userController.login);
// Crear un usuario
router.post('/add',  userController.add);
// lista todos los usuarios
router.get('/list', userController.list);
// Obtiene un usuario
router.get('/query/:user_number', userController.query);
// Obtener una lista de usuarios de 25 en 25 json
router.get('/paginate/:paginate_init', userController.paginateUsers);
// Actualiza los datos del usuario
router.put('/update/:user_number', userController.update);
// Elimina un usuario
router.delete('/delete', userController.remove);
// Activa un usuario
router.put('/activate', userController.activate);
// Desactiva un usuario
router.put('/deactivate', userController.deactivate);


export default router;