class Game {

    constructor() {
        this.arrayOfColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"];
        this.arrayButtons = [];
        console.log("Constructor Called")
    }

    createButtons(numOfButtons) {
        this.arrayButtons = [];
        console.log("Func called")
        console.log(numOfButtons)
        for (let index = 0; index < numOfButtons; index++) {
            arrayButtons.push(new Button(
                arrayOfColors[index],
                "100px",
                "100px",
                "0px",
                "0px",
                index
            ))
            console.log("Button Created")
            // arrayButtons[index] = new Button(
            //     arrayOfColors[index],
            //     "100px",
            //     "100px",
            //     "0px",
            //     "0px",
            //     index
            // )
        }
        console.log(this.arrayButtons)
    }
}