class Writer {
    constructor() {
        this.notes = new Notes("writer");
    }

    startWriter() {
        this.notes.createNotes();
    }
}

let writer = new Writer();
writer.startWriter();
