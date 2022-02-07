import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { routes } from './Routes/todos';
'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: (request: Request, h: ResponseToolkit) => {

    //         return 'Hello World!';
    //     }
    // });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();