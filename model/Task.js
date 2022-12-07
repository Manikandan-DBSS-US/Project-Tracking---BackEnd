import mongoose, { Schema } from "mongoose";

const Task = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide project name']
    },
    description:{
        type:String,
        required:"Please provide the description"
    },
    dueDate:{
        type:Date,
        required:[true,"Please provide Due Date"]
    },
    effort:{
        type:Date,
        required:[true,'Please provide effort hours']
    },

    isCompleted:{
        type:String,
        required:[true,"Please mention status of the task"],
        enum: ["yes", "no"],
    },
    isVerified:{
        type:String,
        required:[true,"Please mention status of the verification"],
        enum: ["yes", "no"],
    }
},{
    timestamps:true
});

export default mongoose.model("Task",Task)