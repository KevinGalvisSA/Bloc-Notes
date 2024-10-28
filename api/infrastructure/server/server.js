// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const cors = require('cors');
const session = require('express-session');
const authenticateToken = require('../../application/middlewares/sessionLogin');
const router = require('../../application/routes/userRoute');

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);

     // Configuración de la sesión
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 10, // La sesión durará 10 minutos
                httpOnly: true,
                secure: false,
            }
        }));

    
        app.use(cors({
            origin: 'http://127.0.0.1:5500/', // Cambia esto a la URL de tu frontend
            credentials: true // Esto permite que las cookies se envíen
        }));

    app.use('/users', router);
    
    return app;

};

module.exports = createServer;