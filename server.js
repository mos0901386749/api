const express = require("express");
const cors = require("cors");
const patientRouter = require("./routes/patient.router");
const departmentsRouter = require("./routes/Departmen.route");
const doctorRouter = require("./routes/Doctor.router");
const questionaireRouter = require("./routes/Questionaire.router")
const authoritiesRouter = require("./routes/Authorities.route")
const queuestatusRouter = require("./routes/Queuestatus.router")
const queueRouter = require("./routes/Queue.router")
const hospitalRouter = require("./routes/Hospital.router")
// Create Server
const app = express();

//Use Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.get("/", (req, res) => {
  res.send("<h1>This is patient API</h1>");
});
// patientRouter
app.use("/apis", patientRouter);

app.use("/apis", departmentsRouter);

app.use("/apis", doctorRouter);

app.use("/apis",questionaireRouter);

app.use("/apis",authoritiesRouter)

app.use("/apis", queuestatusRouter);

app.use("/apis", queueRouter);

app.use("/apis", hospitalRouter);
// Running server
app.listen(5000, () => {
  console.log("Server listening to port 5000");
});
