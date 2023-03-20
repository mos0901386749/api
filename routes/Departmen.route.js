const express = require("express");
const Dmrouter = express.Router();
const Department = require("../models/Department.model");
// Insert departments to database
//http://localhost:5000/apis/departments
Dmrouter.post("/departments", (req, res) => {
  //Create a departments
  const newDepartment = new Department({
    department_id: req.body.department_id,
    department_name: req.body.department_name,
    department_image: req.body.department_image,
    close_time: req.body.close_time,
    max_queue_number: req.body.max_queue_number,
    floor: req.body.floor,
    building: req.body.building,
  });

  //Save to Database
  Department.create(newDepartment, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the departments",
      });
    else res.send(data);
  });
});

//Get departments by Id
//http://localhost:5000/apis/departments/1
Dmrouter.get("/departments/:id", (req, res) => {
  const departmentsId = Number.parseInt(req.params.id);
  Department.getById(departmentsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `departments not found with this id ${departmentsId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + departmentsId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all departments
//http://localhost:5000/apis/departments
Dmrouter.get("/departments", (req, res) => {
  Department.getdepartmentAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving departments",
      });
    } else {
      res.send(data);
    }
  });
});

//Update departments Data
//http://localhost:5000/apis/departments/1
Dmrouter.put("/departments/:id", (req, res) => {
  const departmentsId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Department.updateById(
    departmentsId,
    new Department(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `departments not found with this id ${departmentsId}`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating departments data with this id " + departmentsId,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
});

//http://localhost:5000/apis/departments/1
Dmrouter.delete("/departments/:id", (req, res) => {
  const departmentsId = Number.parseInt(req.params.id);
  Department.removeById(departmentsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `departments not found with this id ${departmentsId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Patient data with this id " + departmentsId,
        });
      }
    } else {
      res.send({ message: "departments is deleted successfully" });
    }
  });
});

module.exports = Dmrouter;
