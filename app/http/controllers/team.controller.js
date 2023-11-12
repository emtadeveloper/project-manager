const autoBind = require('auto-bind');

class TeamController {
      constructor() {
            autoBind(this);
      }
}

module.exports = {
      TeamController: new TeamController(),
};
