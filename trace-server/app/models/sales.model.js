const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import uniqueValidator from 'mongoose-unique-validator';
const moment = require('moment')

// User Schema
const SalesSchema = mongoose.Schema({

  consultantName: {
    type: String,
    required: true                
  },

  skillset: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  billingRate: {
    type: Number,
    required: true
  }, 

  vendor: {
    type: String,
    required: true
  },

  client: {
    type: String,
    required: true
  },

  interviewDate: { 
    type: String,
    default: moment().format('YYYY-MM-DD')
  },

  interviewType: {
    type: String,
    required: true
  },

  feedback: {
    type: String,
    required: false
  },

  recruiter: {
    type: String,
    required: false
  },

  createdAt: {
    type: String,
    default: moment(Date.now()).format('YYYY-MM-DD')
  }
} 
/*{
  timestamps: true
}*/);


module.exports = mongoose.model('sales', SalesSchema);
