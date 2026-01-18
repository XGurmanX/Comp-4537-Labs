class Notes {
    constructor(type) {
        this.type = type;
        window.localStorage.setItem("size", window.localStorage.length - 1);
        this.orderedKeys = [];
        this.updateOrderedKeys()
    }

    displayNotes() {
        this.updateOrderedKeys()
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
    }
    
    addNote(key) {
        let newText = "New note added at key: " + key;
        window.localStorage.setItem(key, newText);
        window.localStorage.setItem("size", parseInt(window.localStorage.getItem("size")) + 1);
        this.displayNotes();
    }

    removeNote(key) {
        window.localStorage.removeItem(key);
        this.displayNotes();
    }

    /**
     * Update the orderedKeys array to reflect the current keys in localStorage,
     * sorted in ascending order based on the numeric part of the keys.
     * 
     * Created by ChatGPT.
     * - Prompt: How to parse off a constant string from localStorage keys and 
     *           sort them based on the numeric value that follows it
     * - Prompt given: 2026-01-18
     */
    updateOrderedKeys() {
        this.orderedKeys = [];

        for (let x in localStorage) {
            if (localStorage.hasOwnProperty(x) && x !== "size") {
                this.orderedKeys.push(x);
            }
        }

        console.log("Before sort:", this.orderedKeys);

        this.orderedKeys.sort((a, b) => {
            const keyA = parseInt(a.replace("message", ""), 10);
            const keyB = parseInt(b.replace("message", ""), 10);
            return keyA - keyB;
        });

        console.log("After sort:", this.orderedKeys);
    }
}
