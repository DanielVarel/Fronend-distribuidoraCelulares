const oracledb = require('oracledb');

db = {
    user: 'administrador',
    password: '12345',
    connectString: 'localhost:1521'
}

async function open(sql, binds, autoCommit){
    let con = await oracledb.getConnection(db);
    let result = await con.execute(sql, binds, {autoCommit});
    con.release();
    return result;
}

exports.Open = open;