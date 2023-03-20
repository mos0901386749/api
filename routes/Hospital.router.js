const express = require("express");
const Horouter = express.Router();
const Hospital = require("../models/Hospital.model");
// Insert departments to database
//http://localhost:5000/apis/doctors
Horouter.post("/hospitals", (req, res) => {
  //Create a departments
  const newHospital = new Hospital({
    hospital_id: req.body.hospital_id,
    hospital_name: req.body.hospital_name,
    hospital_logo: req.body.hospital_logo,
    hospital_phone_number: req.body.hospital_phone_number,
    hospital_No: req.body.hospital_No,
    hospital_Moo: req.body.hospital_Moo,
    hospital_subdistrict: req.body.hospital_subdistrict,
    hospital_district: req.body.hospital_district,
    hospital_province: req.body.hospital_province,
    hospital_zipcode: req.body.hospital_zipcode
  });

  //Save to Database
  Hospital.create(newHospital, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Hospital",
      });
    else res.send(data);
  });
});

//Get doctors by Id
//http://localhost:5000/apis/doctors/1
Horouter.get("/hospitals/:id", (req, res) => {
  const hospitalsId = Number.parseInt(req.params.id);
  Hospital.getById(hospitalsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Doctors not found with this id ${hospitalsId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + hospitalsId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all doctors
//http://localhost:5000/apis/doctors
Horouter.get("/hospitals", (req, res) => {
  Hospital.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving hospital",
      });
    } else {
      res.send(data);
    }
  });
});

//Update restaurant Data
//http://localhost:5000/apis/departments/1
Horouter.put("/hospitals/:id", (req, res) => {
  const hospitalsId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Hospital.updateById(hospitalsId, new Hospital(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Hospital not found with this id ${hospitalsId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Hospital data with this id " + hospitalsId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//http://localhost:5000/apis/doctors/1
Horouter.delete("/hospitals/:id", (req, res) => {
  const hospitalsId = Number.parseInt(req.params.id);
  Hospital.removeById(hospitalsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Doctor not found with this id ${hospitalsId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Doctor data with this id " + hospitalsId,
        });
      }
    } else {
      res.send({ message: "Hospital is deleted successfully" });
    }
  });
});

module.exports = Horouter;
