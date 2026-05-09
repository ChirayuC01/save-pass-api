const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    // Salt used by the client for PBKDF2 key derivation — never used server-side
    keySalt: {
      type: String,
      required: true,
      default: () => randomBytes(32).toString('hex'),
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Strip sensitive fields from every JSON serialization
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.keySalt; // returned separately in auth responses, never embedded in user object
  return obj;
};

module.exports = mongoose.model('User', userSchema);
