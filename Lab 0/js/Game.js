class Game {

    constructor(numOfButtons) {
        this.numOfButtons = numOfButtons;
        this.arrayOfColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"];
        this.arrayOfColorsUsed = [];
        this.arrayOfButtons = [];
        this.arrayOfButtonsClicked = [];
    }

    createButtons() {
        this.arrayOfButtons = [];
        for (let index = 0; index < this.numOfButtons; index++) {
            this.arrayOfButtons.push(new Button(
                this.getRandomColor(),
                "10em",
                "5em",
                "100px",
                "100px",
                index + 1
            ))
        }
    }

    getRandomColor() {
        while (true) {
            let x = Math.random() * this.arrayOfColors.length
            x = Math.floor(x)
            let color = this.arrayOfColors[x]
            this.arrayOfColorsUsed.push(color)
            this.arrayOfColors.splice(x, 1)
            return color
        }
    }

    setRandomPositions() {
        this.arrayOfButtons.forEach(element => {
            element.setLocation(
                Math.floor((Math.random() * 500) + 100) + "px",
                Math.floor(Math.random() * 500) + "px"
            )
        });
    }

    drawStaticButtons() {
        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""

        this.arrayOfButtons.forEach(button => {
            let element = document.createElement("button")

            element.style.position = "static"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.textContent = button.order

            buttonContainer.appendChild(element)
            
        });
    }

    drawAbsoluteButtons(index) {
        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""

        this.arrayOfButtons.forEach(button => {

            button.setRandomPosition()

            let element = document.createElement("button")

            element.style.position = "absolute"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.style.top = button.top
            element.style.left = button.left
            element.dataset.order = button.order

            buttonContainer.appendChild(element)
        
        });

        if (index == this.numOfButtons) {
            buttonContainer.addEventListener("click", (event) => {
                this.arrayOfButtons.forEach(button => {
                    if (event.target.dataset.order == button.order) {
                        this.buttonClicked(button)
                    }
                });
            });
        }

    }
    
    buttonClicked(button) {
        this.arrayOfButtonsClicked.push(button)
        this.checkButtonPicked(button)
    }

    checkButtonPicked(button) {
        for (let i = 0; i < this.arrayOfButtonsClicked.length; i++) {
            if (this.arrayOfButtonsClicked[i].order != i + 1) {
                alert(MESSAGES.gameOverMsg)
                this.endGame()
                return
            }

        }

        if (button.order == this.arrayOfButtonsClicked.length) {
            this.revealButtonOrder(button)
        }

        if (this.arrayOfButtonsClicked.length == this.numOfButtons) {
            alert(MESSAGES.gameWinMsg)
            this.endGame()
            return
        }
    }

    revealButtonOrder(button) {
        const buttonContainer = document.getElementById("ButtonContainer")

        let element = buttonContainer.children[button.order - 1]

        element.style.position = "absolute"
        element.style.width = button.width
        element.style.height = button.height
        element.style.backgroundColor = button.color
        element.style.top = button.top
        element.style.left = button.left
        element.textContent = button.order

    }

    revealAllButtonOrder() {
        const buttonContainer = document.getElementById("ButtonContainer")
        buttonContainer.innerHTML = ""

        this.arrayOfButtons.forEach(button => {
            const element = document.createElement("button")

            element.style.position = "absolute"
            element.style.width = button.width
            element.style.height = button.height
            element.style.backgroundColor = button.color
            element.style.top = button.top
            element.style.left = button.left
            element.textContent = button.order

            buttonContainer.appendChild(element)
        });
    }

    endGame() {
        this.revealAllButtonOrder()

        setTimeout(() => {
            this.arrayOfButtons = []
            this.arrayOfButtonsClicked = []
            this.numOfButtons = 0
            this.drawStaticButtons()
        }, 1000 * this.numOfButtons);
    }
    
}