import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import dns from "node:dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/visitors", visitorRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/visitors`);
});
