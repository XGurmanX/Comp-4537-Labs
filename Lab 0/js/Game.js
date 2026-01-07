class Game {

    constructor() {
        this.arrayOfColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"];
        this.arrayButtons = [];
        console.log("Constructor Called") //REMOVE
    }

    createButtons(numOfButtons) {
        this.arrayButtons = [];
        console.log("Func called") //REMOVE
        console.log(numOfButtons)
        for (let index = 0; index < numOfButtons; index++) {
            this.arrayButtons.push(new Button(
                this.arrayOfColors[index],
                "100px",
                "100px",
                "0px",
                "0px",
                index
            ))
            console.log("Button Created") //REMOVE
        }
        console.log(this.arrayButtons) //REMOVE
    }

    setRandomPositions() {
        this.arrayButtons.forEach(element => {
            element.setLocation(
                Math.floor(Math.random() * 100) + "px",
                Math.floor(Math.random() * 100) + "px"
            )
            console.log("Set random values for button") //REMOVE
        });
    }

    drawButtons() {
        this.arrayButtons.forEach(button => {
            button = document.createElement("button")
            
        });
    }
}