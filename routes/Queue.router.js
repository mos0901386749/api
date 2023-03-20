const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue.model");
// Insert queue to database
//http://localhost:5000/apis/queue
router.post("/queue", (req, res) => {
  //Create a queue
  const newQueue = new Queue({
    queue_date: req.body.queue_date,
    create_at: req.body.create_at,
    department_id: req.body.department_id,
    id_card: req.body.id_card,
    questionnaire_id: req.body.questionnaire_id,
    queue_status_id: req.body.queue_status_id,
    authorities_id: req.body.authorities_id,
  });

  //Save to Database
  Queue.create(newQueue, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error  while creating the Patient",
      });
    else res.send(data);
  });
});

//Get queue by Id
//http://localhost:5000/apis/queue/1
router.get("/queue/:id", (req, res) => {
  const queueId = Number.parseInt(req.params.id);
  Queue.getById(queueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Queue not found with this id ${queueId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with this id " + queueId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//Get all queue
//http://localhost:5000/apis/queue
router.get("/queue", (req, res) => {
  Queue.getall((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving patients",
      });
    } else {
      res.send(data);
    }
  });
});

//Update queue Data
//http://localhost:5000/apis/queue/1
router.put("/queue/:id", (req, res) => {
  const queueId = Number.parseInt(req.params.id);
  //Check empty body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }
  Queue.updateById(queueId, new Queue(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Queue not found with this id ${queueId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating queue data with this id " + queueId,
        });
      }
    } else {
      res.send(data);
    }
  });
});

//http://localhost:5000/apis/queue/1
router.delete("/queue/:id", (req, res) => {
  const queueId = Number.parseInt(req.params.id);
  Queue.removeById(queueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Queue not found with this id ${queueId}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Qeueue data with this id " + queueId,
        });
      }
    } else {
      res.send({ message: "Queue is deleted successfully" });
    }
  });
});
router.get("/queue", (req, res) => {
  Queue.getbyqueue((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error while retrieving queue",
      });
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
