// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const User = require('../../domain/models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    constructor() {
        this.userService = new User();
    }

    async loginUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            // Busca al usuario por su nick
            const user = await this.userService.getNickByNickname(req.body.nick);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            // Compara la contraseña ingresada con el hash almacenado
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            const nick = req.body.nick;
    
            // Generar el token JWT
            const token = jwt.sign({ nick }, process.env.JWT_SECRET, { expiresIn: '60s' });
    
            // Crear la sesión del usuario
            req.session.user = { nick };
    
            // Establecer la cookie con el token JWT
            res.cookie('authToken', token, { 
                httpOnly: true, // Esto impide que el cliente acceda a la cookie a través de JavaScript
                secure: process.env.NODE_ENV === 'production', // Solo envía la cookie por HTTPS en producción
                sameSite: 'Strict', // Configura la política SameSite para mayor seguridad
                maxAge: 60 * 1000 // Establece la duración de la cookie (en milisegundos)
            });
    
            // Enviar respuesta de éxito con el token
            res.status(201).json({ token });
        } catch (error) {
            console.error(error); // Para el log del error
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getNick(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const nick = await this.userService.getNickByNickname(req.params.nick);
            res.status(200).json(nick);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Hash de la contraseña antes de almacenar el usuario
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Crear el objeto del nuevo usuario, incluyendo el hash de la contraseña
            const newUser = {
                ...req.body,
                password: hashedPassword, // Reemplaza la contraseña con el hash
            };

            // Creación de usuario
            const user = await this.userService.insert(newUser); // Asegúrate de que insert maneje el nuevo objeto
            if (!user) {
                return res.status(401).json({ error: 'No se ha creado el usuario con éxito' });
            }

            // Enviar respuesta de éxito con la información del usuario
            res.status(201).json({ message: 'User created successfully', response: { ...user } });
        } catch (error) {
            // Manejo de errores más robusto
            console.error(error); // Para ver el error en el log del servidor
        
            if (error.message) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const user = await this.userService.findByIdAndDelete(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(user);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(user);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
    async searchUsers(req, res) {
        try {
            const users = await this.userService.searchUsersByName(req.query.name);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;