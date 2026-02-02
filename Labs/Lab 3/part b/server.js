const PORT = 3000;
const Server = require('./modules/Server.js');

const server = new Server(PORT);
server.start();