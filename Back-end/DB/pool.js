const mysql = require('mysql');

const pool = mysql.createPool({
    insecureAuth: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

})

module.exports = (query) =>{
    query = mysql.format(query);
    return new Promise((resolve , reject)=>{
        pool.query(query , (error , result)=>{
            if(error)
               return reject(error)

            return resolve(result)
        })
    })

}