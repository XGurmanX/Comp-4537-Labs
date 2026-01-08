class Controller {

    constructor() {
        this.numOfButtons = document.getElementById("buttonNum").value
        this.game = new Game(this.numOfButtons)
        if (this.numOfButtons >= 4 && this.numOfButtons <= 7) {
            this.game.createButtons(this.numOfButtons)
        } else {
            alert(numberRangeErrorMsg)
        }
    }

    startGame() {
        this.startDelayedButtons()
    }

    startDelayedButtons() {
        this.game.drawStaticButtons()

        setTimeout(() => {

            this.drawShuffledButtons()
        }, 1000 * (this.numOfButtons - 2));

    }

    drawShuffledButtons() {
        var counter = 0;

        var myInterval = setInterval(() => {
            counter++;
            this.game.drawAbsoluteButtons(counter)
                  
            if (counter >= this.numOfButtons) {
                clearInterval(myInterval);
            }

        }, 2000);
    }
}