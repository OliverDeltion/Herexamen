const express = require("express");
const app = express();
const port = 3000;

const testRoutes = require("./routes/testRoutes");
const uploadRoutes = require('./routes/uploadRoutes');

app.use(express.json());
app.use("/", testRoutes);
app.use('/api', uploadRoutes);
const cors = require("cors");
app.use(cors());


app.get("/", (req, res) => res.send(`App is running on ${port}`));
app.listen(port, () => console.log(`Server running on port ${port}`));
