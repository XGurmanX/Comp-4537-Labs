const http = require('http');
const url = require('url');
const Utils = require('./utils');
const Message = require('../lang/messages/en/message');

module.exports = class Server {

    constructor(port) {
        this.port = port;
    }

    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {});
    }


    handleRequest(request, response) {
        const parsedUrl = url.parse(request.url, true);

        if (parsedUrl.pathname === '/getDate/') {
            const name = parsedUrl.query.name;

            if (!name) {
                response.writeHead(400, { 'Content-Type': 'text/html' });
                response.end(Message.nameIsMissing());
                return;
            }

            const date = Utils.getDate();

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(Message.greeting(name, date));
            return;
        }

        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(Message.notFound());
    }

}