const checkSession = (req, res, next) => {
    console.log('Checking session:', req.session.user)
    // Verificar si la sesión existe
    if (!req.session.user) {
        return res.redirect('/login'); // Redirigir a la página de login
    }

    // Adjuntar la información de la sesión a la request
    req.user = req.session.user;

    next();
};

module.exports = checkSession;