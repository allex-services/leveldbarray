function createUser(execlib, ParentUser, leveldblib) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
    leveldblib.ServiceUserMixin.call(this);
  }
  
  ParentUser.inherit(User, require('../methoddescriptors/user'), [/*visible state fields here*/]/*or a ctor for StateStream filter*/);
  leveldblib.ServiceUserMixin.addMethods(User);

  User.prototype.__cleanUp = function () {
    leveldblib.ServiceUserMixin.prototype.__cleanUp.call(this);
    ParentUser.prototype.__cleanUp.call(this);
  };

  User.prototype.push = function (item, defer) {
    this.__service.push (item, defer);
  };

  User.prototype.pop = function (defer) {
    this.__service.pop (defer);
  };

  User.prototype.shift = function (defer) {
    this.__service.shift(defer);
  };

  User.prototype.traverse = function (options, defer) {
    this.streamLevelDB (this.__service, options, defer);
  };

  return User;
}

module.exports = createUser;
