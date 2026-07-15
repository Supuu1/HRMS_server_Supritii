let emp_data = require("../Model/employee_schema");

let post_employeeAPI = async (req, res) => {
  let {
    empId,
    empName,
    empDesignation,
    empJoiningDate,
    empDepartment,
    empSalary,
    empDOB,
    empAddress,
  } = req.body;

  let data = await emp_data({
    empId: empId,
    empName: empName,
    empDesignation: empDesignation,
    empJoiningDate: empJoiningDate,
    empDepartment: empDepartment,
    empSalary: empSalary,
    empDOB: empDOB,
    empAddress: empAddress,
  }).save();
  return res.status(201).json({ success: true, message: "Record create" });
};

let getemployeeAPI = async (req, res) => {
  try {
    let data = await emp_data.find();

    return res
      .status(200)
      .json({
        success: true,
        message: "Data retrieved successfully",
        data: data,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

let UpdateemployeeAPI = async (req, res) => {
  let {
    empId,
    empName,
    empDesignation,
    empJoiningDate,
    empDepartment,
    empSalary,
    empDOB,
    empAddress,
  } = req.body;

  console.log(req.body);
  console.log(req.files.empImage[0].filename);

  let empImage =req.files.empImage[0].filename;
  try {
    let existing_user = await emp_data.findOne({ empName: empName });
    if (!existing_user) {
      return res
        .status(404)
        .json({ success: false, message: "Record Not Found" });
    }

    if(req.files){
      let update_emp_image= await emp_data.updateOne({empName:empName}, {
        $set: {
          empImage:empImage
        }
      })
      res.status(200).json({success:true, message:"Profile updated"});
    }

    let update_emp = await emp_data.updateOne(
      { empId: empId },
      {
        $set: {
          empId: empId,
          empName: empName,
          empDesignation: empDesignation,
          empJoiningDate: empJoiningDate,
          empDepartment: empDepartment,
          empSalary: empSalary,
          empDOB: empDOB,
          empAddress: empAddress,
        },
      },
    );

    return res.status(200).json({ success: true, message: "Record updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

let UpdateemployeeAPIById = async (req,res)=>{
    console.log(req.body);
    console.log(req.params);
    let{id}= req.params;
    let {
    empId,
    empName,
    empDesignation,
    empJoiningDate,
    empDepartment,
    empSalary,
    empDOB,
    empAddress,
  } = req.body;
  try{
    let update_emp= await emp_data.findByIdAndUpdate(id,{
          empId: empId,
          empName: empName,
          empDesignation: empDesignation,
          empJoiningDate: empJoiningDate,
          empDepartment: empDepartment,
          empSalary: empSalary,
          empDOB: empDOB,
          empAddress: empAddress,
    })

    if(!update_emp) {
        return res
        .status(404)
        .json({ success: false, message: "Record Not Found" });

    }
    return res.status(200).json({ success: true, message: "Record updated" });
  }

 catch(error){
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });

}
}
let DeleteemployeeAPIById = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  let {id} = req.params;
  // let {
  //   empId,
  //   empName,
  //   empDesignation,
  //   empJoiningDate,
  //   empDepartment,
  //   empSalary,
  //   empDOB,
  //   empAddress,
  // } = req.body;
  try{
    let delete_emp= await emp_data.findByIdAndDelete(id)

    if(!delete_emp) {
        return res
        .status(404)
        .json({ success: false, message: "Record Not Found" });

    }
    return res.status(200).json({ success: true, message: "Record deleted" });
  } catch(error){
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
let GetDataByEmail = async (req, res) => {
  try {
    let data = await emp_data.find();
    let {email}= req.params;

    return res
      .status(200)
      .json({
        success: true,
        message: "Data retrieved successfully",
        data: data,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = { post_employeeAPI, getemployeeAPI, UpdateemployeeAPI, UpdateemployeeAPIById, DeleteemployeeAPIById, GetDataByEmail };
