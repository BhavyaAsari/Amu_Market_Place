import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({

    adminId:String,
    adminName:String,

    action:String,
    module:String,
    targetId:String,

    changes: {

        before:mongoose.Schema.Types.Mixed,
        after:mongoose.Schema.Types.Mixed,
    },

    createdAt: {

        type:Date,
        default:Date.now,
    },
});

export default mongoose.models.Logs || mongoose.model("Logs", LogSchema);