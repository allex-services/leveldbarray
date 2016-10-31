function createUser(execlib, ParentUser) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  ParentUser.inherit(User, require('../methoddescriptors/user'), [/*visible state fields here*/]/*or a ctor for StateStream filter*/);
  User.prototype.__cleanUp = function () {
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

  return User;
}

module.exports = createUser;
