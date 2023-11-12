const { string } = require('joi');
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
      {},
      {
            timestamps: true,
      },
);
const TeamModel = mongoose.model('team', TeamSchema);
module.exports = {
      TeamModel,
};
