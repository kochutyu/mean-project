const swAuthRoute = require('./auth/docs').docs;

const swagger = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Dangle',
        version: '1.0.0',
        description: 'The REST API for Dangle Panel service'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server'
        }
    ],
    paths: {
        ...swAuthRoute
    },
}

export default swagger
