function startGame() {
    const game = new Game()
    const numOfButtons = (document.getElementById("buttonNum"))
    game.createButtons(numOfButtons)
}