const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
//import uniqueValidator from "mongoose-unique-validator";

// User Schema
const fileUploadSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    img: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("fileUpload", fileUploadSchema);
