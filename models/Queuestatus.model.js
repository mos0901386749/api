const sql = require("./db");
//Constructor
const Queuestatus = function (status) {
  //Attributes
  this.	queue_status_id  = status.queue_status_id ;
  this.	queue_status_name = status.	queue_status_name;
};

//Method
// Insert queuestatus Data  ส่วนหน้าแรก
Queuestatus.create = async (newQueuestatus, result) => {
  await sql.query("INSERT INTO tbl_queue_status SET ?", newQueuestatus, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new Doctor!!!:", {
        queue_status_id: res.queue_status_id,
      ...newQueuestatus,
    });
    result(null, { queue_status_id: res.queue_status_id, ...newQueuestatus });
  });
};
// Get Data by Id แอดมินเรียก
Queuestatus.getById = async (statusId, result) => {
  await sql.query(
    `SELECT * FROM tbl_queue_status WHERE queue_status_id  = ${statusId}`,
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
      // queuestatus not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Queuestatus.getAll = async (result) => {
  //SELECT * tbl_queue_status
  await sql.query("SELECT * FROM tbl_queue_status", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update patient Data แก้ไข
// Queuestatus.updateById = async (queue_status_id, status, result) => {
//   await sql.query(
//     "UPDATE tbl_queue_status SET queue_status_id = ?, queue_status_name =? WHERE queue_status_id = ?" ,
//     [
//         status.queue_status_id,
//         status.queue_status_name,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       // patient data is updated
//       result(null, { queue_status_id: queue_status_id, ...queuestatus });
//     }
//   );
// };
//Delete queuestatus by Id
Queuestatus.removeById = async (queue_status_id, result) => {
  //DELETE FROM patient WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_queue_status WHERE queue_status_id = ?",
    queue_status_id,
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
      console.log("Deleted Queuestatus with id: ", queue_status_id);
      result(null, res);
    }
  );
};
Queuestatus.removeAll = () => {};

module.exports = Queuestatus;
