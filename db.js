const mysql = require("mysql2/promise");

async function connectDB() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "expresscrud",
  });

  global.connection = connection;
  return global.connection;
}

async function listHeros() {
  const connection = await connectDB();
  const [heros] = await connection.query("select id, code, name, firstspell, secondspell, thirdspell, ultimatespell from hero;");

  return heros;
}

async function insertHero(hero) {
  const connection = await connectDB()

  const sql = "insert into hero(code, name, firstspell, secondspell, thirdspell, ultimatespell) values(?, ?, ?, ?, ?, ?);"

  return await connection.query(sql, [hero.code, hero.name, hero.firstspell, hero.secondspell, hero.thirdspell, hero.ultimatespell])
}

async function deleteHero(code){
  const connection = await connectDB();
  const sql = "delete from hero where code=?;"
  return await connection.query(sql, [code])
}

module.exports = { listHeros, insertHero, deleteHero }; 
