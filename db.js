// db.js
import { Pool } from "pg";

// Create a new pool with your database configuration
const pool = new Pool({
  user: "mun44_",
  host: "localhost",
  database: "greatbeartechnology",
  password: "Linux@1862",
  port: 5432,
});

export default pool;
