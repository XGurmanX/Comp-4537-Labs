class Button {
    
    constructor(color, width, height, top, left, order) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.order = order;
    }

    /**
     * Sets random position for the button within the viewport
     * Equation gives back 20-80% of the viewport dimensions
     */
    setRandomPosition() {
        this.top = Math.floor((Math.random() * (window.innerHeight - window.innerHeight * 0.4)) + window.innerHeight * 0.2) + "px";
        this.left = Math.floor((Math.random() * (window.innerWidth - window.innerWidth * 0.4)) + window.innerWidth * 0.0) + "px";
    }

}