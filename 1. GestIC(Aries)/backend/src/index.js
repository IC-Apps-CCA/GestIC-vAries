require('dotenv/config');
const app = require('./app');

const server = app.listen(process.env.PORT, function () {
    console.log(`Servidor ativo na porta ${process.env.PORT || 3333}`);
});

process.on('SIGINT', () => {
    process.kill(process.pid)
    server.close(() => {
        console.log('Process terminated')
    });
});
