const PORT = 8080;
const Server = require('./modules/Server');

const server = new Server(PORT);
server.start();