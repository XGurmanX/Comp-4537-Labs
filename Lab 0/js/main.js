function startGame() {
    const game = new Game()
    const numOfButtons = document.getElementById("buttonNum").value
    if (numOfButtons >= 4 && numOfButtons <= 7) {
        game.createButtons(numOfButtons)
        game.drawStaticButtons()

        for (let i = 1; i <= numOfButtons; i++) {
            setTimeout(() => {
                game.setRandomPositions()
                game.drawAbsoluteButtons()
                if (i != numOfButtons - 1) {
                    console.log("This runs after " + (2) + " seconds. " + i + "th iteration");
                    
                } else {
                    console.log("Final iteration reached");
                }
            }, 2000 * i);
        }



    } else {
        alert("Please enter a number between 4 and 7")
    }   
}



