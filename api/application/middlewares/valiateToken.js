const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verifica que el encabezado de autorización esté presente y en el formato correcto
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Verifica que el token no sea nulo
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        console.log(payload);
        req.user = payload; // Asigna el payload al objeto de solicitud
        next(); // Llama al siguiente middleware
    });
};

module.exports = authenticateToken;