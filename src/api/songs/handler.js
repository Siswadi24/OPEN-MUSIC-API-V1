const ClientError = require("../../exceptions/ClientError");

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    postSongHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const {
                title = 'untitled',
                year,
                performer,
                genre,
                duration
            } = request.payload;

            const songId = this._service.addSong({
                title,
                year,
                performer,
                genre,
                duration,
            });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data: {
                    songId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server ERROR!!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    getSongsHandler() {
        const songs = this._service.getSongs();
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    getSongByIdHandler(request, h) {
        try {
            const { songId } = request.params;

            const song = this._service.getSongById(songId);
            return {
                status: 'success',
                data: {
                    song,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.'
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    putSongByIdHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { songId, id, title, year, performer, genre, duration } = request.params;

            this._service.editSongById(songId, { id, title, year, performer, genre, duration });

            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui'
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.'
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    deleteSongByIdHandler(request, h) {
        try {
            const { songId } = request.params;
            this._service.deleteSongById(songId);
            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error!!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.'
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = SongsHandler;