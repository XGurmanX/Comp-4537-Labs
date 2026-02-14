require("dotenv").config();
const { createPool } = require("./database");

async function testDB() {
  try {
    const pool = await createPool();

    console.log("Connected to DB...");

    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patient (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        age INT
      ) ENGINE=InnoDB
    `);

    console.log("Table ensured.");

    // Insert test row
    await pool.query(
      "INSERT INTO patient (first_name, last_name, age) VALUES (?, ?, ?)",
      ["John", "Doe", 30]
    );

    console.log("Row inserted.");

    // Select rows
    const [rows] = await pool.query("SELECT * FROM patient");

    console.log("Rows:");
    console.table(rows);

    process.exit(0);
  } catch (err) {
    console.error("DB ERROR:");
    console.error(err);
    process.exit(1);
  }
}

testDB();