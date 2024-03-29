const devConfigs = {
  type: "sqlite",
  database: "./src/database/database.sqlite",
  entities: ["./src/models/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};

module.exports = devConfigs;
