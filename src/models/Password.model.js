const mongoose = require('mongoose');

// Passwords are encrypted client-side with AES-256-GCM before being sent to the API.
// The server stores only the ciphertext and IV — it never sees plaintext credentials.
const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    // AES-256-GCM ciphertext of JSON.stringify({ site, username, password })
    encryptedData: {
      type: String,
      required: [true, 'Encrypted data is required'],
    },
    // 12-byte AES-GCM initialization vector, hex-encoded (24 chars)
    iv: {
      type: String,
      required: [true, 'IV is required'],
      length: 24,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Password', passwordSchema);
