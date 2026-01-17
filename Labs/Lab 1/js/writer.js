class Writer {
    constructor() {
        this.notes = new Notes("writer");
    }

    startWriter() {
        this.notes.displayNotes();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const writer = new Writer();
    writer.startWriter();
});
