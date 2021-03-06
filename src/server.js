//Mengimpor dotenv dan juga menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
//<<<<<<< HEAD

//songs
//>>>>>> 8a460fdc707ffb8dc2cd941e11f551ff74ed705f
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');



//>>>>>>> 8a460fdc707ffb8dc2cd941e11f551ff74ed705f
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
        {
            plugin: songs,
            options: {
                //<<<<<<< HEAD
                service: songsService,
                //=======
                //>>>>>>> d5252d735039f87cea2b51615d67027ea0fa6907
                validator: SongsValidator,
            },
        },
     });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
