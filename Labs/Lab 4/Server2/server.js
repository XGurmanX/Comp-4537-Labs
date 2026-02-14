require("dotenv").config();
const http = require("http");
const url = require("url");
const { createPool } = require("./database");

const PORT = process.env.PORT || 8080;

async function ensureTable(pool) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS patient (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            dateOfBirth DATETIME
        ) ENGINE=InnoDB
    `);
}

const server = http.createServer(async (req, res) => {

    const pool = await createPool();
    const parsedUrl = url.parse(req.url, true);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    try {

        // ===== POST INSERT =====
        if (req.method === "POST" && parsedUrl.pathname === "/lab5/api/v1/insert") {

            await ensureTable(pool);

            const patients = [
                ["Sara Brown", "1901-01-01"],
                ["John Smith", "1941-01-01"],
                ["Jack Ma", "1961-01-30"],
                ["Elon Musk", "1999-01-01"]
            ];

            for (const p of patients) {
                await pool.query(
                    "INSERT INTO patient (name, dateOfBirth) VALUES (?, ?)",
                    p
                );
            }

            res.end(JSON.stringify({ message: "Rows inserted" }));
        }

        // ===== GET SQL =====
        else if (req.method === "GET" && parsedUrl.pathname.startsWith("/lab5/api/v1/sql/")) {

            const sqlQuery = decodeURIComponent(
                parsedUrl.pathname.replace("/lab5/api/v1/sql/", "")
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
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
