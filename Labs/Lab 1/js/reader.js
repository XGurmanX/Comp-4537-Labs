class Reader {
    constructor() {
        this.notes = new Notes("reader");
    }

    startReader() {
        this.notes.createNotes();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reader = new Reader();
    reader.startReader();
});
