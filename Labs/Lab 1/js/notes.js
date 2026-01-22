class Notes {
  constructor(type) {
    this.type = type;
    window.localStorage.setItem("size", window.localStorage.length - 2); // 2 for isRefreshed and size
    this.orderedKeys = [];
    this.updateOrderedKeys();
  }

  displayNotes() {
    this.updateOrderedKeys();
    let container = document.getElementById("noteContainer");
    container.innerHTML = "";
    for (const key of this.orderedKeys) {
      if (
        !localStorage.hasOwnProperty(key) ||
        key === "isRefreshed" ||
        key === "size"
      ) {
        continue;
      }
      let noteDiv = document.createElement("div");
      noteDiv.id = "notes";
      noteDiv.innerText = window.localStorage.getItem(key);
      if (this.type === "writer") {
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.id = "removeButton";
        removeButton.addEventListener("click", () => this.removeNote(key));
        noteDiv.appendChild(removeButton);
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.id = "editButton";
        editButton.addEventListener("click", () => this.editNote(key));
        noteDiv.appendChild(editButton);
      }
      container.appendChild(noteDiv);
    }
    if (this.type === "writer") {
      let addButton = document.createElement("button");
      addButton.id = "addButton";
      addButton.innerText = "Add Note";
      addButton.addEventListener("click", () =>
        this.addNote(
          "message" + (parseInt(window.localStorage.getItem("size")) + 1)
        )
      );
      container.appendChild(addButton);
    }
  }

  addNote(key) {
    let newText = "New note added at key: " + key;
    window.localStorage.setItem(key, newText);
    window.localStorage.setItem(
      "size",
      parseInt(window.localStorage.getItem("size")) + 1
    );
    this.displayNotes();
  }

  removeNote(key) {
    window.localStorage.removeItem(key);
    this.displayNotes();
  }

  editNote(key) {
    let text = prompt("Enter your new text");
    window.localStorage.setItem(key, text);
    this.displayNotes();
  }

  /**
   * Update the orderedKeys array to reflect the current keys in localStorage,
   * sorted in ascending order based on the numeric part of the keys.
   *
   * Created by ChatGPT + Gurman P.
   * - Prompt: How to parse off a constant string from localStorage keys and
   *           sort them based on the numeric value that follows it
   * - Prompt given: 2026-01-18
   */
  updateOrderedKeys() {
    this.orderedKeys = [];
    for (let x in localStorage) {
      if (
        localStorage.hasOwnProperty(x) &&
        x !== "size" &&
        x !== "isRefreshed"
      ) {
        this.orderedKeys.push(x);
      }
    }

    this.orderedKeys.sort((a, b) => {
      const keyA = parseInt(a.replace("message", ""), 10);
      const keyB = parseInt(b.replace("message", ""), 10);
      return keyA - keyB;
    });
  }
}
