const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

// User Schema
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }, 

  userAccessRole: {
    type: String,
  },
}, 
{
  timestamps: true
});

//Hashing a password before saving it to the database
UserSchema.pre('save', function(next){
  var user = this;
  // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('users', UserSchema);
