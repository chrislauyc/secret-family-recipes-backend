require("dotenv").config();
const pg = require("pg");

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}
const sharedCofig = {
  migrations:{
    directory:"./data/migrations"
  },
  seeds:{
    directory:"./data/seeds"
  },
}

module.exports = {
  development: {
    ...sharedCofig,
    client:"pg",
    connection: process.env.DEV_DATABASE_URL,
    // connection: process.env.DEV_DB_URL,
    seeds:{
      directory:"./data/test-seeds"
    },
  },
  testing:{
    ...sharedCofig,
    client:"pg",
    connection: process.env.TEST_DATABASE_URL,
    // connection: process.env.TEST_DB_URL
    seeds:{
      directory:"./data/test-seeds"
    },
  },
  production: {
    ...sharedCofig,
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};
