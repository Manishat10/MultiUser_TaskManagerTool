require('dotenv').config();
const app = require('./app');
const AppDataSource = require('./config/ormconfig');

const PORT = process.env.PORT || 5000;

// You MUST init DataSource BEFORE starting server!
AppDataSource.initialize()
  .then(() => {
    console.log("[TypeORM] Database started!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[TypeORM] Initialization error:", err);
    process.exit(1);
  });
