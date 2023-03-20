const sql = require("./db");
//Constructor
const Queue = function (queue) {
  //Attributes
  this.queue_id = queue.queue_id;
  this.queue_date = queue.queue_date;
  this.create_at = queue.create_at;
  this.department_id = queue.department_id;
  this.id_card = queue.id_card;
  this.questionnaire_id = queue.questionnaire_id;
  this.queue_status_id = queue.queue_status_id;
  this.authorities_id = queue.authorities_id;
};

//Method
// Insert Data queue ส่วนหน้าแรก
Queue.create = async (newQueue, result) => {
  await sql.query("INSERT INTO tbl_queue SET ?", newQueue, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new Queue!!!:", {
        queue_id: res.queue_id,
      ...newQueue,
    });
    result(null, { queue_id: res.queue_id, ...newQueue });
  });
};
// Get Data by Id แอดมินเรียก
Queue.getById = async (queueId, result) => {
  await sql.query(
    `SELECT * FROM tbl_queue WHERE queue_id  = ${queueId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // queue not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Queue.getall = async (result) => {
  //SELECT * FROM queue
  await sql.query("SELECT * FROM tbl_queue", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update queue Data แก้ไข
Queue.updateById = async (queue_id, queue, result) => {
    await sql.query(
      "UPDATE tbl_queue SET queue_date =?, create_at = ?, department_id = ?, id_card = ?, questionnaire_id = ?, queue_status_id = ?, authorities_id = ? WHERE queue_id = ?",
      [
        
        queue.queue_date,
        queue.create_at,
        queue.department_id,
        queue.id_card,
        queue.questionnaire_id,
        queue.queue_status_id,
        queue.authorities_id,
        queue.queue_id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        // queue data is updated
        result(null, { queue_id: queue_id, ...queue });
      }
    );
  };
//Delete queue by Id
Queue.removeById = async (queue_id, result) => {
  //DELETE FROM tbl_queue WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_queue WHERE queue_id = ?",
    queue_id,
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted queue with id: ", queue_id);
      result(null, res);
    }
  );
};
Queue.getbyqueue = async (result) => {
  //SELECT * FROM queue
  await sql.query("SELECT queue_date,department_id,id_card,questionnaire_id,queue_status_id,authorities_id FROM tbl_queue  ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Queue.removeAll = () => {};

module.exports = Queue;
