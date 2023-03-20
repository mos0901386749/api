const express = require("express");
const Dorouter = express.Router();
const Doctors = require("../models/Doctor.model");
// Insert departments to database
//http://localhost:5000/apis/doctors
Dorouter.post("/doctors", (req, res) => {
  //Create a departments
  const newDoctor = new Doctors({
    doctor_id: req.body.doctor_id,
    doctor_name: req.body.doctor_name,
    doctor_phonenumber: req.body.doctor_phonenumber,
    department_id: req.body.department_id,
  });

  //Save to Database
  Doctors.create(newDoctor, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Doctor",
      });
    else res.send(data);
  });
});

//Get doctors by Id
//http://localhost:5000/apis/doctors/1
Dorouter.get("/doctors/:id", (req, res) => {
  const doctorsId = Number.parseInt(req.params.id);
  Doctors.getById(doctorsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Doctors not found with this id ${doctorsId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + doctorsId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all doctors
//http://localhost:5000/apis/doctors
Dorouter.get("/doctors", (req, res) => {
  Doctors.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving doctor",
      });
    } else {
      res.send(data);
    }
  });
});

//Update restaurant Data
//http://localhost:5000/apis/departments/1
Dorouter.put("/doctors/:id", (req, res) => {
  const doctorId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Doctors.updateById(doctorId, new Doctors(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `doctor not found with this id ${doctorId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating doctor data with this id " + doctorId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//http://localhost:5000/apis/doctors/1
Dorouter.delete("/doctors/:id", (req, res) => {
  const doctorId = Number.parseInt(req.params.id);
  Doctors.removeById(doctorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Doctor not found with this id ${doctorId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Doctor data with this id " + doctorId,
        });
      }
    } else {
      res.send({ message: "Doctor is deleted successfully" });
    }
  });
});

module.exports = Dorouter;
