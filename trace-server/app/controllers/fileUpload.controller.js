import parseErrors from "../utils/parseErrors";

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
    .find({ metadata: req.user.id })
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

// @route   GET api/get_timesheet/:id
// @desc    Get all timesheets by ID
// @access  Private
exports.getTimesheet = (req, res) => {
  gfs.files
    .find({ metadata: req.params.id })
    .sort([["uploadDate", -1]])
    .toArray((err, timesheet) => {
      // Check if timesheet
      if (!timesheet || timesheet.length === 0) {
        return res.status(404).json({
          err: "No timesheets exist"
        });
      }

      // Files exist
      return res.json(timesheet);
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
    if (
      timesheet.contentType === "image/jpeg" ||
      timesheet.contentType === "image/png"
    ) {
      // Read stream image
      const readstream = gfs.createReadStream(timesheet.filename);
      res.type("image/jpeg");
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
};
