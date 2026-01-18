class Note {
    constructor(key, text) {
        this.key = key
        this.text = text
    }

    edit(newText) {
        this.text = newText
    }
}