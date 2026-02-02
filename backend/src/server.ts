import express from "express";
import cors from "cors";
import helmet from "helmet";
import favoritesRoutes from "./routes/favorites.routes.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/favorites", favoritesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
