class Reader {
    constructor() {
        this.notes = new Notes("reader");
    }

    startReader() {
        setInterval(() => {
            this.notes.displayNotes();
        }, 2000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reader = new Reader();
    reader.notes.displayNotes();
    reader.startReader();
});
