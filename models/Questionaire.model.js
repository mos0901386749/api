const sql = require("./db");
//Constructor
const Questionaire = function (questionaire) {
  //Attributes
  this.questionaire_id = questionaire.questionaire_id;
  this.questionaire_name = questionaire.questionaire_name;
;
};

//Method
// Insert Data questionaire ส่วนหน้าแรก
Questionaire.create = async (newquestionaire, result) => {
  await sql.query("INSERT INTO tbl_questionaire SET ?", newquestionaire, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new Doctor!!!:", {
        questionaire_id: res.questionaire_id,
      ...newquestionaire,
    });
    result(null, { questionaire_id: res.questionaire_id, ...newquestionaire });
  });
};
// Get Data by Id แอดมินเรียก
Questionaire.getById = async (questionaireId, result) => {
  await sql.query(
    `SELECT * FROM tbl_questionaire WHERE questionaire_id  = ${questionaireId}`,
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
      // questionaire not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Questionaire.getAll = async (result) => {
  //SELECT * FROM questionaire
  await sql.query("SELECT * FROM tbl_questionaire", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update questionaire Data แก้ไข
Questionaire.updateById = async (questionaire_id, questionaire, result) => {
    await sql.query(
      `UPDATE tbl_questionaire SET questionaire_id=? questionaire_name =? WHERE questionaire_id=? `,
      [
        questionaire.questionaire_id,
        questionaire.questionaire_name,
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
        // questionaire data is updated
        result(null, { questionaire_id: questionaire_id, ...questionaire });
      }
    );
  };
//Delete questionaire by Id
Questionaire.removeById = async (questionaire_id, result) => {
  //DELETE FROM questionaire WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_questionaire WHERE questionaire_id = ?",
    doctor_id,
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
      console.log("Deleted doctor with id: ", questionaire_id);
      result(null, res);
    }
  );
};
Questionaire.removeAll = () => {};

module.exports = Questionaire;
