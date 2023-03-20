const express = require("express");
const Atrouter = express.Router();
const Authorities = require("../models/Authorities.model");
// Insert authorities to database
//http://localhost:5000/apis/authorities
Atrouter.post("/authorities", (req, res) => {
  //Create a authorities
  const newAuthorities = new Authorities({
    authorities_id: req.body.authorities_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    authorities_status: req.body.authorities_status,
    department_id: req.body.department_id,
  });

  //Save to Database
  Authorities.create(newAuthorities, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Authorities",
      });
    else res.send(data);
  });
});

//Get authorities by Id
//http://localhost:5000/apis/authorities/1
Atrouter.get("/authorities/:id", (req, res) => {
  const authoritiesId = Number.parseInt(req.params.id);
  Authorities.getById(authoritiesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `departments not found with this id ${authoritiesId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + authoritiesId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all authorities
//http://localhost:5000/apis/authorities
Atrouter.get("/authorities", (req, res) => {
    Authorities.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving authorities",
      });
    } else {
      res.send(data);
    }
  });
});

//Update authorities Data
//http://localhost:5000/apis/authorities/1
Atrouter.put("/authorities/:id", (req, res) => {
  const authoritiesId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Authorities.updateById(authoritiesId, new Authorities(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `authorities not found with this id ${authoritiesId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating doctor data with this id " + authoritiesId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//http://localhost:5000/apis/authorities/1
Atrouter.delete("/authorities/:id", (req, res) => {
  const authoritiesId = Number.parseInt(req.params.id);
  Authorities.removeById(authoritiesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `authorities not found with this id ${authoritiesId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Authorities data with this id " + authoritiesId,
        });
      }
    } else {
      res.send({ message: "Authorities is deleted successfully" });
    }
  });
});

module.exports = Atrouter;
