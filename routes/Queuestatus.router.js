const express = require("express");
const Qsrouter = express.Router();
const Queuestatus = require("../models/Queuestatus.model");
// Insert departments to database
//http://localhost:5000/apis/queuestatus
Qsrouter.post("/queuestatus", (req, res) => {
  //Create a queuestatus
  const newQueuestatus = new Queuestatus({
    queue_status_id: req.body.queue_status_id,
    queue_status_name: req.body.queue_status_name,
  });

  //Save to Database
Queuestatus.create(newQueuestatus, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Queuestatus",
      });
    else res.send(data);
  });
});

//Get queuestatus by Id
//http://localhost:5000/apis/departments/1
Qsrouter.get("/queuestatus/:id", (req, res) => {
  const statusId = Number.parseInt(req.params.id);
  Queuestatus.getById(statusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `departments not found with this id ${statusId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + statusId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all queuestatus
//http://localhost:5000/apis/queuestatus
Qsrouter.get("/queuestatus", (req, res) => {
  Queuestatus.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving queuestatus",
      });
    } else {
      res.send(data);
    }
  });
});

//Update restaurant Data
//http://localhost:5000/apis/departments/1
// //Qsrouter.put("/queuestatus/:id", (req, res) => {
//   const statusId = Number.parseInt(req.params.id);
//   //Check empty body
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res.status(400).send({
//       message: "Content can not be empty !",
//     });
//   }
//   Queuestatus.updateById(statusId, new Queuestatus(req.body), (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `doctor not found with this id ${statusId}`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Error updating doctor data with this id " + statusId,
//         });
//       }
//     } else {
//       res.send(data);
//     }
//   });
// });

//http://localhost:5000/apis/queuestatus/1
Qsrouter.delete("/queuestatus/:id", (req, res) => {
  const statusId = Number.parseInt(req.params.id);
  Queuestatus.removeById(statusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Doctor not found with this id ${statusId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Doctor data with this id " + statusId,
        });
      }
    } else {
      res.send({ message: "Doctor is deleted successfully" });
    }
  });
});

module.exports = Qsrouter;
