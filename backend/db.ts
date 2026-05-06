const { Pool } = require('pg')
const pool = new Pool ({
    host: 'db', // DB compose service name
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'financial_calc_owo'
});
module.exports = pool;
