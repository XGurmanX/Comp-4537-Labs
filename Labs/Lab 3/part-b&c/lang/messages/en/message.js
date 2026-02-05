class Messages {

    static greeting(name, date) {
        return `<span style="color:blue">Hello ${name}, What a beautiful day. Server current date and time is ${date}</span>`;
    }

    static nameIsMissing() {
        return '<span style="color:red">Name is required</span>';
    }

    static notFound() {
        return `<span style="color:red">404 Not Found</span>`;
    }

    static textIsMissing() {
        return '<span style="color:red">Text is required</span>';
    }

    static fileWritten(filePath) {
        return `<span style="color:green">File has been written to ${filePath}</span>`;
    }
    
}

module.exports = Messages;
