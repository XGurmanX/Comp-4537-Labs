const MESSAGES = {
    message1: "Never trust a computer you can't throw out a window.",
    message2: "When you ask a question thats meant to return a boolean and you end up with a string.",
    message3: "This job would be a lot easier if it wasn't for the users",
    message4: "I’d tell you an UDP joke, but I wouldn’t know if you got it.",
    message5: "There are 10 types of people in the world: those who understand binary, and those who don’t."
}

for (const key in MESSAGES) {
    window.localStorage.setItem(key, MESSAGES[key]);
}