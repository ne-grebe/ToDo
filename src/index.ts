import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { routes } from './Routes/todoRoutes';
const Sequelize = require('sequelize');
const instances = require('./Models/Todos')

'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([
        //register a connection to the database with the server
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'todoDB',
                    models: [__dirname + '/Models/Todos'],
                    sequelize: new Sequelize('mysql', 'root', 'supersecretpass', {
                        host: 'localhost',
                        port: 13306,
                        dialect: 'mysql'
                    }),
                    sync: true,
                }
            ]
        }
    ])
    
    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();