const { Pool } = import('pg');

// Set up configuration for the pool
const poolConfig = {
  user:"root",
  password:"",
  host: "127.0.0.1",
  database:"ADT_SEB",
  port: 3306,
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

// Create a new pool with the configuration
const Pool = require('./path/to/pool');
const pool = new Pool(poolConfig);

// Test the connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully');
  }
});

// Export the pool for use in other parts of the application
export default Pool;
