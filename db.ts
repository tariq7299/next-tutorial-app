require('dotenv').config();
const { Pool } = require('pg');

// const { Pool } = pg

console.log(process.env.POSTGRES_URL);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_DATABASE);
console.log(process.env.POSTGRES_PASSWORD);

const connectionPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});


export default connectionPool;