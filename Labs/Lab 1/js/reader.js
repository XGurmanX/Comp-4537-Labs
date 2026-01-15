import { TEST } from "../lang/messages/en/user.js"

class Reader {
    constructor() {
        this.notes = new Notes("reader")
    }

    startReader() {
        this.notes.createNotes()
    }
}

let reader = new Reader()
reader.startReader()
