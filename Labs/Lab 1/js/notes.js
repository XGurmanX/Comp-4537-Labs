class Notes {
    constructor(type) {
        this.type = type;
        window.localStorage.setItem("size", window.localStorage.length - 1);
        this.orderedKeys = [];
        this.makeOrderedKeys()

    }

    displayNotes() {
        let container = document.getElementById("noteContainer");
        container.innerHTML = '';
        for (const key of this.orderedKeys) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            let noteDiv = document.createElement("div");
            noteDiv.id = "notes"
            noteDiv.innerText = window.localStorage.getItem(key);
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
            addButton.addEventListener('click', () => this.addNote("message" + (parseInt(window.localStorage.getItem("size")) + 1)));
            container.appendChild(addButton);
        }
        if (this.type === "reader") {
            let myInterval = setInterval(() => {
                this.displayNotes();
            }, 2000);
        }
    }

    removeNote(key) {
        window.localStorage.removeItem(key);
        console.log(`Removed note with key: ${key}`);
        console.log(window.localStorage);
        this.displayNotes();
    }

    addNote(key) {
        let newText = "New note added at key: " + key;
        console.log(`Adding note with key: ${key}`);
        window.localStorage.setItem(key, newText);
        window.localStorage.setItem("size", parseInt(window.localStorage.getItem("size")) + 1);
        this.displayNotes();
    }

    makeOrderedKeys() {
        this.orderedKeys = []
        for (let i = 1; i <= window.localStorage.length; i++) {
            this.orderedKeys.push("message" + i);
        }
    }
}
