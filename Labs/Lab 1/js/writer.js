class Writer {
    constructor() {
        this.notes = new Notes("writer");
    }

    startWriter() {
        setInterval(() => {
            this.updateTime();
            this.notes.displayNotes();
        }, 2000);
    }

    updateTime() {
        const timeContainer = document.getElementById("timeContainer");
        const now = new Date();
        timeContainer.innerText = "Time is: " + now.toLocaleString();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const writer = new Writer();
    writer.updateTime();
    writer.notes.displayNotes();
    writer.startWriter();
});
