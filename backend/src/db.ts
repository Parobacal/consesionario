import mysql from 'mysql2';

import key from './key';

const pool = mysql.createPool(key.database);

pool.getConnection(function(err,conn){
    if (!err){
        console.log('DB is conected');
    } else {
        console.log(err);
    }
});

export default pool;