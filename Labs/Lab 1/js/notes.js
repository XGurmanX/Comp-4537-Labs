class Notes {

    constructor(type) {
        this.type = type
        this.arrayOfNotes = []
    }

    add(note) {
        this.arrayOfNotes.push(note)
    }

    displayNotes() {
        let container = document.getElementById("noteContainer")
        container.innerHTML = ""
        for (let note of this.arrayOfNotes) {
            let noteDiv = document.createElement("div")
            noteDiv.innerText = note.text
            noteDiv.appendChild(note.removeButton)
            container.appendChild(noteDiv)
        }
    }

    createNotes() {
        for (const key in localStorage) {
            const value = localStorage.getItem(key)
            this.arrayOfNotes.push(new Note(key, value, this.type))

        }
    }
}