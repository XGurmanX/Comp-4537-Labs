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
        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        });
    }


    handleRequest(request, response) {
        const parsedUrl = url.parse(request.url, true);

        // if (parsedUrl.pathname === '/COMP4537/labs/3/getDate/') {
        if (parsedUrl.pathname) {
            const name = parsedUrl.query.name;
            console.log('Received name:', name);

            if (!name) {
                response.writeHead(400, { 'Content-Type': 'text/html' });
                response.end('<span style="color:red">Name is required</span>');
                return;
            }

            const date = Utils.getDate();
            const message = Message.greeting(name, date);

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`<span style="color:blue">${message}</span>`);
            return;
        }

        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<span style="color:red">404 Not Found</span>');
    }
}