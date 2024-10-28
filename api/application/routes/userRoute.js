// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Users API!' });
});

router.get('/search', (req, res) => userController.searchUsers(req, res));
router.get('/:id', (req, res) => userController.getUser(req, res));

router.post('/', (req, res) => userController.createUser(req, res));
// Version con las sesiones
router.post('/login', (req, res) => userController.loginUser(req, res));

//Version con las cookies
// router.post('/login', cookierParser(), userValidator.validateUserLogin(), (req, res) => userController.loginUser(req, res));

router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));




module.exports = router;