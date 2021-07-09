import tokenService from './../services/token';

export default {

    verifyAdmin: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(403).send({ message: 'Token not exist' });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.user_role == 'administrador') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyLab: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(403).send({ message: 'Token not exist' });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.user_role == 'laboratorista') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyCargoOperator: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(403).send({ message: 'Token not exist' });
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.user_role == 'operador_carga') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }


}