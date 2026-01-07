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
                "10em",
                "5em",
                "100px",
                "100px",
                index
            ))
            console.log("Button Created") //REMOVE
        }
        console.log(this.arrayButtons) //REMOVE
    }

    setRandomPositions() {
        this.arrayButtons.forEach(element => {
            element.setLocation(
                Math.floor(Math.random() * 10) + "em",
                Math.floor(Math.random() * 10) + "em"
            )
            console.log("Set random values for button") //REMOVE
        });
    }

    drawButtons1() {
        console.log("Draw Buttons Called") //REMOVE

        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""

        this.arrayButtons.forEach(button => {
            var element = document.createElement("button")

            element.style.position = "static"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.textContent = button.order + 1

            buttonContainer.appendChild(element)
            
        });
    }

        drawButtons2() {
        console.log("Draw Buttons Called") //REMOVE

        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""

        this.arrayButtons.forEach(button => {
            var element = document.createElement("button")

            element.style.position = "absolute"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.style.top = button.top
            element.style.left = button.left
            element.style.zIndex = button.order
            element.textContent = button.order + 1

            buttonContainer.appendChild(element)
            
        });
    }
}