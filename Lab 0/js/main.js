function startGame() {
    const game = new Game()
    const numOfButtons = document.getElementById("buttonNum").value
    if (numOfButtons >= 4 && numOfButtons <= 7) {
        game.createButtons(numOfButtons)
        game.drawButtons1()
        setTimeout(() => {
            console.log("This runs after " + numOfButtons + " seconds.");
            game.setRandomPositions()
            game.drawButtons2()
        }, numOfButtons * 1000);

    } else {
        alert("Please enter a number between 4 and 7")
    }
}

