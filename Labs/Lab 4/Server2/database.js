/**
 * db.js
 *
 * This module creates and exports a MySQL connection pool.
 *
 * It supports two environments:
 * 1. Local development (direct public IP connection)
 * 2. Cloud Run deployment (Cloud SQL Connector)
 *
 * Environment detection is automatic:
 * - If K_SERVICE exists → running in Cloud Run
 * - Otherwise → running locally
 */

const mysql = require("mysql2/promise");
const { Connector } = require("@google-cloud/cloud-sql-connector");

/**
 * Determines whether the application is running in Cloud Run.
 * Cloud Run automatically injects the K_SERVICE environment variable.
 */
const isCloudRun = process.env.K_SERVICE !== undefined;

/**
 * Determines which IP type to use for Cloud SQL.
 * PRIVATE_IP must be set to "true" or "1" to enable private IP.
 * Defaults to PUBLIC if not specified.
 */
const getIpType = () =>
  process.env.PRIVATE_IP === "1" || process.env.PRIVATE_IP === "true"
    ? "PRIVATE"
    : "PUBLIC";

/**
 * createPool()
 *
 * Initializes and returns a MySQL connection pool.
 *
 * Local:
 *   - Connects using DB_HOST and DB_PORT
 *   - Requires Authorized Network configuration in Cloud SQL
 *
 * Cloud Run:
 *   - Uses Cloud SQL Connector
 *   - Does NOT require authorized networks
 *   - Connects securely via Google internal networking
 */
async function createPool() {
  if (isCloudRun) {
    console.log("Running in Cloud Run environment");

    const connector = new Connector();

    /**
     * Retrieve connection options from Cloud SQL Connector.
     * instanceConnectionName format:
     * PROJECT_ID:REGION:INSTANCE_NAME
     */
    const clientOpts = await connector.getOptions({
      instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
      ipType: getIpType(),
    });

    return mysql.createPool({
      ...clientOpts,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      // Connection pool tuning
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } else {
    console.log("Running in LOCAL environment");

    /**
     * Direct TCP connection using public IP.
     * Requires:
     * - DB_HOST (Cloud SQL public IP)
     * - DB_PORT (usually 3306)
     * - Authorized Network entry in Cloud SQL
     */
    return mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
}

module.exports = { createPool };