const fs = require('fs');

class Utils {

    constructor() {}

    static getDate() {
        return new Date().toString();
    }

    static appendToFile(filePath, text) {
        fs.appendFileSync(filePath, text + '\n', { encoding: 'utf8' });
    }

    static readFile(filePath) {
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    }

    static fileExists(filePath) {
        return fs.existsSync(filePath);
    }
}

module.exports = Utils;