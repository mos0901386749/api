const express = require("express");
const qurouter = express.Router();
const Questionaire = require("../models/Questionaire.model");
// Insert questionaire to database
//http://localhost:5000/apis/questionaire
qurouter.post("/questionaire", (req, res) => {
  //Create a patient
  const newQuestionaire = new Questionaire({
    questionaire_id: req.body.questionaire_id,
    questionaire_name: req.body.questionaire_name,

  });

  //Save to Database
  Questionaire.create(newQuestionaire, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Patient",
      });
    else res.send(data);
  });
});

//Get questionaire by Id
//http://localhost:5000/apis/questionaire/1
qurouter.get("/questionaire/:id", (req, res) => {
  const questionaireId = Number.parseInt(req.params.id);
  Questionaire.getById(questionaireId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Patient not found with this id ${questionaireId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + questionaireId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all questionaire
//http://localhost:5000/apis/questionaire
qurouter.get("/questionaire", (req, res) => {
    Questionaire.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving patients",
      });
    } else {
      res.send(data);
    }
  });
});

//Update questionaire Data
//http://localhost:5000/apis/questionaire/1
qurouter.put("/questionaire/:id", (req, res) => {
  const questionaireId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Questionaire.updateById(questionaireId, new Questionaire(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Patient not found with this id ${questionaireId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating patient data with this id " + questionaireId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//http://localhost:5000/apis/questionaire/1
qurouter.delete("/patients/:id", (req, res) => {
  const questionaireId = Number.parseInt(req.params.id);
  Questionaire.removeById(questionaireId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Patient not found with this id ${questionaireId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Patient data with this id " + questionaireId,
        });
      }
    } else {
      res.send({ message: "Patient is deleted successfully" });
    }
  });
});


module.exports = qurouter;
