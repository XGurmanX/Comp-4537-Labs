class Notes {
    constructor(type) {
        this.type = type;
        this.localStorage = window.localStorage;
    }

    displayNotes() {
        let container = document.getElementById("noteContainer");
        container.innerHTML = '';
        for (const key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            let noteDiv = document.createElement("div");
            noteDiv.id = "notes"
            noteDiv.innerText = this.localStorage.getItem(key);
            if (this.type === "writer") {
                let removeButton = document.createElement('button')
                removeButton.innerText = 'Remove'
                removeButton.id = 'removeButton'
                removeButton.addEventListener('click', () => this.removeNote(key));
                noteDiv.appendChild(removeButton);
            }
            container.appendChild(noteDiv);
        }
        if (this.type === "writer") {
            let addButton = document.createElement('button');
            addButton.id = 'addButton'
            addButton.innerText = 'Add Note';
            addButton.addEventListener('click', () => this.addNote("message" + (this.localStorage.length + 1))); // FIX
            container.appendChild(addButton);
        }
        if (this.type === "reader") {
            let myInterval = setInterval(() => {
                this.displayNotes();
            }, 2000);
        }
    }

    removeNote(key) {
        this.localStorage.removeItem(key);
        this.displayNotes();
    }

    addNote(key) {
        let newText = prompt("Enter note text:");
        this.localStorage.setItem(key, newText);
        this.displayNotes();
    }



}
