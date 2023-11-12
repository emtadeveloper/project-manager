const autoBind = require('auto-bind');

class ProjectController {
      constructor() {
            autoBind(this);
      }
}
module.exports = {
      ProjectController: new ProjectController(),
};
