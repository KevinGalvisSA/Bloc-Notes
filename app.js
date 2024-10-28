const ConnectToDatabase = require('./api/infrastructure/database/mongodb');
const createServer = require('./api/infrastructure/server/server');
const express = require('express');

const startApp = async () => {
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.connectOpen();
    const app = createServer();

    //use to conect te src folder who contains the fronted
    
    // Configura la carpeta 'src' para servir archivos estáticos
    app.use(express.static('src'));

    app.get('/hola', (req, res) => {
        res.json({message: "Hola a la api"});
    })

    app.listen({port: process.env.EXPRESS_PORT, host:process.env.EXPRESS_HOST}, () => {
        console.log(`http://localhost:${process.env.EXPRESS_PORT}`);
    });
};

startApp();