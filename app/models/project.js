const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
      {},
      {
            timestamps: true,
      },
);
const ProjectModel = mongoose.model('project', ProjectSchema);
module.exports = {
      ProjectModel,
};
