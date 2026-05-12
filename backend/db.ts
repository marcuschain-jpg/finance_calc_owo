const { Pool } = require('pg')
const pool = new Pool ({
    host: 'db', // DB docker compose service name
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'finance_calc_owo'
});
export default pool;
