const sql = require("./db");
//Constructor
const Patient = function (patient) {
  //Attributes
  this.patient_id = patient.patient_id;
  this.id_card = patient.id_card;
  this.fistname = patient.fistname;
  this.lastname = patient.lastname;
  this.birthday = patient.birthday;
  this.age = patient.age;
  this.weight = patient.weight;
  this.height = patient.height;
  this.nationality = patient.nationality;
  this.religion = patient.religion;
  this.contact_person = patient.contact_person;
  this.history_drug_allergy = patient.history_drug_allergy;
  this.phone_number = patient.phone_number;
};

//Method
// Insert Data patient ส่วนหน้าแรก
Patient.create = async (newPatient, result) => {
  await sql.query("INSERT INTO patient SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log("created new patient!!!:", {
      patient_id: res.patient_id,
      ...newPatient,
    });
    result(null, { patient_id: res.patient_id, ...newPatient });
  });
};
// Get Data by Id แอดมินเรียก
Patient.getById = async (patientId, result) => {
  await sql.query(
    `SELECT * FROM patient WHERE patient_id  = ${patientId}`,
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
      // patient not found  with this Id
      result({ kind: "not_found" }, null);
    }
  );
};
//Get all ให้แอดมินเรียกใช้ใน การจัดการ user
Patient.getall = async (result) => {
  //SELECT * FROM patient
  await sql.query("SELECT * FROM patient", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Update patient Data แก้ไข
Patient.updateById = async (patient_id, patient, result) => {
  await sql.query(
    "UPDATE patient SET id_card = ?, fistname =?, lastname = ?, password = ? , birthday = ?, age = ?, weight = ?, height = ?, nationality = ?, religion = ?,contact_person=?,history_drug_allergy=?,phone_number=? WHERE patient_id = ?",
    [
      patient.id_card,
      patient.fistname,
      patient.lastname,
      patient.password,
      patient.birthday,
      patient.age,
      patient.weight,
      patient.height,
      patient.height,
      patient.religion,
      patient.contact_person,
      patient.history_drug_allergy,
      patient.phone_number,
      patient.patient_id,
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
      // patient data is updated
      result(null, { patient_id: patient_id, ...patient });
    }
  );
};
//Delete patient by Id
Patient.removeById = async (patient_id, result) => {
  //DELETE FROM patient WHERE id = ?
  await sql.query(
    "DELETE FROM patient WHERE patient_id = ?",
    patient_id,
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
      console.log("Deleted patient with id: ", patient_id);
      result(null, res);
    }
  );
};
Patient.getbypatient = async (result) => {
  //SELECT * FROM patient
  await sql.query("SELECT id_card,fistname,lastname FROM patient  ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
Patient.removeAll = () => {};

module.exports = Patient;
