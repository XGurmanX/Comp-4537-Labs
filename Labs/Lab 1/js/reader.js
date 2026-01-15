class Reader {
    constructor() {
        this.notes = new Notes("reader")
    }

    startReader() {
        this.notes.createNotes()
        console.log(MESSAGES.message1)
    }
}

let reader = new Reader()
reader.startReader()
