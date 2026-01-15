class Notes {
    constructor(type) {
        this.type = type;
        this.arrayOfNotes = [];
    }

    displayNotes() {
        let container = document.getElementById("noteContainer");
        for (let note of this.arrayOfNotes) {
            let noteDiv = document.createElement("div");
            noteDiv.innerText = note.text;
            if (this.type === "writer") {
                noteDiv.appendChild(note.removeButton);
            }
            container.appendChild(noteDiv);
        }
    }

    createNotes() {
        for (const key in MESSAGES) {
            const value = MESSAGES[key]
            this.arrayOfNotes.push(new Note(key, value, this.type));
        }
        console.log(this.arrayOfNotes);
        this.displayNotes();
    }

    add(note) {
        this.arrayOfNotes.push(note);
    }
}
