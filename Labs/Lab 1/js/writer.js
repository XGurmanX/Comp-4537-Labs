class Writer {
    constructor() {
        this.notes = new Notes("writer");
    }

    startWriter() {
        this.notes.createNotes();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const writer = new Writer();
    writer.startWriter();
});
