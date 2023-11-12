const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
      {},
      {
            timestamps: true,
      },
);
const UserModel = mongoose.model('user', UserSchema);
module.exports = {
      UserModel,
};
