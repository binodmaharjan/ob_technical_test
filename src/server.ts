import app from "./app";
import { initializeDatabase } from "./utils/database";

const PORT = process.env.PORT || 8000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
