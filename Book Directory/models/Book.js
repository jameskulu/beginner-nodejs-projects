const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    book_name: {
      type: String,
      required: true,
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
  }, { timestamps: true })

module.exports = mongoose.model("Book", BookSchema);
