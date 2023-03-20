
const sql = require("./db");
//Constructor
const Authorities = function (authorities) {
  //Attributes
  this.authorities_id = authorities.authorities_id;
  this.first_name = authorities.first_name;
  this.last_name = authorities.last_name;
  this.password = authorities.password;
  this.authorities_status = authorities.authorities_status;
  this.department_id = authorities.department_id
};

//Method
// Insert Data authorities ส่วนหน้าแรก
Authorities.create = async (newAuthorities, result) => {
  await sql.query("INSERT INTO tbl_authorities SET ?", newAuthorities, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new authorities!!!:", {
        authorities_id: res.authorities_id,
      ...newAuthorities,
    });
    result(null, { authorities_id: res.authorities_id, ...newAuthorities });
  });
};
// Get Data by Id แอดมินเรียก
Authorities.getById = async (authoritiesId, result) => {
  await sql.query(
    `SELECT * FROM tbl_authorities WHERE authorities_id  = ${authoritiesId}`,
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
      // authorities not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Authorities.getAll = async (result) => {
  //SELECT * FROM doctor
  await sql.query("SELECT * FROM tbl_authorities", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update authorities Data แก้ไข
Authorities.updateById = async (authorities_id, authorities, result) => {
  await sql.query(
    "UPDATE tbl_authorities SET  first_name =?, last_name = ?, password = ?, authorities_status = ?, department_id = ? WHERE authorities_id = ?",
    [
        authorities.authorities_id,
        authorities.first_name,
        authorities.last_name,
        authorities.password,
        authorities.authorities_status,
        authorities.department_id,
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
      // authorities data is updated
      result(null, { authorities_id: authorities_id, ...authorities });
    }
  );
};
//Delete authorities by Id
Authorities.removeById = async (authorities_id, result) => {
  //DELETE FROM authorities WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_authorities WHERE authorities_id = ?",
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
      console.log("Deleted authorities with id: ", authorities_id);
      result(null, res);
    }
  );
};
Authorities.removeAll = () => {};

module.exports = Authorities;
