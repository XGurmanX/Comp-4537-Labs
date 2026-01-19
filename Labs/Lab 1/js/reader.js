class Reader {
    constructor() {
        this.notes = new Notes("reader");
    }

    startReader() {
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
    const reader = new Reader();
    reader.updateTime();
    reader.notes.displayNotes();
    reader.startReader();
});
