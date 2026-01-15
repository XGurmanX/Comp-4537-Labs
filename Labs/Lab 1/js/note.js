class Note {
    constructor(key, text) {
        this.key = key
        this.text = text
    }

    store() {
        localStorage.setItem(this.key, this.text)
    }

}