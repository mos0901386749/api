const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient.model");
// Insert patient to database
//http://localhost:5000/apis/patients
router.post("/patients", (req, res) => {
  //Create a patients
  const newPatient = new Patient({
    id_card: req.body.id_card,
    fistname: req.body.fistname,
    lastname: req.body.lastname,
    password: req.body.password,
    birthday: req.body.birthday,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    nationality: req.body.nationality,
    religion: req.body.religion,
    contact_person: req.body.contact_person,
    history_drug_allergy: req.body.history_drug_allergy,
    phone_number: req.body.phone_number,
  });

  //Save to Database
  Patient.create(newPatient, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Patient",
      });
    else res.send(data);
  });
});

//Get patients by Id
//http://localhost:5000/apis/patients/1
router.get("/patients/:id", (req, res) => {
  const patientId = Number.parseInt(req.params.id);
  Patient.getById(patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Patient not found with this id ${patientId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + patientId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all patients
//http://localhost:5000/apis/patients
router.get("/patients", (req, res) => {
  Patient.getall((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving patients",
      });
    } else {
      res.send(data);
    }
  });
});

//Update patients Data
//http://localhost:5000/apis/patients/1
router.put("/patients/:id", (req, res) => {
  const patientId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Patient.updateById(patientId, new Patient(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Patient not found with this id ${patientId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating patient data with this id " + patientId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//http://localhost:5000/apis/patients/1
router.delete("/patients/:id", (req, res) => {
  const patientId = Number.parseInt(req.params.id);
  Patient.removeById(patientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Patient not found with this id ${patientId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Patient data with this id " + patientId,
        });
      }
    } else {
      res.send({ message: "Patient is deleted successfully" });
    }
  });
});
router.get("/patient", (req, res) => {
  Patient.getbypatient((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving patients",
      });
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
