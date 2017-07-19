function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['.', 'allex_leveldblib']
    },
    sinkmap: {
      dependencies: ['.', 'allex_leveldblib']
    }
  }
}

module.exports = createServicePack;
