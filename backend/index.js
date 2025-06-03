const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const testRoutes = require("./routes/testRoutes");
const uploadRoutes = require('./routes/uploadRoutes');

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api", testRoutes); // <-- belangrijk: nu beide onder /api

app.get("/", (req, res) => res.send(`App is running on ${port}`));
app.listen(port, () => console.log(`Server running on port ${port}`));
