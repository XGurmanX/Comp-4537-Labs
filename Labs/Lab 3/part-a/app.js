const MathUtils = require('./math.js');

class App {
    run() {
        const math = new MathUtils();

        console.log(`Gurman debugging: 5 + 10 = ${math.add(5, 10)}`);
        console.log(`Gurman debugging: 10 - 5 = ${math.subtract(10, 5)}`);
    }
}

new App().run();