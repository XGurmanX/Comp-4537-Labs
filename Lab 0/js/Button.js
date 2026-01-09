class Button {
    
    constructor(color, width, height, top, left, order) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.order = order;
    }

    setRandomPosition() {
        this.top = Math.floor(Math.random() * 500) + "px";
        this.left = Math.floor(Math.random() * 500) + "px";
    }

}