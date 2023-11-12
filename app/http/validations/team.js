const { body, param } = require('express-validator');
const { TeamModel } = require('../../models/team');

function createTeamValidator() {
      return [];
}

module.exports = {
      createTeamValidator,
};
