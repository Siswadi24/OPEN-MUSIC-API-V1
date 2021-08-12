//Mengimpor dotenv dan juga menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');


const init = async () => {
    const songsService = new SongsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: songs,
        options: {
            services: songsService,
            validator: SongsValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
