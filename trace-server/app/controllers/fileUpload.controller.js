import parseErrors from "../utils/parseErrors";
import isEmpty from "lodash/isEmpty";
import _ from "lodash";
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const moment = require("moment");

const conn = mongoose.connection;

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("timesheets");
});

exports.uploadTimesheet = (req, res) => {
  const readstream = gfs.createReadStream(req.file.filename);
  readstream.pipe(res);
  //console.log({ file: req.file });
};

// Route to display all files
exports.getAllTimesheets = (req, res) => {
  gfs.files
    .find()
    .sort([["uploadDate", -1]])
    .toArray((err, timesheets) => {
      // Check if timesheets
      if (!timesheets || timesheets.length === 0) {
        return res.status(404).json({
          err: "No timesheets exist"
        });
      }

      // Files exist
      return res.json(timesheets);
    });
};

// Route to display all files by user
exports.getTimesheets = (req, res) => {
  gfs.files
    .find({ "metadata.user": req.user.id })
    .sort([["uploadDate", -1]])
    .toArray((err, timesheets) => {
      // Check if timesheets
      if (!timesheets || timesheets.length === 0) {
        return res.status(404).json({
          err: "No timesheets exist"
        });
      }
      // Files exist
      else {
        let timesheetsByDate = [];
        for (let i = 0; i < timesheets.length; i++) {
          if (i !== timesheets.length - 1) {
            if (
              timesheets[i].metadata.date !== timesheets[i + 1].metadata.date
            ) {
              timesheetsByDate.push({
                date: timesheets[i].metadata.date,
                id: timesheets[i]._id
              });
            }
          } else {
            if (
              timesheets[i].metadata.date === timesheets[i - 1].metadata.date
            ) {
              timesheetsByDate.push({
                date: timesheets[i - 1].metadata.date,
                id: timesheets[i - 1]._id
              });
            } else {
              timesheetsByDate.push({
                date: timesheets[i].metadata.date,
                id: timesheets[i]._id
              });
            }
          }
        }
        return res.json(timesheetsByDate);
      }
    });
};

// @route   GET api/get_timesheets/:id
// @desc    Get all timesheets by ID
// @access  Private
exports.getTimesheet = (req, res) => {
  gfs.files
    .find({ "metadata.user": req.params.id })
    .sort([["uploadDate", -1]])
    .toArray((err, timesheets) => {
      // Check if timesheets
      if (!timesheets || timesheets.length === 0) {
        return res.status(404).json({
          err: "No timesheets exist"
        });
      }
      // Files exist
      else {
        let timesheetsByDate = [];
        for (let i = 0; i < timesheets.length; i++) {
          if (i !== timesheets.length - 1) {
            if (
              timesheets[i].metadata.date !== timesheets[i + 1].metadata.date
            ) {
              timesheetsByDate.push({
                date: timesheets[i].metadata.date,
                id: timesheets[i]._id
              });
            }
          } else {
            if (
              timesheets[i].metadata.date === timesheets[i - 1].metadata.date
            ) {
              timesheetsByDate.push({
                date: timesheets[i - 1].metadata.date,
                id: timesheets[i - 1]._id
              });
            } else {
              timesheetsByDate.push({
                date: timesheets[i].metadata.date,
                id: timesheets[i]._id
              });
            }
          }
        }
        return res.json(timesheetsByDate);
      }
    });
};

// Route to display all files by date
exports.getTimesheetsByDate = (req, res) => {
  gfs.files
    .find({ "metadata.user": req.params.id, "metadata.date": req.params.date })
    .sort([["uploadDate", -1]])
    .toArray((err, timesheets) => {
      // Check if timesheets
      if (!timesheets || timesheets.length === 0) {
        return res.status(404).json({
          err: "No timesheets exist"
        });
      }
      // Files exist
      else return res.json(timesheets);
    });
};

// Get image by filename
exports.getImage = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, timesheet) => {
    // Check if timesheet
    if (!timesheet || timesheet.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // Check if image
    /* if (
      timesheet.contentType === "image/jpeg" ||
      timesheet.contentType === "image/png"
    ) {*/
    // Read stream image
    const readstream = gfs.createReadStream(timesheet.filename);
    let data = [];
    readstream.on("data", chunk => {
      data.push(chunk);
    });

    readstream.on("end", () => {
      data = Buffer.concat(data);
      let img = Buffer(data).toString("base64");
      res.type(timesheet.contentType);
      res.end(img);
    });
    readstream.on("error", err => {
      // if theres an error, respond with a status of 500
      // responds should be sent, otherwise the users will be kept waiting
      // until Connection Time out
      res.status(500).send(err);
      console.log("An error occurred!", err);
    });
    /*res.type(timesheet.contentType);
      readstream.pipe(res);*/
    /*} else {
      res.status(404).json({
        err: "Not an image"
      });*/
  });
};
