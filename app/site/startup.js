var Role = require(__common + '/models/role');
var logger = require(__common + '/tools/logger')('site.startup');

function logNewRole(err, role, created) {
  logger.debug(created ? 'Role was created' : 'Role was loaded', role);
}

module.exports = function () {
  Role.create('Player', 1, logNewRole);
  Role.create('GameMaster', 2, logNewRole);
  Role.create('Admin', 3, logNewRole);

};

