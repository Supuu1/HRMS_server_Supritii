let mongoose = require("mongoose")


let employee_schema = mongoose.Schema({
    empId:{
        type:String,
    },
    empName:{
        type:String,

    },
    empDesignation:{
        type:String,
    },

    empJoiningDate:{
        type:String
    },
     empDepartment:{
        type:String
    },
    empSalary:{
        type:String
    },
     empDOB:{
        type:String
    },
     empAddress:{
        type:String
    },
    empImage:{
        type:String
    }

    })

    let emp_data = mongoose.model("emp_datas",employee_schema)
    
    module.exports= emp_data                                                                                                                                                                                                                                                                                              



