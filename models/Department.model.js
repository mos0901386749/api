const sql = require("./db");
//Constructor
const Department = function (department) {
  //Attributes
  this.department_id = department.department_id;
  this.department_name = department.department_name;
  this.department_image = department.department_image;
  this.close_time = department.close_time;
  this.max_queue_number = department.max_queue_number;
  this.floor = department.floor;
  this.building = department.building;
};

//Method
// Insert Data tbl_department ส่วนหน้าแรก
Department.create = async (newDepartment, result) => {
  await sql.query(
    "INSERT INTO tbl_department SET ?",
    newDepartment,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      console.log("created new department!!!:", {
        department_id: res.department_id,
        ...newDepartment,
      });
      result(null, { department_id: res.department_id, ...newDepartment });
    }
  );
};
// Get Data by Id แอดมินเรียก
Department.getById = async (departmentId, result) => {
  await sql.query(
    `SELECT * FROM tbl_department WHERE department_id  = ${departmentId}`,
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
Department.getdepartmentAll = async (result) => {
  console.log(result);
  //SELECT * FROM department
  await sql.query("SELECT * FROM tbl_department", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

//Update department Data แก้ไข
Department.updateById = (department_id, department, result) => {
  sql.query(
    "UPDATE tbl_department SET department_name = ?, department_image =?, close_time = ?, max_queue_number = ? , floor = ?, building = ? WHERE department_id = ?",
    [
      department.department_name,
      department.department_image,
      department.close_time,
      department.max_queue_number,
      department.floor,
      department.building,
      department.department_id,
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
      result(null, { department_id: department_id, ...department });
    }
  );
};
//Delete department by Id
Department.removeById = async (department_id, result) => {
  //DELETE FROM department WHERE id = ?
  await sql.query(
    "DELETE FROM tbl_department WHERE department_id = ?",
    department_id,
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
      console.log("Deleted department with id: ", department_id);
      result(null, res);
    }
  );
};
Department.removeAll = () => {};
module.exports = Department;
