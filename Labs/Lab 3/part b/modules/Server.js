const http = require('http');
const url = require('url');
const Utils = require('../modules/utils');
// const Messages = require('../lang/messages/en/user');

module.exports = class Server {

    constructor(port) {
        this.port = port;
    }

    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {
            console.log('somthing is running on port ' + this.port);
        });
    }

    handleRequest(request) {
        let parsedUrl = url.parse(request.url, true);
        let data = parsedUrl.query;
        console.log(parsedUrl);
        console.log(data);
        return `Server ${this.port} received request: ${request}`;
    }

}