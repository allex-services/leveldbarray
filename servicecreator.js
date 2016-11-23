function createLevelDBArrayService(execlib, ParentService, leveldblib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    DBArrayHandler = leveldblib.DBArray;
  

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user'), leveldblib) 
    };
  }

  function LevelDBArrayService(prophash) {
    ParentService.call(this, prophash);
    prophash.starteddefer = this.readyToAcceptUsersDefer;
    DBArrayHandler.call(this, prophash);
  }
  
  ParentService.inherit(LevelDBArrayService, factoryCreator);
  lib.inheritMethods (LevelDBArrayService, DBArrayHandler, 'onInitDone', 'onInitTraversal', 'doMany',  'push', 'manyPutterStartFromOne', 'manyPutter', 'pushMany', 'shift', 'manyShifterStartFromOne', 'manyShifter', 'shiftMany', 'doShiftMany', 'pop', 'manyPopperStartFromOne', 'manyPopper', 'popMany', 'finishAndContinueWith', 'processQ', 'dbPerform', 'setDB', 'createDB', 'getReadStream', 'readInto', 'streamInto', 'traverse', 'onLevelDBCreated', 'busy', 'whenFree', 'checkQ', 'begin', 'finish');
  
  LevelDBArrayService.prototype.__cleanUp = function() {
    DBArrayHandler.prototype.destroy.call(this);
    ParentService.prototype.__cleanUp.call(this);
  };

  LevelDBArrayService.prototype.isInitiallyReady = function (prophash){
    return false;
  };

  LevelDBArrayService.prototype.propertyHashDescriptor = {
    dbname : {
      type : 'string'
    }
  };
  
  return LevelDBArrayService;
}

module.exports = createLevelDBArrayService;
