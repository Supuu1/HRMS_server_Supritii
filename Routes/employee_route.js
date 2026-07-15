let express = require("express");
let employee_router = express.Router();
let {post_employeeAPI,getemployeeAPI,UpdateemployeeAPI, UpdateemployeeAPIById, DeleteemployeeAPIById, GetDataByEmail}= require("../Controller/employee_controller");
let EmployeeProfile = require("../Files/EmployeeImage");


employee_router.post("/api/post/employee", post_employeeAPI);
employee_router.get("/api/get/employee", getemployeeAPI);
employee_router.put("/api/update/byname",EmployeeProfile, UpdateemployeeAPI);
employee_router.put("/api/update/byid/:id",UpdateemployeeAPIById);
employee_router.delete("/api/delete/byid/:id", DeleteemployeeAPIById);
employee_router.get("/api/get/byemail/:email", GetDataByEmail);
module.exports= employee_router;