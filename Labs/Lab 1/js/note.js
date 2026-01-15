class Note {
    constructor(key, text, type) {
        this.key = key
        this.text = text
        this.type = type
        if (this.type === "writer") {
            this.removeButton = document.createElement('button')
            this.removeButton.addEventListener('click', () => this.remove())
            this.removeButton.innerText = 'Remove'
        } 
    }

    store() {
        localStorage.setItem(this.key, this.text)
    }

    remove() {
        localStorage.removeItem(this.key)
    }

}