const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRouter = require("./router/projectRouter");
const authRoutes = require('./router/authRoutes');
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api", projectRouter);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
