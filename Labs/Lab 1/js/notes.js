class Notes {
    constructor(type) {
        this.type = type;
        this.localStorage = window.localStorage;
        this.arrayOfNotes = [];
    }

    displayNotes() {
        let container = document.getElementById("noteContainer");
        container.innerHTML = '';
        this.arrayOfNotes.forEach(note => {
            let noteDiv = document.createElement("div");
            noteDiv.id = "notes"
            noteDiv.innerText = note.text;
            if (this.type === "writer") {
                let removeButton = document.createElement('button')
                removeButton.innerText = 'Remove'
                removeButton.id = 'removeButton'
                removeButton.addEventListener('click', () => this.remove(note.key));
                noteDiv.appendChild(removeButton);
            }
            container.appendChild(noteDiv);
        });
        if (this.type === "writer") {
            let addButton = document.createElement('button');
            addButton.id = 'addButton'
            addButton.innerText = 'Add Note';
            addButton.addEventListener('click', () => this.add("", "message" + (this.arrayOfNotes.length + 1)));
            container.appendChild(addButton);
        }
        if (this.type === "reader") {
            let myInterval = setInterval(() => {
                this.displayNotes();
            }, 2000);
        }
    }

    createNotes() {
        for (const key in window.localStorage) {
            window.localStorage.hasOwnProperty(key)
            const value = window.localStorage.getItem(key);
            this.arrayOfNotes.push(new Note(key, value));
        }
        this.displayNotes();
    }

    remove(key) {
        this.arrayOfNotes.forEach(note => {
            if (note.key === key) {
                const index = this.arrayOfNotes.indexOf(note);
                if (index > -1) {
                    this.arrayOfNotes.splice(index, 1);
                }
            }
        });
        this.displayNotes();
    }

    add(text, key) {
        this.arrayOfNotes.push(new Note(key, text));
        this.displayNotes();
    }
}
