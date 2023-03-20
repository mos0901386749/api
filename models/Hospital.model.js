const sql = require("./db");
//Constructor
const Hospital = function (hospital) {
  //Attributes
  this.hospital_id = hospital.hospital_id;
  this.hospital_name = hospital.hospital_name;
  this.hospital_logo = hospital.hospital_logo;
  this.hospital_phone_number = hospital.hospital_phone_number;
  this.hospital_No = hospital.hospital_No;
  this.hospital_Moo = hospital.hospital_Moo;
  this.hospital_subdistrict = hospital.hospital_subdistrict;
  this.hospital_district = hospital.hospital_district;
  this.hospital_province = hospital.hospital_province;
  this.hospital_zipcode = hospital.hospital_zipcode;
};

//Method
// Insert Data tbl_department ส่วนหน้าแรก
Hospital.create = async (newHospital, result) => {
  await sql.query("INSERT INTO tbl_hospital SET ?", newHospital, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new hospital!!!:", {
      hospital_id: res.hospital_id,
      ...newHospital,
    });
    result(null, { hospital_id: res.hospital_id, ...newHospital });
  });
};
// Get Data by Id แอดมินเรียก
Hospital.getById = async (hospitalId, result) => {
  await sql.query(
    `SELECT * FROM tbl_hospital WHERE hospital_id  = ${hospitalId}`,
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
      // department not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Hospital.getAll = async (result) => {
  console.log(result);
  //SELECT * FROM department
  await sql.query("SELECT * FROM tbl_hospital", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

//Update department Data แก้ไข
Hospital.updateById = (hospital_id, hospital, result) => {
  sql.query(
    "UPDATE tbl_hospital SET hospital_name = ?, hospital_logo =?, hospital_phone_number = ?, hospital_No = ? , hospital_Moo = ?, hospital_subdistrict = ?, hospital_district = ?, hospital_province = ?, hospital_zipcode = ? WHERE hospital_id = ?",
    [
      hospital.hospital_name,
      hospital.hospital_logo,
      hospital.hospital_phone_number,
      hospital.hospital_No,
      hospital.hospital_Moo,
      hospital.hospital_subdistrict,
      hospital.hospital_district,
      hospital.hospital_province,
      hospital.hospital_zipcode,
      hospital.hospital_id,
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
      // department data is updated
      result(null, { hospital_id: hospital_id, ...hospital });
    }
  );
};
//Delete department by Id
Hospital.removeById = async (hospital_id, result) => {
  //DELETE FROM department WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_hospital WHERE hospital_id = ?",
    hospital_id,
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
      console.log("Deleted department with id: ", hospital_id);
      result(null, res);
    }
  );
};
Hospital.removeAll = () => {};
module.exports = Hospital;
