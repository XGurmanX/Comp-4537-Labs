const mysql = require("mysql2/promise");
const { Connector } = require("@google-cloud/cloud-sql-connector");

const isCloudRun = process.env.K_SERVICE !== undefined;

const getIpType = () =>
  process.env.PRIVATE_IP === "1" || process.env.PRIVATE_IP === "true"
    ? "PRIVATE"
    : "PUBLIC";

async function createPool(dbUser, dbPass) {
  const user = dbUser || process.env.DB_USER;
  const password = dbPass || process.env.DB_PASS;

  if (isCloudRun) {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
      instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
      ipType: getIpType(),
    });

    return mysql.createPool({
      ...clientOpts,
      user,
      password,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user,
    password,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

module.exports = { createPool };
