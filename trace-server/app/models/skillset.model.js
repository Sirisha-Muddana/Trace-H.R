const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import uniqueValidator from 'mongoose-unique-validator';
const moment = require('moment')

const SkillsetSchema = mongoose.Schema({

	skillsArray: {
		type: String,
		enum: ['UI Developer', 'UI/UX Designer', 'DevOps', 'Network Engineer', 'VoIP Engineer', 'F5 Engineer', 'Salesforce Admin', 'Salesforce Developer',
		'Agile Coach', 'Scrum Master', 'Java Developer', 'Big Data', 'Business Analytics', 'Data Analytics', 'Data Analysis', 'Business Intelligence', 
		'Amazon Web Services', 'Cloud Services', 'Content Management Systems', 'Adobe Experience Manger', 'Database Administrator', 'Linux', 'Project Management', 
		'Information Security', 'Software Quality Assurance', 'JIRA Admin', 'Service Now Developer']
	}

	})