require("dotenv").config();
const http = require("http");
const url = require("url");
const { createPool } = require("./database");

const PORT = 8080;

http.createServer(async (req, res) => {

    const pool = await createPool();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    const parsedUrl = url.parse(req.url, true);

    try {

        // POST → INSERT
        if (req.method === "POST" && parsedUrl.pathname === "/insert") {

            await pool.query(`
                CREATE TABLE IF NOT EXISTS patient (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    dateOfBirth DATETIME
                ) ENGINE=InnoDB
            `);

            await pool.query(
                "INSERT INTO patient (name, dateOfBirth) VALUES (?, ?)",
                ["John Doe", "2000-01-01"]
            );

            res.end(JSON.stringify({ message: "Inserted" }));
        }

        // GET → SELECT
        else if (req.method === "GET" && parsedUrl.pathname.startsWith("/sql/")) {

            const sqlQuery = decodeURIComponent(
                parsedUrl.pathname.replace("/sql/", "")
            );

            const [rows] = await pool.query(sqlQuery);

            res.end(JSON.stringify(rows));
        }

        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Not Found" }));
        }

    } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
    }

}).listen(PORT, () => {
    console.log("Server running on port", PORT);
});
