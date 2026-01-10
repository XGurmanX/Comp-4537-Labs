class Controller {

    constructor() {
        this.numOfButtons = document.getElementById("buttonNum").value
        this.game = new Game(this.numOfButtons)
        if (this.numOfButtons >= 4 && this.numOfButtons <= 7) {
            this.game.createButtons(this.numOfButtons)
        } else {
            this.numOfButtons = undefined;
            alert(MESSAGES.numberRangeErrorMsg)
        }
    }

    startGame() {
        if (this.numOfButtons != undefined) {
            const startButton = document.getElementById("startButton")
            startButton.disabled = true;
            this.startDelayedButtons()
        }
    }

    startDelayedButtons() {
        this.game.drawStaticButtons()

        setTimeout(() => {
            this.drawShuffledButtons()
        }, 1000 * (this.numOfButtons - 2));

    }

    drawShuffledButtons() {
        let counter = 0;

        const myInterval = setInterval(() => {
            counter++;
            this.game.drawAbsoluteButtons(counter)
                  
            if (counter >= this.numOfButtons) {
                clearInterval(myInterval);
            }

        }, 2000);
    }

}