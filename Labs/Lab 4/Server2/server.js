require("dotenv").config();
const http = require("http");
const { URL } = require("url");
const { createPool } = require("./database");
const messages = require("./lang/messages");

// Attribution: Generated with AI assistance and manually verified/edited.
const PORT = process.env.PORT || 8080;
const API_PREFIX = process.env.API_PREFIX || "/lab4/api/v1";
const PATIENT_ROWS = [
  ["John", "Doe", 30],
  ["Jane", "Smith", 25],
  ["Alex", "Johnson", 34],
];

let writePool;
let readPool;

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function ensurePools() {
  if (!writePool) {
    writePool = await createPool(process.env.WRITE_USER, process.env.WRITE_PASS);
  }
  if (!readPool) {
    readPool = await createPool(process.env.READ_USER, process.env.READ_PASS);
  }
}

async function ensurePatientTable() {
  await writePool.query(`
    CREATE TABLE IF NOT EXISTS patient (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      age INT NOT NULL
    ) ENGINE=InnoDB
  `);
}

http
  .createServer(async (req, res) => {
    setCorsHeaders(res);
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = reqUrl.pathname;

    try {
      await ensurePools();

      if (req.method === "POST" && pathname === `${API_PREFIX}/insert`) {
        await ensurePatientTable();
        await writePool.query("INSERT INTO patient (first_name, last_name, age) VALUES ?", [
          PATIENT_ROWS,
        ]);
        sendJson(res, 200, {
          message: messages.insertSuccess,
          tableStatus: messages.tableCreated,
          insertedRows: PATIENT_ROWS.length,
        });
        return;
      }

      if (req.method === "GET" && pathname.startsWith(`${API_PREFIX}/sql/`)) {
        const encodedSql = pathname.slice(`${API_PREFIX}/sql/`.length);
        const sqlQuery = decodeURIComponent(encodedSql);
        const [rows] = await readPool.query(sqlQuery);
        sendJson(res, 200, rows);
        return;
      }

      sendJson(res, 404, { error: messages.notFound });
    } catch (error) {
      const code = error && error.code ? error.code : "";
      if (code === "ER_TABLEACCESS_DENIED_ERROR" || code === "ER_DBACCESS_DENIED_ERROR") {
        sendJson(res, 403, { error: messages.onlySelectAllowed });
        return;
      }
      sendJson(res, 500, { error: messages.internalError, details: error.message });
    }
  })
  .listen(PORT, () => {
    console.log(`Lab 4 API listening on port ${PORT}`);
  });