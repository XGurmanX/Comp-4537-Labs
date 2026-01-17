class Reader {
    constructor() {
        this.notes = new Notes("reader");
    }

    startReader() {
        this.notes.displayNotes();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reader = new Reader();
    reader.startReader();
});
