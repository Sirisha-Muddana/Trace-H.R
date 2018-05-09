const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  dateOfBirth: {
    type: String,
    default: moment(Date.now()).format("MM-DD-YYYY")
  },

  cellphone: {
    type: Number,
    required: true
  },

  skillset: {
    type: [String],
    required: true
  },

  onProject: {
    type: String,
    required: true
  },

  endDate: {
    type: String,
    default: moment(Date.now()).format("YYYY-MM-DD")
  },

  relocation: {
    type: String
  },

  address: {
    street: {
      type: String,
      required: true
    },

    apartment: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    zip: {
      type: Number,
      required: true
    }
  },

  immigrationInfo: [
    {
      visaStatus: {
        type: String,
        required: true
      },

      dateOfHire: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM-DD"),
        required: true
      },

      visaExp: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM-DD"),
        required: true
      },

      i94Exp: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM-DD"),
        required: true
      },

      organizationTitle: {
        type: String,
        required: true
      },

      jobTitle: {
        type: String,
        required: true
      },

      lcaSalary: {
        type: Number,
        required: true
      }
    }
  ],

  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM"),
        required: true
      },
      to: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM"),
        required: true
      },
      description: {
        type: String
      }
    }
  ],

  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM"),
        required: true
      },
      to: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM"),
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("profile", ProfileSchema);
