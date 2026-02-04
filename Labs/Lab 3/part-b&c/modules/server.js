const http = require('http');
const url = require('url');
const path = require('path');
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

        if (parsedUrl.pathname === '/writeFile/') {
            const text = parsedUrl.query.text;

            if (!text) {
                response.writeHead(400, { 'Content-Type': 'text/html' });
                response.end(Message.textIsMissing());
                return;
            }

            const filePath = path.join(__dirname, '../data/file.txt');

            Utils.appendToFile(filePath, text);

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(Message.fileWritten('file.txt'));
            return;
        }

        if (parsedUrl.pathname.startsWith('/readFile/')) {
            const fileName = parsedUrl.pathname.replace('/readFile/', '');
            const filePath = path.join(__dirname, '../data/', fileName);

            if (!Utils.fileExists(filePath)) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(`<span style="color:red">404 File Not Found: ${fileName}</span>`);
                return;
            }

            const content = Utils.readFile(filePath);

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(`<pre>${content}</pre>`);
            return;
        }

        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(Message.notFound());
    }

}