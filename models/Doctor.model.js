const sql = require("./db");
//Constructor
const Doctor = function (doctor) {
  //Attributes
  this.doctor_id = doctor.doctor_id;
  this.doctor_name = doctor.doctor_name;
  this.doctor_phonenumber = doctor.doctor_phonenumber;
  this.department_id = doctor.department_id;
};

//Method
// Insert Data doctor ส่วนหน้าแรก
Doctor.create = async (newDoctor, result) => {
  await sql.query("INSERT INTO tbl_doctor SET ?", newDoctor, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new Doctor!!!:", {
      doctor_id: res.doctor_id,
      ...newDoctor,
    });
    result(null, { doctor_id: res.doctor_id, ...newDoctor });
  });
};
// Get Data by Id แอดมินเรียก
Doctor.getById = async (doctorId, result) => {
  await sql.query(
    `SELECT * FROM tbl_doctor WHERE doctor_id  = ${doctorId}`,
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
      // doctor not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Doctor.getAll = async (result) => {
  //SELECT * FROM doctor
  await sql.query("SELECT * FROM tbl_doctor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update doctor Data แก้ไข
Doctor.updateById = async (doctor_id, doctor, result) => {
  await sql.query(
    "UPDATE tbl_doctor SET doctor_id = ?, doctor_name =?, doctor_phonenumber = ? WHERE doctor_id = ?",
    [
      doctor.doctor_id,
      doctor.doctor_name,
      doctor.doctor_phonenumber,
      doctor.department_id,
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
      // doctor data is updated
      result(null, { doctor_id: doctor_id, ...doctor });
    }
  );
};
//Delete doctor by Id
Doctor.removeById = async (doctor_id, result) => {
  //DELETE FROM doctor WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_doctor WHERE doctor_id = ?",
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
      console.log("Deleted doctor with id: ", doctor_id);
      result(null, res);
    }
  );
};
Doctor.removeAll = () => {};

module.exports = Doctor;
