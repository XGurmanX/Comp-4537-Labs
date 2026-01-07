function startGame() {
    const game = new Game()
    const numOfButtons = document.getElementById("buttonNum").value
    game.createButtons(numOfButtons)
    game.drawButtons()
    // Wait numOfButtons seconds
    game.setRandomPositions()
    game.drawButtons()

}