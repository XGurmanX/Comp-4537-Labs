class Button {
    
    constructor(color, width, height, top, left, order) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.order = order;
    }

    setLocation(top, left) {
        this.top = top;
        this.left = left;
    }

    buttonClick() {
        console.log("Button " + this.order + " clicked");
    }

    // addClickListener() {
    //     const buttonElement = document.createElement("button");
    //     console.log("addClickListener called") //REMOVE
    //     console.log(buttonElement.order)

    // }

} 