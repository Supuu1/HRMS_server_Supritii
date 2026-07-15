let express = require("express");
let cors = require("cors");

let router = require("./Routes/route");
let employee_router = require("./Routes/employee_route");
require("./Database/db");

let app = express();

app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.use("/", router);
app.use("/", employee_router);

app.listen(8000, () => {
  console.log("port is active 8000");
});