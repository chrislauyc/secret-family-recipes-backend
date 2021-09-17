


const sharedCofig = {
  migrations:{
    directory:"./data/migrations"
  },
  seeds:{
    directory:"./data/seeds"
  },
}
const sqliteConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      // runs after a connection is made to the sqlite engine
      conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
    }
  },
  connection: {
    filename: './data/dev.db3'
  },
}
module.exports = {
  development: {
    ...sharedCofig,
    ...sqliteConfig,
    // connection: process.env.DEV_DB_URL,
  },
  testing:{
    ...sharedCofig,
    ...sqliteConfig,
    // connection: process.env.TEST_DB_URL
  },
  production: {
    ...sharedCofig,
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};
