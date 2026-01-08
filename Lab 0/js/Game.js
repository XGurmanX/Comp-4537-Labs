class Game {

    constructor() {
        this.arrayOfColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"];
        this.arrayButtons = [];
        console.log("constructor Called") //REMOVE
    }

    createButtons(numOfButtons) {
        this.arrayButtons = [];
        console.log("createButtons called") //REMOVE
        console.log(numOfButtons)
        for (let index = 0; index < numOfButtons; index++) {
            this.arrayButtons.push(new Button(
                this.arrayOfColors[index],
                "10em",
                "5em",
                "100px",
                "100px",
                index + 1
            ))
            console.log("Button Created") //REMOVE
        }
        console.log(this.arrayButtons) //REMOVE
    }

    setRandomPositions() {
        this.arrayButtons.forEach(element => {
            element.setLocation(
                Math.floor(Math.random() * 500) + "px",
                Math.floor(Math.random() * 500) + "px"
            )
            console.log("setRandomPositions for button") //REMOVE
        });
    }

    drawStaticButtons() {
        console.log("drawStaticButtons Called") //REMOVE

        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""

        this.arrayButtons.forEach(button => {
            var element = document.createElement("button")

            element.style.position = "static"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.textContent = button.order

            buttonContainer.appendChild(element)
            
        });
    }

    drawAbsoluteButtons() {
        console.log("drawAbsoluteButtons Called") //REMOVE

        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""
        
        buttonContainer.addEventListener("click", (event) => {
            this.arrayButtons.forEach(element => {
                if (event.target.dataset.order == element.order) {
                    element.buttonClick()
                }
            });
        });


        this.arrayButtons.forEach(button => {
            var element = document.createElement("button")

            element.style.position = "absolute"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.style.top = button.top
            element.style.left = button.left
            element.dataset.order = button.order

            buttonContainer.appendChild(element)
            
        });
    }
}