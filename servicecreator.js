function createLevelDBArrayService(execlib, ParentService) {
  'use strict';
  

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function LevelDBArrayService(prophash) {
    ParentService.call(this, prophash);
  }
  
  ParentService.inherit(LevelDBArrayService, factoryCreator);
  
  LevelDBArrayService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };
  
  return LevelDBArrayService;
}

module.exports = createLevelDBArrayService;
